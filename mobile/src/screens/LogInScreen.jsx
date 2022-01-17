import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

function LogInScreen() {
    return (
      <View style={[{backgroundColor: "#FFF"}, styles.container]}>
        <View>
        <Image
          style = {styles.Stemett}
          source={require('../../assets/Stemett.png')}
        />
        </View>

        <View> 
        <Pressable 
            style = {styles.LogInScreenButton}>
            <Text
              style = {styles.LogInScreenButtonText}> 
              {'Login'}
            </Text>
        </Pressable>

        <Pressable 
            style = {styles.LogInScreenButton}>
            <Text 
              style = {styles.LogInScreenButtonText}> 
              {'Sign Up'}
            </Text>
        </Pressable>

        <Pressable 
            style = {styles.ForgotPassword}>
            <Text 
              style = {styles.ForgotPasswordText}> 
              {'Forgot Password'}
            </Text>
        </Pressable>

        </View>
      </View>
    );
    }


export default LogInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    Stemett: {
      width:156,
      height: 369
    },
  
    ForgotPassword: {
      width: 114,
      height: 18,
      marginTop: 20
    },
  
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
  
  });