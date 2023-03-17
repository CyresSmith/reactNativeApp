import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    borderBottomWidth: 1,
  },

  textInputIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: '50%',
    transform: [{ translateY: 12 }],
  },
});

export default styles;
