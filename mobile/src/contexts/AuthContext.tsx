import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import React, { createContext, useContext, useState } from "react";

import { User, initialUser, UserContext } from "./UserContext";

// TODO: move into env file
const YSC_SERVER_URI = "https://ystemandchess.com/middleware/";

type AuthState = {
  isLoggedIn: boolean;
  login: (username: string, password: string) => void;
  validate: () => boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
  login: () => {},
  validate: () => false,
};

export const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const { setUserState } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    console.log("isLoggedIn in auth: ", isLoggedIn);
  }, [isLoggedIn]);

  const login = (username: string, password: string): void => {
    (async () => {
      try {
        const params = {
          username,
          password,
        };
        const url = YSC_SERVER_URI + "auth/login?" + new URLSearchParams(params).toString();
        const res = await fetch(url, {
          method: "POST",
        });
        const tokenJson = await res.json();
        const token = JSON.stringify(tokenJson);
        // store token & user info
        await SecureStore.setItemAsync("token", token);
        const decoded: any = jwt_decode(token);

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
      } catch (err) {
        // TODO: error catching
        console.error("invalid login");
      }
    })();
  };

  const validate = (): boolean => {
    let flag = false;
    (async () => {
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
        console.error("couldn't validate token");

        // reset user state
        setUserState(initialUser);
        setIsLoggedIn(false);
      }

      // token is valid
      if (res.status === 200) {
        flag = true;
        setIsLoggedIn(true);
      }
    })();
    console.log("flag", flag);
    return flag;
  };

  return (
    <AuthContext.Provider value={{ login, validate, isLoggedIn }}>{children}</AuthContext.Provider>
  );
};
