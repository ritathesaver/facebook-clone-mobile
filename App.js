import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import AddUser from './src/components/AddUser.js'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppContext } from './src/services/AppContext.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackScreen from './src/components/HomeNavigator.js'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const App = () => {
	const { user } = useContext(AppContext)
	console.log(1111, user)
	return (
		<NavigationContainer>
			{user ? (
				<Tab.Navigator>
					<Tab.Screen name="Home" component={HomeStackScreen} />
					<Tab.Screen name="Profile" component={HomeStackScreen} />
				</Tab.Navigator>
			) : (
				<Stack.Navigator>
					<Stack.Screen name="AddUser" component={AddUser} />
				</Stack.Navigator>
			)}
		</NavigationContainer>
	)
}

export default App
