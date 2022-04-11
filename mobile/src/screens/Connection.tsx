import React, { useContext } from "react";
import { View } from "react-native";

import Button from "../components/Button";
import { SocketContext } from "../contexts/SocketContext";
import { AppStylesheet } from "../styles/AppStylesheet";

const Connection = () => {
  const socket = useContext(SocketContext);

  return (
    <View styles={AppStylesheet.container}>
      <Button text="Connect to Game" />
    </View>
  );
};
export default Connection;
