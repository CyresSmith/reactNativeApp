import {
  TextInput,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from 'react-native';
import { useEffect, useState } from 'react';

import styles from './LoginScreenStyles';

const authInitialState = {
  email: '',
  password: '',
};

const inputFocusInitialState = {
  email: false,
  pass: false,
};

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [authState, setAuthState] = useState(authInitialState);
  const [isInputFocused, setIsInputFocused] = useState(inputFocusInitialState);
  const [hidePass, setHidePass] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width
  );

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onLoginBtnClick = () => {
    console.log(authState);
    setAuthState(authInitialState);
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setWindowWidth(width);
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require('../../../assets/images/sergio-souza.jpg')}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
          >
            <View
              style={{
                ...styles.formBackground,
                paddingBottom:
                  windowWidth < 400 ? (isShowKeyboard ? 32 : 144) : 16,
                marginHorizontal: windowWidth < 400 ? 0 : 130,
              }}
            >
              <Text style={styles.loginTitle}>Увійти</Text>

              <View style={{ width: 343 }}>
                <TextInput
                  style={{
                    ...styles.input,
                    marginTop: 16,
                    borderColor: isInputFocused.email ? '#FF6C00' : '#E8E8E8',
                  }}
                  placeholder={'Адреса електронної пошти'}
                  placeholderTextColor={'#BDBDBD'}
                  inputmode={'email'}
                  keyboardType={'email-address'}
                  value={authState.email}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsInputFocused(prevState => ({
                      ...prevState,
                      email: true,
                    }));
                  }}
                  onBlur={() => setIsInputFocused(inputFocusInitialState)}
                  onChangeText={value => {
                    setAuthState(prevState => ({ ...prevState, email: value }));
                  }}
                  onSubmitEditing={keyboardHide}
                />

                <View style={{ position: 'relative' }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      marginTop: 16,
                      borderColor: isInputFocused.pass ? '#FF6C00' : '#E8E8E8',
                    }}
                    placeholder={'Пароль'}
                    placeholderTextColor={'#BDBDBD'}
                    secureTextEntry={hidePass}
                    value={authState.password}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsInputFocused(prevState => ({
                        ...prevState,
                        pass: true,
                      }));
                    }}
                    onBlur={() => setIsInputFocused(inputFocusInitialState)}
                    onChangeText={value => {
                      setAuthState(prevState => ({
                        ...prevState,
                        password: value,
                      }));
                    }}
                    onSubmitEditing={keyboardHide}
                  />
                  <TouchableOpacity
                    style={styles.passShow}
                    activeOpacity={0.75}
                    onPressIn={() => setHidePass(false)}
                    onPressOut={() => setHidePass(true)}
                  >
                    <Text style={styles.passShowText}>Показати</Text>
                  </TouchableOpacity>
                </View>

                {!isShowKeyboard && (
                  <>
                    <TouchableOpacity
                      style={{
                        ...styles.signInBtn,
                        marginTop: windowWidth < 400 ? 43 : 16,
                      }}
                      activeOpacity={0.75}
                      onPress={() => {
                        keyboardHide();
                        onLoginBtnClick();
                      }}
                    >
                      <Text style={styles.signInBtnText}>Увійти</Text>
                    </TouchableOpacity>
                    <Text style={styles.signUpRedirect}>
                      Немає облікового запису? Зареєструватися
                    </Text>
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
