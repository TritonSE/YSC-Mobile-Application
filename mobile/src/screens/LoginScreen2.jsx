import { StyleSheet, Text, View, Image, Pressable, TextInput} from 'react-native';


function LoginScreen2()
{

    return (
        <View style={styles.container}>
          <Image
            style = {styles.STEMy_Mascot}
            source={require('../../assets/STEMy_Mascot.png')}
          />
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
        height:375
    },
});
  