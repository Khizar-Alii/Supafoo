import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import { ONBOARDING_DATA } from '../../constants/data/onBoardingData';
import { colors } from '../../constants/colors';
import { setItem } from '../../utils/asyncStorage';

const { width } = Dimensions.get('window');

const OnBoarding = () => {
  const navigation = useNavigation();

  const onDone = () => {
    navigation.navigate('LoginOrRegister');
    setItem('onBoarded', '1');
  };

  const doneButton = ({ ...props }) => (
    <TouchableOpacity {...props} style={styles.buttonContainer}>
      <Text style={{ fontSize: width * 0.039, letterSpacing: 1, fontWeight: 'bold' }}>Done</Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <Onboarding
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        onDone={onDone}
        onSkip={onDone}
        pages={ONBOARDING_DATA.map(item => ({
          backgroundColor: item.backgroundColor,
          image: (
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>
          ),
          title: <Text />,
          subtitle: <Text style={styles.subtitle}>{item.text}</Text>,
        }))}
      />
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    fontSize: width * 0.045,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#555',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: colors.tabBarActiveTint,
    borderTopLeftRadius: 99,
    borderBottomLeftRadius: 99,
  },
});
