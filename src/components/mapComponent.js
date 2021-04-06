
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';


export default class MapComponent extends Component {
    render() {
        return (
            <>
                <MapView
                    showsUserLocation
                    followsUserLocation
                    // provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation
                    initialRegion={{
                        latitude: 37.7896386,
                        longitude: -122.421646,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.035
                    }}
                >
                </MapView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        
    }

})



