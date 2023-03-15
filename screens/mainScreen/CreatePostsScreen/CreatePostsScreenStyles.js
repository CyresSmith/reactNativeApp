import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  img: {
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    overflow: 'hidden',

    height: 240,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },

  addBtn: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  editPhoto: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
    color: '#BDBDBD',
  },

  textInput: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
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

  deletBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 34,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
