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
    resizeMode: 'cover',
  },

  selectSource: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
  },

  editPhoto: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
    color: '#BDBDBD',
  },
});

export default styles;
