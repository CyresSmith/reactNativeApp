import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './redux/store';

import { StyleSheet, View } from 'react-native';

import AppBox from './AppBox';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          SofiaSansLight: require('./assets/fonts/static/SofiaSansLight.ttf'),
          SofiaSansRegular: require('./assets/fonts/static/SofiaSansRegular.ttf'),
          SofiaSansMedium: require('./assets/fonts/static/SofiaSansMedium.ttf'),
          SofiaSansBold: require('./assets/fonts/static/SofiaSansBold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <AppBox />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
});
