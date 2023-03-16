import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 240,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    overflow: 'hidden',
  },

  noComments: {
    flex: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
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
      color: '#BDBDBD',
    },

    btn: {
      width: 34,
      height: 34,
      borderRadius: 17,
      position: 'absolute',
      right: 24,
      bottom: 24,
      backgroundColor: '#FF6C00',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

export default styles;
