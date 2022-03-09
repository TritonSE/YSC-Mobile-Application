import React, {createContext, useState} from 'react';

type UserState = {
  userState: {
    username: string;
    firstName: string;
    lastName: string;
    role: any;
    email: string;
  },
  setUserState: React.Dispatch<React.SetStateAction<{
    username: string;
    firstName: string;
    lastName: string;
    role: any;
    email: string;
  }>>
}

const initialState: UserState = 
{
    userState:
    {
        username: '',
        firstName: '',
        lastName: '',
        role: '',
        email: '',
    },
   setUserState: () => {}
}

export const UserContext = createContext<UserState>(initialState);

export const UserProvider: React.FC = ({children}) => {
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
}