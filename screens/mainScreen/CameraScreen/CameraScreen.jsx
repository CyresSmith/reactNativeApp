import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import { PrimaryIconBtn } from '../../shared/SharedBtns';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

// import * as Location from 'expo-location';

const CameraScreen = ({ route }) => {
  const navigation = useNavigation();
  // const [type, setType] = useState(CameraType.back);
  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState();
  const [status, requestPermission] = Camera.useCameraPermissions();
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    requestPermission();
    console.log(status);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     // let location = await Location.getCurrentPositionAsync({});
  //     // setLocation(location);
  //   })();
  // }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const cancelPreview = async () => {
    await camera.resumePreview();
    setIsPreview(false);
  };

  const takePhoto = async () => {
    // const options = { quality: 0.5, base64: true, skipProcessing: true };
    const data = await camera.takePictureAsync();
    // let location = await Location.getCurrentPositionAsync({});

    const photo = data.uri;

    if (photo) {
      // const { coords } = location;
      // const { latitude, longitude } = coords;

      // console.log('coords: ', coords);

      await camera.pausePreview();
      setIsPreview(true);
      navigation.navigate('Створити публікацію', {
        photo,
        // location: {
        //   latitude,
        //   longitude,
        // },
      });
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  // const takePhoto = async () => {
  //   if (!permission.granted) {
  //     return;
  //   }
  //   const photo = await camera.takePictureAsync();
  //   navigation.navigate('Створити публікацію', { photo });
  // };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Camera
        style={styles.camera}
        type={cameraType}
        ref={setCamera}
        onCameraReady={onCameraReady}
      ></Camera>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 32,
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          height: 60,
          padding: 10,
          borderRadius: 30,
        }}
      >
        <PrimaryIconBtn
          icon={<MaterialIcons name="arrow-back" size={24} color="#FF6C00" />}
          marginTop={0}
          marginBottom={0}
          marginLeft={0}
          marginRight={0}
          // disabled={!isCameraReady}
          onPress={() => {
            cancelPreview();
            navigation.goBack();
          }}
        />
        <PrimaryIconBtn
          icon={<MaterialIcons name="camera" size={24} color="#F6F6F6" />}
          marginTop={0}
          marginBottom={0}
          marginLeft={10}
          marginRight={10}
          // disabled={!isCameraReady}
          onPress={takePhoto}
          type="accent"
        />
        <PrimaryIconBtn
          icon={
            cameraType === CameraType.back ? (
              <MaterialIcons name="camera-rear" size={24} color="#FF6C00" />
            ) : (
              <MaterialIcons name="camera-front" size={24} color="#FF6C00" />
            )
          }
          marginTop={0}
          marginBottom={0}
          marginLeft={0}
          marginRight={0}
          // disabled={!isCameraReady}
          onPress={switchCamera}
        />
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
});
