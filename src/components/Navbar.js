
import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';



export default function Navbar() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>your feed</Text>
    </View>


  );
}


const styles = StyleSheet.create({
  container: {
 
    height: 100,
    paddingTop: 60,
    marginBottom: 20

  },
  title: {
    color: '#ffffff',
    fontSize: 35,
    textTransform: 'uppercase'
  }
});


