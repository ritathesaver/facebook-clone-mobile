import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AddPost from '../screens/AddPost.js'
import PostList from '../screens/PostList.js'
import PostDetails from '../screens/PostDetails.js'
import AddSvg from '../assets/add.svg'

const screenStyle = {
	title: 'your feed',
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

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#37393b',
		alignItems: 'center',
		width: '100%'
	},
	addButton: {
		width: 23,
		height: 23,
		marginRight: 10
	}
})

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				options={({ navigation }) => ({
					...screenStyle,
					headerRight: () => (
						<TouchableOpacity onPress={() => navigation.navigate('AddPost')}>
							<AddSvg style={styles.addButton} />
						</TouchableOpacity>
					)
				})}
				name="Home"
				component={PostList}
			/>
			<HomeStack.Screen name="AddPost" component={AddPost} />
			<HomeStack.Screen options={screenStyle} name="Details" component={PostDetails} />
		</HomeStack.Navigator>
	)
}

export default HomeStackScreen
