import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native'
import PostItem from './PostItem'
import { getRequest } from '../api.service'
import { useFocusEffect } from '@react-navigation/native'

const PostList = ({ navigation }) => {
	const [ postList, setPostList ] = useState([])

	useFocusEffect(() => {
		;(async () => {
			const { data } = await getRequest('/api/posts')

			setPostList(data)
		})()
	}, [])

	if (postList.length === 0) {
		return null
	}

	return (
		<KeyboardAvoidingView style={styles.containerPost} behavior="padding" keyboardVerticalOffset={100}>
			<FlatList
				data={postList}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => <PostItem withMargin navigation={navigation} item={item} />}
			/>
		</KeyboardAvoidingView>
	)
}

export default PostList

const styles = StyleSheet.create({
	containerPost: {
		backgroundColor: '#37393b',
		alignItems: 'center',
		width: '100%',
		flexDirection: 'column',
		flex: 1
	}
})
