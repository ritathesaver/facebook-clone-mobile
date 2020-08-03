import React from 'react'
import { StyleSheet, View, Image, Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import PostItem from './PostItem.js'

export default (PostDetails = ({ navigation, route }) => {
	return (
		<KeyboardAvoidingView style={styles.containerPost} behavior="padding" keyboardVerticalOffset={100}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<PostItem navigation={navigation} item={route.params.item} />
			</ScrollView>
		</KeyboardAvoidingView>
	)
})

const styles = StyleSheet.create({
	containerPost: {
		backgroundColor: '#eeeeee',
		alignItems: 'center',
		width: '100%',
		paddingLeft: 10,
		paddingRight: 10
	}
})
