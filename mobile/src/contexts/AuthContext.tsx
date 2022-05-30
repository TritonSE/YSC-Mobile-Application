/* eslint-disable no-console */
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import React, { createContext, useContext, useState } from "react";

import { SocketContext } from "./SocketContext";
import { User, initialUser, UserContext } from "./UserContext";

interface AuthState {
  isLoggedIn: boolean;
  login: (username: string, password: string) => void;
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
};

export const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const { setUserState } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const YSC_SERVER_URI = Constants.manifest?.extra?.YSC_SERVER_URI;

  const authContextValue = React.useMemo(
    () => ({
      login: async (username: string, password: string) => {
        const params = {
          username,
          password,
        };
        const url = YSC_SERVER_URI + "auth/login?" + new URLSearchParams(params).toString();
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
          socket.emit("successful login", decoded.username);
        } else {
          console.error("Login request was unsuccessful.");
        }
      },
      validate: async () => {
        const url = YSC_SERVER_URI + "auth/validate";
        const tokenRes = await SecureStore.getItemAsync("token");
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenRes}`,
          },
        });

        // token is invalid
        if (res.status !== 200) {
          // reset user state
          setUserState(initialUser);
          setIsLoggedIn(false);

          console.error("Couldn't validate token.");
        }

        // token is valid
        if (res.status === 200) {
          const decodedValidation: Payload = jwt_decode(`${tokenRes}`);
          setIsLoggedIn(true);
          socket.emit("authenicate connection", tokenRes);
          socket.connect();
          socket.emit("successful login", decodedValidation.username);
          console.log("Validated token");
        }
      },
      isLoggedIn,
    }),
    [isLoggedIn]
  );

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
