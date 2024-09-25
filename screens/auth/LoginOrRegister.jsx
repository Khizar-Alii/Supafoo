import { Dimensions, Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../../constants/colors';
import Button from '../../components/CustomButton/Button';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const LoginOrRegister = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image style={styles.imageContainer} source={require("../../assets/Designs/bigicon.png")} resizeMode="contain" />
      </View>
      <Button title="Log in" onPress={() => {navigation.navigate("Login")}} />
      <Button title="sign up" onPress={() => {navigation.navigate("signup")}} style={{ backgroundColor: "#FFFFFF",borderWidth : 1,borderColor : '#FF9200' }} textStyle={{ color: "#FF9200" }} />
    </View>
  );
};

export default LoginOrRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tabBarBg,
    justifyContent: 'center',
    gap: 10,
  },
  imageContainer: {
    width: width * 0.56,
    height: width,
  },
});