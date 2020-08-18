import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import { AppContext } from '../services/AppContext'
import ImagePicker from 'react-native-image-picker'
import { putRequest } from '../api.service'
import AsyncStorage from '@react-native-community/async-storage'
import FastImage from 'react-native-fast-image'

const ProfileEdit = () => {
	const { user, setUser } = useContext(AppContext)
	const [ name, setNameInput ] = useState(user ? user.name : '')
	const [ surname, setSurnameInput ] = useState(user ? user.surname : '')
	const [ photo, setPhoto ] = useState({ uri: user.avatarUrl })

	const onSubmit = async (e) => {
		const data = new FormData()

		if (photo.uri) {
			data.append('photo', {
				name: 'avatar',
				type: photo.type,
				uri: photo.uri.replace('file://', '')
			})
		}

		data.append('name', name)
		data.append('surname', surname)

		const { data: { avatarUrl } } = await putRequest(`/api/users/${user._id}`, data, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})

		const newUser = { ...user, avatarUrl }
		const jsonValue = JSON.stringify(newUser)
		await AsyncStorage.setItem('user', jsonValue)
		setUser(newUser)
	}

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
				<View style={styles.userAvatar}>
					{photo.uri && <FastImage source={{ uri: photo.uri }} style={styles.avatar} />}
					<TouchableOpacity onPress={onChange}>
						<View style={styles.avatarBlock}>
							<Text style={styles.avatarChange}>Change avatar</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<Text style={styles.userName}>
				{user.name} {user.surname}
			</Text>

			<View style={styles.userEdit}>
				<Text style={styles.userEditName}>Name:</Text>
				<TextInput
					onChangeText={setNameInput}
					value={name}
					placeholder="Your name..."
					style={styles.inputStyle}
				/>
				<Text style={styles.userEditName}>Surname:</Text>
				<TextInput
					onChangeText={setSurnameInput}
					value={surname}
					placeholder="Your surname..."
					style={styles.inputStyle}
				/>
			</View>
			<Button style={styles.button} color="white" title="Confirm" onPress={onSubmit} />
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
	userAvatar: {
		position: 'relative'
	},
	avatar: {
		height: 230,
		width: 230,
		borderRadius: 10
	},
	avatarBlock: {
		width: '100%',
		height: 40,
		backgroundColor: 'rgba(0,0,0,0.5)',
		position: 'absolute',
		bottom: 0,
		borderRadius: 10
	},
	avatarChange: {
		marginVertical: 10,
		fontSize: 13,
		color: 'white',
		textAlign: 'center'
	},
	userInfo: {
		marginTop: 30
	},
	userEdit: {
		width: '100%',
		justifyContent: 'center',
		paddingHorizontal: 50
	},
	userName: {
		marginTop: 20,
		fontSize: 25,
		color: 'white',
		marginTop: 10
	},
	userEditName: {
		fontSize: 15,
		color: 'white'
	},
	inputStyle: {
		marginVertical: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#ccc',
		color: '#000',
		backgroundColor: '#fff',
		padding: 10
	},
	label: {
		color: 'white'
	},
	button: {
		marginTop: 150
	}
})

export default ProfileEdit
