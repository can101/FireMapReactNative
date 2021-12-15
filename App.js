import React, { useEffect, useState } from 'react'
import SystemNavigationBar from "react-native-system-navigation-bar";
import { StyleSheet, Image, ActivityIndicator, StatusBar, View } from 'react-native'
import MapView from "react-native-map-clustering";
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import axios from 'axios'


const App = () => {
  const [Data, setData] = useState({ data: [], loading: true });
  const getD = async () => {
    let List = await axios.get('https://eonet.gsfc.nasa.gov/api/v2.1/events');
    setData({ data: List.data.events, loading: false });
  }
  SystemNavigationBar.setNavigationColor("#fff", false);
  console.log(Data);
  useEffect(() => {
    getD();
  }, []);
  // const { data: { events } } = Data;
  console.log(Data);
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1,borderColor:"white" }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      {
        Data.loading == true ?
          (<ActivityIndicator size='large' animating={true} color={'red'} />) :
          (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              initialRegion={{
                latitude: 52.5,
                longitude: 19.2,
                latitudeDelta: 8.5,
                longitudeDelta: 8.5,
              }}
            >
              {Data.data.map((item) => {
                // Data.data.geometries.map((geo) => {
                // <Marker key={index} coordinate={{ latitude: item.coordinates[0], longitude: item.coordinates[1] }} />
                return (item.geometries.map((iem, index) => {
                  // console.log(iem.coordinates[0], iem.coordinates[1]);
                  return <Marker key={index} coordinate={{ latitude: iem.coordinates[1], longitude: iem.coordinates[0] }} >
                    <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                      {/* <Text></Text> */}
                      <Image
                        resizeMode='contain'
                        style={{ height: 50, with: 50 }}
                        source={require('./fire.png')}
                      />
                    </View>
                  </Marker>
                }))
                // })
              })}
            </MapView>
          )
      }
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});