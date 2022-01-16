import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Roboto_400Regular} from '@expo-google-fonts/roboto';
import SplashScreen from "./src/screens/SplashScreen"
import LogInScreen from "./src/screens/LogInScreen"

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        {/* <Stack.Screen name="Splash Screen" component={SplashScreen}  options={{headerShown:false}}/> */}
        <Stack.Screen name="Login page" component={LogInScreen}  options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
