import { StyleSheet } from 'react-native';

const userStyles = StyleSheet.create({
  box: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  userName: {
    fontFamily: 'SofiaSansBold',
    fontSize: 13,
    lineHeight: 15,
  },

  userMail: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 11,
    lineHeight: 13,
  },

  avatar: {
    width: 60,
    height: 60,
    backgroundColor: 'gray',
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default userStyles;
