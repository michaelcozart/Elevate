import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View } from 'react-native';
const PlaceInput = () => {
  return (
          <GooglePlacesAutocomplete
     style={styles.input}
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4',
        language: 'en',
      }}
    />
  );
};
export default PlaceInput;
const styles = StyleSheet.create({
   input: {
     marginTop: 50,
   }
})
