import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

import DeleteButton from '../assets/delete.svg'
import { deleteRequest } from '../api.service.js'

export default (CommentItem = ({ item }) => {
	const [ isDeleted, setIsDeleted ] = useState(false)

	const onPress = async (e) => {
		await deleteRequest(`/api/comments/${item._id}`)
		setIsDeleted(true)
	}
	if (isDeleted) {
		return <Text style={styles.commentDeleted}>Comment deleted.</Text>
	}

	return (
		<View style={styles.containerComment}>
			<View style={styles.header}>
				<View style={styles.headerBody}>
					<FastImage style={styles.avatar} source={{ uri: item.user.avatarUrl }} />
					<Text styles={styles.userName}>
						{item.user.name} {item.user.surname}
					</Text>
				</View>
				<TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
					<DeleteButton style={styles.buttonDelete} />
				</TouchableOpacity>
			</View>
			<Text style={styles.commentText}>{item.text}</Text>
		</View>
	)
})

const styles = StyleSheet.create({
	containerComment: {
		marginVertical: 10,

		borderBottomWidth: 1,
		borderBottomColor: '#ccc'
	},

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 8
	},

	headerBody: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	avatar: {
		width: 32,
		height: 32,
		borderRadius: 20,
		marginRight: 10
	},

	userName: {
		fontSize: 15
	},

	buttonDelete: {
		width: 20,
		height: 20
	},
	commentDeleted: {
		textAlign: 'center',
		textTransform: 'uppercase',
		textDecorationLine: 'underline',
		marginBottom: 10
	}
})
