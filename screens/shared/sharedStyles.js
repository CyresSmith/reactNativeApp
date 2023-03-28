import { StyleSheet } from 'react-native';

const sharedStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },

  innerContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
    height: '100%',
  },

  backgroundImage: {
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

  avatar: {
    flex: 1,
  },

  avatarBackground: {
    position: 'relative',
    height: 120,
    width: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    marginTop: -60,
    overflow: 'hidden',
  },

  avatarAdd: {
    position: 'absolute',
    height: 25,
    width: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    bottom: 14,
    right: -12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  authTitle: {
    fontFamily: 'SofiaSansMedium',
    fontSize: 30,
    lineHeight: 35,
    marginTop: 32,
    color: '#212121',
  },

  authInput: {
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

  primaryBtn: {
    padding: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 25,
    alignItems: 'center',
  },

  primaryBtnText: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#ffffff',
  },

  primaryIconBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',

    accent: {
      backgroundColor: '#FF6C00',
    },
  },

  authRedirect: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
    color: '#1B4371',
    textAlign: 'center',
  },
});

export default sharedStyles;
