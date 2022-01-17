import { StyleSheet, Text, View, Image, Pressable, TextInput, SafeAreaView} from 'react-native';
import React from 'react';


function LoginScreen2 ()
{
    const [text, changedText] = React.useState("Example Padding");

    return (
        <View 
        style={styles.container}>
        
        <View>
            <Image
            style = {styles.STEMy_Mascot}
            source={require('../../assets/STEMy_Mascot.png')}
            />
        </View>


        {/* username text input field */}
        <SafeAreaView>
            <TextInput
                style = {styles.UsernameTextField}
                onChangeText={changedText}
                value = {text}
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

        </View>
    );
}

export default LoginScreen2;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    STEMy_Mascot: {
        width:375,
        height:375,

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
        background: '#FFFFFF',
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

});
  