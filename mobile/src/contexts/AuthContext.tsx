import React, {createContext, useContext} from 'react';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from "jwt-decode";

import { UserContext } from './UserContext';

type AuthState = {
  login: (username: string, password: string) => void,
  validate: () => boolean,
};

const initialState: AuthState = {
  login: () => { },
  validate: () => { return false; }
};

export const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const {userState, setUserState} = useContext(UserContext)

  const login = (username: string, password: string): void => {
    async() => {
      const params = {
         username,
         password
      }
      const url = "https://ystemandchess.com/middleware/auth/login" + new URLSearchParams(params).toString();
      const res = await fetch(url, {
        method: 'POST'
      });
      const token = await res.json();
      
      //storing the token & user info
      if (res.ok) {
        SecureStore.setItemAsync("token", token);
        const decoded: any = jwt_decode(token);
       
        // store user info in User context
        const newUserState = {
          username: decoded.username,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          role: decoded.role,
          email: decoded.email
        }
        setUserState(newUserState);
      } 
      else {
        // throw err
        console.error("invalid login");
      }
    }
  }

  const validate = (): boolean => {
    let flag = false;
    async() => {  
      const url = "https://ystemandchess.com/middleware/auth/validate";
      const tokenRes = await SecureStore.getItemAsync("token");
      
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenRes}`
        }
      });


      // invalid status
      if (res.status !== 200) {
        console.error("couldn't validate token");

        // reset user state
        const userState = {
          username: '',
          firstName: '',
          lastName: '',
          role: '',
          email: ''
        }
        setUserState(userState);
      }

      // valid status
      if (res.status === 200) flag = true;
    }
    return flag;
  }


  return (
  <AuthContext.Provider value={{ login, validate }}>
    {children}
  </AuthContext.Provider>);
}