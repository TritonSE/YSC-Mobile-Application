import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Roboto_400Regular} from '@expo-google-fonts/roboto';



function SplashScreen2() {
  return (
    <View style={styles.container}>
      <Image
        style = {styles.ystemLogo}
        source={require('./assets/YStemLogo1.png')}
      />
    </View>
  );
  }


  function LogInScreen() {
    return (
      <View style={styles.container}>

        <Image
          style = {styles.Stemett}
          source={require('./assets/Stemett.png')}
        />

        {/* <br>
        </br> */}
       
        <Pressable 
            style = {styles.LoginButton}>
            <Text
              style = {styles.LogInScreenButtonText}> 
              {'Login'}
            </Text>
        </Pressable>

        {/* <br>
        </br> */}

        <Pressable 
            style = {styles.SignUpButton}>
            <Text 
              style = {styles.LogInScreenButtonText}> 
              {'Sign Up'}
            </Text>
        </Pressable>

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
    backgroundColor: '#E5E5E5',
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

  LoginButton: {
    backgroundColor: '#96C957',
    width: 327,
    height: 52,
    // position: 'absolute',
    // borderRadius: 3,
  },

  SignUpButton: {
    backgroundColor: '#96C957',
    width: 327,
    height: 52,
    // position: 'absolute',
    // borderRadius: 3,
  },

  LogInScreenButtonText: {
    position: 'absolute',
    fontSize: 18,
    // alignContent: 'center',
    // fontFamily: Roboto_400Regular,
  },

});
