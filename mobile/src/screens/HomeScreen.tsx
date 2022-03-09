import React from "react";
import { Text, View} from "react-native";

import Button from "../components/Button";
import { AppStylesheet } from "../styles/AppStylesheet";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ForgotPassword from "./ForgotPassword";

const HomeScreen = () => 
{
    // const Tab = createBottomTabNavigator();

    return(
        <View style = {AppStylesheet.container}>
            <Text style = {AppStylesheet.headerHomeScreen}>Welcome, User</Text>

             <Button text="Play Game With A Mentor" />
             <Button text="Play Game With A Student" />

            <Text>14 Players Online</Text>

            {/* <Tab.Navigator>
                <Tab.Screen name = "Home" component = {ForgotPassword} />
                <Tab.Screen name = "Lessons" component = {ForgotPassword} />
                <Tab.Screen name = "Profile" component = {ForgotPassword} />
            </Tab.Navigator> */}
        
        </View>
    );
};

export default HomeScreen;