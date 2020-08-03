import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export default (Input = () => {
	return (
		<View style={[ styles.container, style ]}>
			{label && <Text style={[ styles.label ]}>{label}</Text>}
			<TextInput style={[ styles.inputForm, inputStyle ]} {...props} />
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		padding: 5,
		marginTop: 5
	},
	inputForm: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#ccc',
		color: '#000',
		backgroundColor: '#fff',
		padding: 10
	},
	label: {
		color: '#fff'
	}
})
