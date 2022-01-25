// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useFonts, Roboto_400Regular} from '@expo-google-fonts/roboto';
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

type splashScreenProp = StackNavigationProp<RootStackParamList, "Splash Screen">;

function SplashScreen() {
  const navigation = useNavigation<splashScreenProp>();

  setTimeout(() => {
    navigation.navigate("Login page");
  }, 5000);

  return (
    <View style={[{ backgroundColor: "#D4DDDD" }, styles.container]}>
      <Image style={styles.ystemLogo} source={require("../../assets/YStemLogo1.png")} />
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  ystemLogo: {
    width: 327,
    height: 142,
  },
});
