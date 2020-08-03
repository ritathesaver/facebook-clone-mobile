import React, { useState, useContext } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'
import { postRequest, putRequest } from '../api.service'
import Input from './Input.js'
import { AppContext } from '../services/AppContext'
import ImagePicker from 'react-native-image-picker'

export default (AddPost = ({ navigation, route }) => {
	const { item } = route.params || {}
	const [ textInput, setTextInput ] = useState(item ? item.text : '')
	const [ photo, setPhoto ] = useState({})

	const { user } = useContext(AppContext)

	const onSubmit = async (e) => {
		const data = new FormData()

		if (photo.uri) {
			data.append('photo', {
				name: 'avatar',
				type: photo.type,
				uri: photo.uri.replace('file://', '')
			})
		}
		data.append('text', textInput)
		data.append('userId', user._id)

		if (item) {
			await putRequest(`/api/posts/${item._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
		} else {
			await postRequest('/api/posts/', data, { headers: { 'Content-Type': 'multipart/form-data' } })
		}
		setTextInput('')

		// navigation.reset({
		// 	index: 0,
		// 	routes: [ { name: 'Home' } ]
		// })

		navigation.goBack()
	}

	const handleChoosePhoto = () => {
		const options = {
			noData: true
		}
		ImagePicker.launchImageLibrary(options, (response) => {
			if (response.uri) {
				setPhoto(response)
			}
		})
	}

	return (
		<View style={styles.container}>
			<Input
				inputStyle={styles.postInput}
				onChangeText={setTextInput}
				defaultValue={textInput}
				placeholder="Your post..."
				multiline
			/>
			<View style={styles.picContainer}>
				{photo.uri && <Image source={{ uri: photo.uri }} style={styles.postPic} />}
				<Button style={styles.button} color="black" title="Choose image" onPress={handleChoosePhoto} />
			</View>

			<Button style={styles.button} color="black" title="Send" onPress={onSubmit} />
		</View>
	)
})

const styles = StyleSheet.create({
	postInput: {
		minHeight: 100
	},

	picContainer: {
		width: '100%',
		marginTop: 10,
		alignItems: 'center'
	},

	postPic: {
		borderRadius: 5,
		resizeMode: 'contain',
		aspectRatio: 1,
		minHeight: 200,
		minWidth: 200
	}
})
