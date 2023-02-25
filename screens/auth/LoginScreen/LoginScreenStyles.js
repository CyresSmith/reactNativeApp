import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },

  formBackground: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
  },

  loginTitle: {
    fontSize: 30,
    lineHeight: 35,
    marginTop: 32,
    color: '#212121',
    fontFamily: 'SofiaSansMedium',
  },

  input: {
    height: 50,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 18.75,
  },

  passShow: {
    position: 'absolute',
    bottom: 15,
    right: 16,
  },

  passShowText: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },

  signInBtn: {
    padding: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 25,
  },

  signInBtnText: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#ffffff',
  },

  signUpRedirect: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
    color: '#1B4371',
    textAlign: 'center',
  },
});

export default styles;
