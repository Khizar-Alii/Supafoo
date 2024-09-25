// App.jsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AppNavigation from './Navigation/AppNavigation';
import Toast from 'react-native-toast-message';


function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <AppNavigation />
      {/* to get the toast anywhere in the app */}
      <Toast />
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
};

export default App;