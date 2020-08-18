import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../screens/Profile'
import ProfileEdit from '../screens/ProfileEdit'

const screenStyle = {
	title: 'your profile',
	headerStyle: {
		backgroundColor: '#37393b',
		height: 100
	},
	headerTintColor: '#ffffff',
	headerTitleStyle: {
		textTransform: 'uppercase',
		fontSize: 28
	}
}

const ProfileStack = createStackNavigator()

const ProfileStackScreen = () => {
	return (
		<ProfileStack.Navigator>
			<ProfileStack.Screen options={screenStyle} name="Profile" component={Profile} />
			<ProfileStack.Screen options={screenStyle} name="ProfileEdit" component={ProfileEdit} />
		</ProfileStack.Navigator>
	)
}

export default ProfileStackScreen
