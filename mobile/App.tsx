import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Roboto_400Regular} from '@expo-google-fonts/roboto';



function SplashScreen2() {
  return (
    <View style={[{backgroundColor: "#D4DDDD"}, styles.container]}>
      <Image
        style = {styles.ystemLogo}
        source={require('./assets/YStemLogo1.png')}
      />
    </View>
  );
  }


  function LogInScreen() {
    return (
      <View style={[{backgroundColor: "#FFF"}, styles.container]}>
        <View>
        <Image
          style = {styles.Stemett}
          source={require('./assets/Stemett.png')}
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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        {/* <Stack.Screen name="Splash Screen 2" component={SplashScreen2}  options={{headerShown:false}}/> */}
        <Stack.Screen name="Login page" component={LogInScreen}  options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       <Image
//         style = {styles.ystemLogo}
//         source={require('./assets/YStemLogo 1.png')}
//        />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ystemLogo: {
    width:327,
    height:142
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
