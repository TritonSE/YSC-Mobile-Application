import React, { useContext } from "react";
import {View} from "react-native";
import Button from "../components/Button";
import { AppStylesheet } from "../styles/AppStylesheet";
import { SocketContext } from '../contexts/SocketContext';


const Connection = () => {
    const socket = useContext(SocketContext);

    return (
        <View styles={AppStylesheet.container}>
            <Button text="Connect to Game"/>
        </View>
    )
}
export default Connection;