import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
  },

  avatarBackground: {
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
});

export default styles;
