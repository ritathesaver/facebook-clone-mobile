import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { AppContext } from '../services/AppContext'
import ImagePicker from 'react-native-image-picker'

import FastImage from 'react-native-fast-image'

const Profile = ({ navigation }) => {
	const { user, setUser } = useContext(AppContext)
	const [ photo, setPhoto ] = useState({ uri: user.avatarUrl })

	const onChange = async (e) => {
		const options = {
			noData: true
		}
		await ImagePicker.launchImageLibrary(options, (response) => {
			if (response.uri) {
				setPhoto(response)
			}
		})
	}
	return (
		<View style={styles.container}>
			<View style={styles.userInfo}>
				{photo.uri && <FastImage source={{ uri: photo.uri }} style={styles.avatar} />}
				<Text style={styles.userName}>
					{' '}
					Hello, {user.name} {user.surname}
				</Text>
				<Button color="white" title="Edit" onPress={() => navigation.navigate('ProfileEdit')} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#37393b',
		alignItems: 'center',
		height: '100%'
	},
	header: {
		marginTop: 60,
		fontSize: 30,
		color: 'white',
		textTransform: 'uppercase'
	},
	avatar: {
		height: 300,
		width: 300
	},
	userInfo: {
		marginTop: 30,
		alignItems: 'center'
	},
	userName: {
		marginTop: 20,
		fontSize: 25,
		color: 'white'
	}
})

export default Profile
