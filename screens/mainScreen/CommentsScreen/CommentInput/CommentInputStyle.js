import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  commentInputBox: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 16,
    backgroundColor: 'white',
  },

  input: {
    height: 50,
    borderRadius: 25,
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    paddingLeft: 16,
    fontFamily: 'SofiaSansMedium',
    fontSize: 16,
    lineHeight: 19,
    // color: '#BDBDBD',
  },

  btn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    position: 'absolute',
    right: 24,
    bottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
