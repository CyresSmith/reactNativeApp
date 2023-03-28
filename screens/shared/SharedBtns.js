import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
// import * as Animatable from 'react-native-animatable';

import { authSignOutUser } from '../../redux/operations';

import sharedStyles from './sharedStyles';

export const PrimaryBtn = ({
  onPress,
  disabled,
  label,
  marginTop,
  marginBottom,
  loading,
}) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity
      style={{
        ...sharedStyles.primaryBtn,
        marginTop: marginTop,
        marginBottom: marginBottom,
        backgroundColor: disabled ? '#F6F6F6' : '#FF6C00',
      }}
      activeOpacity={0.75}
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {loading && (
          <Animated.View
            style={{
              transform: [{ rotate: spin }],
              marginRight: 8,
            }}
          >
            <Feather
              style={{
                alignSelf: 'center',
              }}
              name="loader"
              size={20}
              color="#BDBDBD"
            />
          </Animated.View>
        )}

        <Text
          style={{
            ...sharedStyles.primaryBtnText,
            color: disabled ? '#BDBDBD' : '#ffffff',
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const PrimaryIconBtn = ({
  onPress,
  disabled,
  icon,
  marginTop,
  marginBottom,
  marginLeft = 'auto',
  marginRight = 'auto',
  type,
}) => {
  const style = () => {
    if (type === 'accent') {
      return {
        ...sharedStyles.primaryIconBtn,
        ...sharedStyles.primaryIconBtn.accent,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
      };
    }

    return {
      ...sharedStyles.primaryIconBtn,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
    };
  };

  return (
    <TouchableOpacity
      style={style()}
      activeOpacity={0.75}
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}
    >
      {icon}
    </TouchableOpacity>
  );
};

export const GoBackBtn = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ marginLeft: 16 }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Feather name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
  );
};

export const LogoutBtn = props => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(authSignOutUser());
      }}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

export const AddPostBtn = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#FF6C00',
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};
