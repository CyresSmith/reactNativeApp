import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

import { getAuth } from './redux/selectors';

import useRoute from './screens/router';

const AppBox = () => {
  const auth = useSelector(getAuth);
  const routing = useRoute(auth);

  return <View style={styles.container}>{routing}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
});

export default AppBox;
