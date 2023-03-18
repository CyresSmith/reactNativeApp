import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { authStateChanged } from './redux/operations';

import { getAuthState } from './redux/selectors';

import useRoute from './screens/router';

const AppBox = () => {
  const dispatch = useDispatch();
  const auth = useSelector(getAuthState);

  useEffect(() => {
    dispatch(authStateChanged());
  }, [auth]);

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
