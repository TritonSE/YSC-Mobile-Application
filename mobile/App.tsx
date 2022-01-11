import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


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

// hi


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Splash Screen 2" component={SplashScreen2}  options={{headerShown:false}}/>
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

});
