import React, { useContext } from 'react'
import AddUser from './src/screens/AddUser.js'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppContext } from './src/services/AppContext.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackScreen from './src/navigators/HomeNavigator.js'
import ProfileStackScreen from './src/navigators/ProfileStackScreen.js'
import HomeSvg from './src/assets/place.svg'
import HomeActiveSvg from './src/assets/home.svg'
import ProfileSvg from './src/assets/user.svg'
import ProfileActiveSvg from './src/assets/user (1).svg'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const App = () => {
	const { user } = useContext(AppContext)
	return (
		<NavigationContainer>
			{user ? (
				<Tab.Navigator>
					<Tab.Screen
						name="Home"
						component={HomeStackScreen}
						options={{
							tabBarLabel: 'Home',
							tabBarIcon: ({ focused }) => (focused ? <HomeActiveSvg /> : <HomeSvg />)
						}}
					/>
					<Tab.Screen
						name="Profile"
						component={ProfileStackScreen}
						options={{
							tabBarLabel: 'Profile',
							tabBarIcon: ({ focused }) => (focused ? <ProfileActiveSvg /> : <ProfileSvg />)
						}}
					/>
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
