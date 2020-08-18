import React from 'react'
import { StyleSheet, View, FlatList, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import CommentItem from './CommentItem'
import { useState, useEffect } from 'react'
import { getRequest, postRequest } from '../api.service'

export default (CommentList = ({ postId, user, addComment }) => {
	const [ commentList, setCommentList ] = useState([])

	const [ input, setInput ] = useState('')

	const onSubmit = async (e) => {
		await postRequest('/api/comments/', {
			text: input,
			postId,
			userId: user._id
		})
		setInput('')
		const { data } = await getRequest(`/api/comments/${postId}`)

		setCommentList(data)
	}

	useEffect(() => {
		;(async () => {
			const { data } = await getRequest(`/api/comments/${postId}`)

			setCommentList(data)
		})()
	}, [])

	return (
		<View>
			<View style={styles.commentList}>
				{commentList.map((item) => <CommentItem key={item._id} item={item} />)}
			</View>
			<TextInput
				style={styles.inputForm}
				onChangeText={(text) => setInput(text)}
				defaultValue={input}
				placeholder="Type your comment..."
			/>

			<Button style={styles.button} color="black" title="Send" onPress={onSubmit} />
		</View>
	)
})

const styles = StyleSheet.create({
	containerPost: {
		flexDirection: 'column',
		padding: 10
	},
	commentList: {
		marginBottom: 15
	},
	inputForm: {
		height: 20,
		borderBottomColor: 'gray',
		borderBottomWidth: 1,
		marginBottom: 4
	}
})
