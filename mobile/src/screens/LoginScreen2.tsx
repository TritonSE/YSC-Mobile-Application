import { StyleSheet, Text, View, Image, Pressable, TextInput, SafeAreaView} from 'react-native';
import React from 'react';


import {useNavigation } from '@react-navigation/native'

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParams';

type logIn2ScreenProp = StackNavigationProp<RootStackParamList, "Login page 2">;


function LoginScreen2 ()
{
    const navigation = useNavigation<logIn2ScreenProp>();
    const [usernameText, changedUsernameText] = React.useState("Example Padding");
    const [passwordText, changedPasswordText] = React.useState("Example Padding");

    return (
        <View 
        style={styles.container}>
        
        <View>
            <Image
            style = {styles.STEMy_Mascot}
            source={require('../../assets/STEMy_Mascot.png')}
            />
        </View>

        {/* <br>
        </br> */}

        <Text style = {styles.TextHeader}>
            {"Username"}
        </Text>

        {/* username text input field */}
        <SafeAreaView>
            <TextInput
                style = {styles.UsernameTextField}
                onChangeText={changedUsernameText}
                value = {usernameText}
            />
        </SafeAreaView>

        {/* <br>
        </br> */}


        <Text style = {styles.TextHeader}>
            {"Password"}
        </Text>

        {/* password text input field */}
        <SafeAreaView>
            <TextInput
                style = {styles.PasswordTextField}
                onChangeText={changedPasswordText}
                value = {passwordText}
            />
        </SafeAreaView>


        {/* reusing same code from LoginScreen.jsx */}
        <View> 
        <Pressable 
            style = {styles.LogInScreenButton}>
            <Text
              style = {styles.LogInScreenButtonText}> 
              {'Login'}
            </Text>
        </Pressable>
        </View>
    
        {/* same code from LoginInScreen.jsx */}
        <Pressable 
            style = {styles.ForgotPassword}
            onPress={() => navigation.navigate("forgot password screen")}>
            <Text 
              style = {styles.ForgotPasswordText}> 
              {'Forgot Password'}
            </Text>
        </Pressable>

        </View>
    );
}

export default LoginScreen2;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },

    STEMy_Mascot: {
        width:375,
        height:375,

    },

    // same code from ForgotPassword.jsx file 
    TextHeader: {
        color: '#000000',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        // alignContent: 'left',
    },

    // same code from LoginInScreen.jsx
    LogInScreenButton: {
        backgroundColor: '#96C957',
        width: 327,
        height: 52,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
        // flex: 1,
        // order: 0,
        // flexGrow: 0,
        
      },
    
    
    // reusing same code from LoginInScreen.jsx
    LogInScreenButtonText: {
        position: 'absolute',
        fontSize: 18,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 21,
        /* identical to box height */
    
        // textAlign: 'center',
        // textTransform: 'capitalize'
    },

    UsernameTextField: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        // position: 'absolute',    
        borderRadius: 3,
        // background: '#FFFFFF',
        width: 327,
        height: 37,
        // top: 19,
        // bottom: 3,
        borderWidth: 1,
        borderColor: '#000000',
        alignContent: 'center',
        left: '0%',
        right: '0%',
        top: '33.93%',
    },

    PasswordTextField: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        // position: 'absolute',    
        borderRadius: 3,
        // background: '#FFFFFF',
        width: 327,
        height: 37,
        // top: 19,
        // bottom: 3,
        borderWidth: 1,
        borderColor: '#000000',
        alignContent: 'center',
        left: '0%',
        right: '0%',
        top: '33.93%',
    },

    // same code from LoginInScreen.jsx
    ForgotPassword: {
        width: 114,
        height: 18,
        marginTop: 20
      },
    
    // same code from LoginInScreen.jsx
    ForgotPasswordText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        lineHeight: 18,
        /* identical to box height */
    
        textAlign: 'center',
        textDecorationLine: 'underline'
      },
});
  