import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../constants/colors';
const {width} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';

const Button = ({title, onPress, style, textStyle, loading = false}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnContainer, style]}>
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.primary} />
      ) : (
        <Text style={[styles.btnText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    marginHorizontal: width * 0.09,
    backgroundColor: colors.openGreen,
    paddingVertical: width * 0.04,
    borderRadius: width * 0.06,
  },
  btnText: {
    color: colors.tabBarBg,
    textAlign: 'center',
    fontSize: RFValue(14, 580),
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
