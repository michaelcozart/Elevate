import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

// import Nav from './src/Navigation/navigator';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add your name to the list below :) </Text>
      <Text style={styles.text}>- Austin Hill</Text>
      <Text style={styles.text}>- Tamara Eaton</Text>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
