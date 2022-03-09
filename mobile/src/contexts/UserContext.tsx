import React, { createContext, useState } from "react";

export type User = {
  username: string;
  firstName: string;
  lastName: string;
  role: any;
  email: string;
};

type UserState = {
  userState: User;
  setUserState: React.Dispatch<
    React.SetStateAction<{
      username: string;
      firstName: string;
      lastName: string;
      role: any;
      email: string;
    }>
  >;
};

export const initialUser: User = {
  username: "",
  firstName: "",
  lastName: "",
  role: "",
  email: "",
};

const initialState: UserState = {
  userState: initialUser,
  setUserState: () => {},
};

export const UserContext = createContext<UserState>(initialState);

export const UserProvider: React.FC = ({ children }) => {
  const [userState, setUserState] = useState(initialState.userState);

  return (
    <UserContext.Provider
      value={{
        userState,
        setUserState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
