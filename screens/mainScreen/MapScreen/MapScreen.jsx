import { useState } from 'react';
import { useEffect } from 'react';
import { Text, View, Image } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import MapView, { Marker } from 'react-native-maps';

const MyCustomMarkerView = image => {
  console.log(image);
  return (
    <View
      style={{
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <Image
        source={{ uri: image.image }}
        style={{ width: '100%', height: '100%' }}
      /> */}
    </View>
  );
};

const MapScreen = ({ route }) => {
  const { params } = route;
  const { latitude, longitude } = params.location;
  const location = { latitude, longitude };

  // { latitude: 37.4220936, longitude: -122.083922 }
  // {latitude: 50.2725883, longitude: 28.64059}

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <MapView
        style={{ width: '100%', height: '100%' }}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ ...location }} title={'Фото зроблене тут'} />
      </MapView>
    </View>
  );
};

export default MapScreen;
