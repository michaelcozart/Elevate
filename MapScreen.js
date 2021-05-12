import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import MapView, { MAP_TYPES, PROVIDER_DEFAULT, Button, Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

// import { Button } from 'react-native-material-design';


export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onMarkerCalloutPress = this.onMarkerCalloutPress.bind(this);
        this.onUserLocationMarkerCalloutPress = this.onUserLocationMarkerCalloutPress.bind(this);
        this.getElevationDifference = this.getElevationDifference.bind(this);
        this.state = {
            markerLat: 0,
            markerLon: 0,
            userLatitude: 0,
            userLongitude: 0,
            userElevation: 0,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
            eleCoordinates: 0,
            markerElevation: 0,
            marker: null,
            elevationDifference: 0,

        }
    }

    onUserLocationMarkerCalloutPress = async () => {
        let userElevateCoordinates = this.state.userLatitude + "," + this.state.userLongitude;
        let userElevationCoordinates = userElevateCoordinates.toString();
        return await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${userElevationCoordinates}&key=AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.results[0].elevation),
                    this.setState({ userElevation: responseJson.results[0].elevation });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    onMarkerCalloutPress = async () => {
        let elevateCoordinates = this.state.markerLat + "," + this.state.markerLon;
        let elevationCoordinates = elevateCoordinates.toString();
        return await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${elevationCoordinates}&key=AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.results[0].elevation),

                    this.setState({ markerElevation: responseJson.results[0].elevation });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            pos => {
                console.log(pos),
                    this.setState({
                        userLatitude: pos.coords.latitude,
                        userLongitude: pos.coords.longitude,
                    });
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, fastestInterval: 5000, showsBackgroundLocationIndicator: true, showLocationDialog: true }
        );
    }
    getElevationDifference = () => {
        if (this.state.userElevation != 0 && this.state.markerElevation != 0) {
            const difference = this.state.userElevation - this.state.markerElevation;
            this.setState({
                elevationDifference: difference
            });

        } else {
            this.setState({
                elevationDifference: 0,
            });

        }
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.blueTitle}>ELEVATE</Text>
                <MapView style={styles.map}
                    showsUserLocation={true}
                    userLocationCalloutEnabled={true}
                    // userInterfaceStyle={'light'}
                    showsCompass={true}
                    zoomEnabled={true}
                    // pitchEnabled={true}
                    mapType="terrain"
                    region={{
                        latitude: this.state.userLatitude,
                        longitude: this.state.userLongitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                    }}
                    onPress={(e) =>
                        this.setState({
                            markerLat: e.nativeEvent.coordinate.latitude,
                            markerLon: e.nativeEvent.coordinate.longitude,
                            marker: e.nativeEvent.coordinate
                        })}>

                    <Marker key={1} coordinate={{ latitude: this.state.userLatitude, longitude: this.state.userLongitude }} >
                        <Callout onPress={this.onUserLocationMarkerCalloutPress}>
                            <Text>Lat: {this.state.userLatitude}</Text>
                            <Text>lon: {this.state.userLongitude}</Text>
                            <Text>Elevation:{this.state.userElevation}</Text>

                        </Callout>
                    </Marker>
                    {
                        this.state.marker &&
                        <Marker coordinate={this.state.marker} pinColor={'gold'}
                            onPress={this.onMarkerCalloutPress}>

                            <Callout key={2} onPress={this.getElevationDifference}>

                                <Text>Lat:{this.state.markerLat}</Text>
                                <Text>lon:{this.state.markerLon}</Text>
                                <Text>Elevation:{this.state.markerElevation}</Text>
                                <Text>{this.state.elevationDifference}</Text>
                            </Callout>
                            {/* <MapView.Callout tooltip><Text>The Elevation Difference is:{this.state.markerElevation}</Text></MapView.Callout> */}
                        </Marker>
                    }


                </MapView>
                <View>
                    {/* <Button
                        onPress={this.getElevationDifference}
                        title="Learn More"
                        color="#841584"
                       
                    /> */}
                    {/* <Button value="NORMAL RAISED" raised={true} onPress={() => console.log("I pressed a raised button")} /> */}
                </View>
            </View>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        height: 1000,
        width: 1000,
        // ...StyleSheet.absoluteFillObject,
        // flex: 1,
        // justifyContent: "flex-end",
        // alignItems: "center"
    },
    map: {
        height: 600,
        width: 600,
    },

    blueTitle: {
        color: 'aqua',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 120,
        height: 35,
    },
    red: {
        color: 'red',
    },
});
