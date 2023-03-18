import {
  TextInput,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setAuth, setUser } from '../../../redux/authSlice';

import styles from './LoginScreenStyles';
import sharedStyles from '../../shared/sharedStyles';

import { PrimaryBtn } from '../../shared/SharedBtns';

import useKeyboardShownToggle from '../../shared/Utils/useKeyboardShownToggle';

import { authSignInUser } from '../../../redux/operations';

const userInitialState = {
  email: '',
  password: '',
};

const inputFocusInitialState = {
  email: false,
  pass: false,
};

export default function LoginScreen({ navigation }) {
  const [userState, setUserState] = useState(userInitialState);
  const [isInputFocused, setIsInputFocused] = useState(inputFocusInitialState);
  const [hidePass, setHidePass] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width
  );
  const dispatch = useDispatch();

  const [keyboardShown, setKeyboardShown, keyboardShownToggle] =
    useKeyboardShownToggle();

  const { email, password } = userState;

  const onLoginBtnClick = () => {
    if (email && password) {
      // dispatch(setUser(userState));
      // dispatch(setAuth(true));

      dispatch(authSignInUser(userState));
      keyboardShownToggle();
      setUserState(userInitialState);
    }
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setWindowWidth(width);
    };

    Dimensions.addEventListener('change', onChange);

    // return () => {
    //   Dimensions.removeEventListener('change', onChange);
    // };
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        keyboardShown && keyboardShownToggle();
      }}
    >
      <View style={sharedStyles.container}>
        <ImageBackground
          style={sharedStyles.backgroundImage}
          source={require('../../../assets/images/sergio-souza.jpg')}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
          >
            <View
              style={{
                ...sharedStyles.formBackground,
                paddingBottom:
                  windowWidth < 400 ? (keyboardShown ? 32 : 144) : 16,
                marginHorizontal: windowWidth < 400 ? 0 : 130,
              }}
            >
              <Text style={sharedStyles.authTitle}>Увійти</Text>

              <View style={{ width: 343 }}>
                <TextInput
                  style={{
                    ...sharedStyles.authInput,
                    marginTop: 16,
                    borderColor: isInputFocused.email ? '#FF6C00' : '#E8E8E8',
                  }}
                  placeholder={'Адреса електронної пошти'}
                  placeholderTextColor={'#BDBDBD'}
                  inputmode={'email'}
                  keyboardType={'email-address'}
                  value={userState.email}
                  onFocus={() => {
                    setIsInputFocused(prevState => ({
                      ...prevState,
                      email: true,
                    }));

                    !keyboardShown && keyboardShownToggle();
                  }}
                  onBlur={() => setIsInputFocused(inputFocusInitialState)}
                  onChangeText={value => {
                    setUserState(prevState => ({ ...prevState, email: value }));
                  }}
                  onSubmitEditing={keyboardShownToggle}
                />

                <View style={{ position: 'relative' }}>
                  <TextInput
                    style={{
                      ...sharedStyles.authInput,
                      marginTop: 16,
                      borderColor: isInputFocused.pass ? '#FF6C00' : '#E8E8E8',
                    }}
                    placeholder={'Пароль'}
                    placeholderTextColor={'#BDBDBD'}
                    secureTextEntry={hidePass}
                    value={userState.password}
                    onFocus={() => {
                      setIsInputFocused(prevState => ({
                        ...prevState,
                        pass: true,
                      }));

                      !keyboardShown && keyboardShownToggle();
                    }}
                    onBlur={() => setIsInputFocused(inputFocusInitialState)}
                    onChangeText={value => {
                      setUserState(prevState => ({
                        ...prevState,
                        password: value,
                      }));
                    }}
                    onSubmitEditing={keyboardShownToggle}
                  />
                  <TouchableOpacity
                    style={sharedStyles.passShow}
                    activeOpacity={0.75}
                    onPressIn={() => setHidePass(false)}
                    onPressOut={() => setHidePass(true)}
                  >
                    <Text style={sharedStyles.passShowText}>Показати</Text>
                  </TouchableOpacity>
                </View>

                {keyboardShown === false && (
                  <>
                    <PrimaryBtn
                      onPress={onLoginBtnClick}
                      disabled={email && password ? false : true}
                      label="Увійти"
                      marginTop={windowWidth < 400 ? 43 : 16}
                    />

                    <TouchableOpacity
                      activeOpacity={0.75}
                      onPress={() => navigation.navigate('Register')}
                    >
                      <Text style={sharedStyles.authRedirect}>
                        Немає облікового запису? Зареєструватися
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
