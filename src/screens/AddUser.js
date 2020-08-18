import React, { useState, useContext } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { postRequest } from '../api.service'
import { AppContext } from '../services/AppContext'
import AsyncStorage from '@react-native-community/async-storage'
import Input from '../components/Input.js'

export default (AddUser = ({ navigation }) => {
	const [ nameInput, setNameInput ] = useState('')
	const [ surnameInput, setSurnameInput ] = useState('')

	const { setUser } = useContext(AppContext)

	const onSubmit = async (e) => {
		const user = {
			name: nameInput,
			surname: surnameInput
		}

		const { data } = await postRequest('/api/users/', user, {
			headers: { 'Content-Type': 'application/json;charset=utf-8' }
		})
		if (data.error) {
			return
		}

		setNameInput('')
		setSurnameInput('')

		const jsonValue = JSON.stringify(data)
		await AsyncStorage.setItem('user', jsonValue)
		setUser(data)
	}

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<Input onChangeText={setNameInput} defaultValue={nameInput} placeholder="Name" label="Name:" />
				<Input
					onChangeText={setSurnameInput}
					defaultValue={surnameInput}
					placeholder="Surname"
					label="Surname:"
				/>

				<Button style={styles.button} color="white" title="Send" onPress={onSubmit} />
			</View>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 40,
		backgroundColor: '#37393b',
		justifyContent: 'center'
	},
	form: {
		paddingBottom: 100
	}
})
