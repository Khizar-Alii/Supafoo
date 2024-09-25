import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../constants/colors';
const {width, height} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';
import Button from '../../components/CustomButton/Button';
import Toast from 'react-native-toast-message';
import {validatePassword, validateEmail} from './Validate';
import {auth} from '../../config/firebaseConfig';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

const Signup = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfrimPassword, setShowConfrimPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      // first check all the inputs are included
      if (!fullName || !email || !password || !confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'Warning!',
          text2: 'Please input all the required fields',
          visibilityTime: 1500,
          onHide: () => setLoading(false),
        });
        setLoading(false);
        return;
      }
      // then check weather password is matching with confirm password
      if (password !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'Warning!',
          text2: 'Password and Confirm Password must be the same',
          visibilityTime: 1500,
          onHide: () => setLoading(false),
        });
        setLoading(false);
        return;
      }
      // check weather password is strong or not
      let strongPass = validatePassword(password);
      if (!strongPass.valid) {
        Toast.show({
          type: 'error',
          text1: 'Warning!',
          text2: strongPass?.message,
          visibilityTime: 3000,
          onHide: () => setLoading(false),
        });
        setLoading(false);
        return;
      }
      // check weather email is valid or not
      let validEmail = validateEmail(email);
      if (!validEmail.valid) {
        Toast.show({
          type: 'error',
          text1: 'Warning!',
          text2: validEmail?.message,
          visibilityTime: 3000,
          onHide: () => setLoading(false),
        });
        setLoading(false);
        return;
      }

      // firebase should register the user and saved the data on firebase
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      //  then update the user e.g by adding the name
      await updateProfile(response.user, {
        displayName: fullName,
      });
      if (response?.user) {
        Toast.show({
          type: 'success',
          text1: 'Hurray!',
          text2: 'Registration Successfully',
          visibilityTime: 2000,
          onHide: () => setLoading(false),
        });
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setLoading(false);
        // Navigate to Login screen
        navigation.replace('Login');
      }
    } catch (error) {
      console.log('error while signing up', error);
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Error While signing up...',
        visibilityTime: 2000,
        onHide: () => setLoading(false),
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: colors.tabBarBg}}>
      <ScrollView
        style={{flex: 1, backgroundColor: colors.tabBarBg}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={styles.imageContainer}
              source={require('../../assets/Designs/bigicon.png')}
              resizeMode="contain"
            />
          </View>
          {/* all inputs */}

          <View style={styles.allInputs}>
            {/* full name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.content}>
                <Image
                  source={require('../../assets/Designs/user-name-icon.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <TextInput
                  placeholder="Khizar ALi"
                  style={styles.input}
                  placeholderTextColor={colors.placeholder}
                  value={fullName}
                  onChangeText={value => setFullName(value)}
                />
              </View>
            </View>
            {/* email */}
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
                  keyboardType="email-address"
                />
              </View>
            </View>
            {/* password */}
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
                  value={password}
                  placeholderTextColor={colors.placeholder}
                  onChangeText={val => setPassword(val)}
                  secureTextEntry={showPassword}
                />
                {password.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}>
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
            {/* confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.content}>
                <Image
                  source={require('../../assets/Designs/password-icon.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <TextInput
                  placeholder="*********"
                  style={styles.input}
                  value={confirmPassword}
                  placeholderTextColor={colors.placeholder}
                  onChangeText={val => setConfirmPassword(val)}
                  secureTextEntry={showConfrimPassword}
                />
                {confirmPassword.length > 0 && (
                  <TouchableOpacity
                    onPress={() =>
                      setShowConfrimPassword(!showConfrimPassword)
                    }>
                    <Image
                      style={styles.icon}
                      resizeMode="contain"
                      source={
                        showConfrimPassword
                          ? require('../../assets/Designs/showPass.png')
                          : require('../../assets/Designs/hidePass.png')
                      }
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          {/* signup button */}
          <View style={{marginTop: width * 0.07}}>
            <Button
              title={'sign up'}
              onPress={handleSignUp}
              style={{paddingVertical: width * 0.03}}
              loading={loading}
            />
          </View>

          {/* to draw a line -----OR----- this */}
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: width * 0.07,
            }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: colors.placeholder,
                marginLeft: width * 0.09,
              }}
            />
            <Text
              style={{
                color: colors.placeholder,
                paddingHorizontal: 10,
                fontWeight: '700',
              }}>
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
            <Text style={styles.noAccountText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text
                style={[
                  styles.noAccountText,
                  {textDecorationLine: 'underline', color: colors.openGreen},
                ]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  imageContainer: {
    width: width * 0.3,
    height: height * 0.25,
    //   height: 200,
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
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.03,
    height: width * 0.11,
    overflow: 'hidden',
  },
  icon: {
    width: width * 0.04,
  },
  accounts: {
    flexDirection: 'row',
    //   flex: 1,
    justifyContent: 'center',
    gap: 10,
    marginBottom: height * 0.03,
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
  noAccountView: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    justifyContent: 'center',
  },
  noAccountText: {
    letterSpacing: 1,
    color: colors.placeholder,
    fontSize: RFValue(12, 580),
  },
});
