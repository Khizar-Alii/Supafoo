import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../constants/colors';
const {width,height} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';
import Button from '../../components/CustomButton/Button';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../config/firebaseConfig';
import Toast from 'react-native-toast-message';


const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const navigation = useNavigation()



  // function to handle the login

  const handleLogin = async() =>{
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth,email,password)
      if (response?.user) {
        Toast.show({
          type: 'success',
          text1: 'Hurray!',
          text2: 'Login Successfully',
          visibilityTime: 2000,
          onHide: () => setLoading(false),
        });
        setEmail('')
        setPassword('')
        // Navigate to Home screen
        navigation.replace('home');
      }
    } catch (error) {
      console.log('error while logging in', error);
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Error While logging in...',
        visibilityTime: 2000,
        onHide: () => setLoading(false),
      });
      setLoading(false); 
    }finally{
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex: 1, backgroundColor: colors.tabBarBg}}>
      
    <ScrollView style={{flex : 1,backgroundColor : colors.tabBarBg}}>
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.imageContainer}
          source={require('../../assets/Designs/bigicon.png')}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.content}>
          <Image
            source={require('../../assets/Designs/email-icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <TextInput
            placeholder="example@gmail.com"
            style={styles.input}
            placeholderTextColor={colors.placeholder}
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.content}>
          <Image
            source={require('../../assets/Designs/password-icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <TextInput
            placeholder="*********"
            style={styles.input}
            placeholderTextColor={colors.placeholder}
            value={password}
            onChangeText={val => setPassword(val)}
            secureTextEntry={showPassword}
          />
          {password.length > 0 && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={
                  showPassword
                    ? require('../../assets/Designs/showPass.png')
                    : require('../../assets/Designs/hidePass.png')
                }
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity style={{paddingHorizontal: width * 0.03}}>
        <Text style={{color: colors.openGreen, textAlign: 'right'}}>
          Forget Password?
        </Text>
      </TouchableOpacity>
      <View style={{marginTop: width * 0.07}}>
        <Button
          title={'log in'}
          onPress={handleLogin}
          style={{paddingVertical: width * 0.03}}
          loading = {loading}
        />
      </View>


      {/* to draw a line -----OR----- this */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: width * 0.1,
        }}>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: colors.placeholder,
            marginLeft: width * 0.09,
          }}
        />
        <Text style={{color: colors.placeholder, paddingHorizontal: 10}}>
          OR
        </Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: colors.placeholder,
            marginRight: width * 0.09,
          }}
        />
      </View>

      {/*accounts links  */}
      <View style={styles.accounts}>
        <TouchableOpacity style={styles.accountBtn}>
          <Image
            style={styles.accountsImgz}
            source={require('../../assets/Designs/google.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountBtn}>
          <Image
            style={styles.accountsImgz}
            source={require('../../assets/Designs/apple.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountBtn}>
          <Image
            style={styles.accountsImgz}
            source={require('../../assets/Designs/fb.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* dont have an account */}
      <View style={styles.noAccountView}>
        <Text style={styles.noAccountText}>Don't you have an account?</Text>
        <TouchableOpacity onPress={() => {navigation.navigate("signup")}}>
          <Text style={[styles.noAccountText,{textDecorationLine:'underline',color:colors.openGreen}]}>sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tabBarBg,
  },
  imageContainer: {
    width: width * 0.3,
    height: height * 0.3,
    // height: 150,
  },
  inputContainer: {
    marginHorizontal: width * 0.06,
    gap: 3,
    marginBottom: 10,
  },
  label: {
    fontSize: RFValue(13, 580),
    color: colors.tabBarActiveTint,
  },
  input: {
    color: colors.tabBarActiveTint,
    fontSize: RFValue(10, 580),
    flex: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.03,
    height: width * 0.11,
    overflow:'hidden'
  },
  icon: {
    width: width * 0.04,
  },
  accounts: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  accountsImgz: {
    borderRadius: 99,
    width: 30,
    height: 30,
  },
  accountBtn: {
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 99,
    width: width * 0.12,
    height: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noAccountView : {
    flexDirection : 'row',
    gap : 10,
    flex : 1,
    justifyContent : 'center',
    marginTop : width * 0.12
  },
  noAccountText : {
    letterSpacing:1,
    color : colors.placeholder,
    fontSize: RFValue(12, 580),
  }
});
