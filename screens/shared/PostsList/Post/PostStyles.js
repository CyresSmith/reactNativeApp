import { StyleSheet } from 'react-native';

const postStyles = StyleSheet.create({
  box: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },

  img: {
    flex: 1,
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
    resizeMode: 'cover',
  },

  captionBox: {
    flex: 1,
    marginTop: 8,
  },

  caption: {
    fontFamily: 'SofiaSansMedium',
    fontSize: 16,
    lineHeight: 19,
  },

  commentCountBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  commentCount: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    marginLeft: 9,
  },

  commentPlaceBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },

  place: {
    fontFamily: 'SofiaSansRegular',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
});

export default postStyles;
