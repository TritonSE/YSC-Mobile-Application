import React, { createContext, useState } from "react";

export type User = {
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
};

type UserState = {
  userState: User;
  setUserState: React.Dispatch<
    React.SetStateAction<{
      username: string;
      firstName: string;
      lastName: string;
      role: string;
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
  setUserState: () => {
    // initial function
  },
};

export const UserContext = createContext<UserState>(initialState);

export const UserProvider: React.FC = ({ children }) => {
  const [userState, setUserState] = useState(initialState.userState);
  const userContextValue = React.useMemo(
    () => ({
      userState,
      setUserState,
    }),
    [userState, setUserState]
  );
  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};
