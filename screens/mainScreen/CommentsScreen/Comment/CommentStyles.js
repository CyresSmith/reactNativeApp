import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },

  userImg: {
    marginRight: 'auto',
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  commentBox: {
    padding: 16,
    flex: 0.95,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },

  commentText: {
    textAlign: 'left',
    fontFamily: 'SofiaSansMedium',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },

  commentDate: {
    fontFamily: 'SofiaSansMedium',
    fontSize: 10,
    lineHeight: 12,
    color: '#BDBDBD',
    textAlign: 'right',
    marginTop: 8,
  },
});

export default styles;
