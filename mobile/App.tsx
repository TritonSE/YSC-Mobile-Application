import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import Navigator from "./src/components/Navigator";
import { AuthProvider } from "./src/contexts/AuthContext";
import { SocketContext, socket } from "./src/contexts/SocketContext";
import { UserProvider } from "./src/contexts/UserContext";

const App = () => (
  <SocketContext.Provider value={socket}>
    <UserProvider>
      <AuthProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AuthProvider>
    </UserProvider>
  </SocketContext.Provider>
);

export default App;
