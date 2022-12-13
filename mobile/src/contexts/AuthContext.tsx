import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import React, { createContext, useContext, useState, useEffect } from "react";

import { SocketContext } from "./SocketContext";
import { User, initialUser, UserContext } from "./UserContext";

interface AuthState {
  isLoggedIn: boolean;
  login: (username: string, password: string) => string | undefined;
  resetPassword: (username: string, email: string) => string | undefined;
  validate: () => void;
}

interface Payload extends User {
  parentUsername: string;
  exp: number;
  iat: number;
}

const initialState: AuthState = {
  isLoggedIn: false,
  login: () => undefined,
  validate: () => undefined,
  resetPassword: () => undefined,
};

export const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const { setUserState } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  const YSC_SERVER_URI = Constants.manifest?.extra?.YSC_SERVER_URI;

  const authContextValue = React.useMemo(
    () => ({
      login: async (username: string, password: string) => {
        /*
        const params = {
          username,
          password,
        };
        const url = YSC_SERVER_URI + "auth/login?" + new URLSearchParams(params).toString();
        */
        const url = `${YSC_SERVER_URI}auth/login?username=${username}&password=${password}`;
        try {
          const res = await fetch(url, {
            method: "POST",
          });

          if (res.ok) {
            const tokenJson = await res.json();
            const token = JSON.stringify(tokenJson);
            // store token & user info
            await SecureStore.setItemAsync("token", token);
            const decoded: Payload = jwt_decode(token);

            // store user info in User context
            const newUserState: User = {
              username: decoded.username,
              firstName: decoded.firstName,
              lastName: decoded.lastName,
              role: decoded.role,
              email: decoded.email,
            };
            setUserState(newUserState);
            setIsLoggedIn(true);
            socket.connect();
            socket.emit("authenticate connection", token);
            socket.emit("successful login", decoded.username, decoded.role);
            return null;
          }

          return "Invalid username or password!";
        } catch (e) {
          return "Error connecting to server! Please try again.";
        }
      },
      resetPassword: async (username: string, email: string) => {
        const url = `${YSC_SERVER_URI}user/sendMail?username=${username}&email=${email}`;
        try {
          const res = await fetch(url, {
            method: "POST",
          });

          if (res.ok) {
            return null;
          }
          return "Invalid username or email!";
        } catch (e) {
          return "Error connecting to server! Please try again.";
        }
      },
      validate: async () => {
        const url = YSC_SERVER_URI + "auth/validate";
        let token;
        let fail = false;
        try {
          const tokenRes = await SecureStore.getItemAsync("token");
          token = JSON.parse(tokenRes).token;

          const res = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fail = res.status !== 200;
        } catch (e) {
          fail = true;
        }

        // token is invalid
        if (fail) {
          // reset user state
          setUserState(initialUser);
          setIsLoggedIn(false);
        } else {
          const decodedValidation: Payload = jwt_decode(`${token}`);
          setUserState(decodedValidation);
          setIsLoggedIn(true);
          socket.connect();
          socket.emit("successful login", decodedValidation.username, decodedValidation.role);
        }
      },
      isLoggedIn,
    }),
    [isLoggedIn]
  );

  useEffect(() => {
    const validateTokenOnLoad = async () => {
      try {
        await SecureStore.getItemAsync("token"); // retrieve token
      } catch (err) {
        // Restoring token failed
        setIsLoggedIn(false);
        return;
      }

      // validate token if it exists to check for expiry
      // function sets isLoggedIn which sends user to login or home screen
      authContextValue.validate();
    };

    validateTokenOnLoad();
  }, []);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
