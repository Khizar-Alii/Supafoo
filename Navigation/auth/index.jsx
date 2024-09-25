import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../../screens/onBoarding/index';
import Login from '../../screens/auth/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginOrRegister from '../../screens/auth/LoginOrRegister';
import Signup from '../../screens/auth/Signup';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onBoarded = await AsyncStorage.getItem('onBoarded');
    if (onBoarded == '1') {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };


  if (showOnboarding === null) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={showOnboarding ? "Onboarding" : "LoginOrRegister"}>
        {showOnboarding && (
          <Stack.Screen
            name="Onboarding"
            component={OnBoarding}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="LoginOrRegister"
          component={LoginOrRegister}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;