
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Navbar  from './src/components/Navbar.js'
import PostList from './src/components/PostList.js'
import PostDetails from './src/components/PostDetails.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostItem from './src/components/PostItem.js';

const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={PostItem} />
        <Stack.Screen name="Details" component={PostDetails} />
      </Stack.Navigator>
      <View style={styles.container}>
        <Navbar />
        <PostList />

      </View>
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {

    backgroundColor: '#37393b',
    alignItems: 'center',
    height: '100%'
 }
});


