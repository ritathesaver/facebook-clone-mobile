import React, { useState, useContext } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'
import { postRequest, putRequest } from '../api.service'
import Input from '../components/Input.js'
import { AppContext } from '../services/AppContext'
import ImagePicker from 'react-native-image-picker'
import FastImage from 'react-native-fast-image'

export default (AddPost = ({ navigation, route }) => {
	const { item } = route.params || {}
	const [ textInput, setTextInput ] = useState(item ? item.text : '')
	const [ photo, setPhoto ] = useState({})

	const { user } = useContext(AppContext)

	let ifChanged = false

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
		ifChanged = true
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
			{item.imageUrl ? (
				<View style={styles.picContainer}>
					{(item.imageUrl && <FastImage source={{ uri: item.imageUrl }} style={styles.postPic} />) ||
						(photo.uri && <FastImage source={{ uri: photo.uri }} style={styles.postPic} />)}
				</View>
			) : (
				<Text>lol</Text>
			)}

			<Button style={styles.button} color="black" title="Choose image" onPress={handleChoosePhoto} />

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
