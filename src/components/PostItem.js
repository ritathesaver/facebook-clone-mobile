import React, { useState, useRef, useContext } from 'react'
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import FastImage from 'react-native-fast-image'

import LikeSvg from '../assets/2.svg'
import CommentSvg from '../assets/comment.svg'
import CommentList from './CommentList.js'
import { postRequest, deleteRequest } from '../api.service.js'
import { AppContext } from '../services/AppContext'
import { useFocusEffect } from '@react-navigation/native'

const PostItem = ({ item, navigation, withMargin = false }) => {
	const [ commentsCount, setCommentsCount ] = useState(item.commentsCount)
	const [ likesCount, setLikesCount ] = useState(item.likesCount)
	const [ isDeleted, setIsDeleted ] = useState(false)
	const menuRef = useRef(null)

	const { user } = useContext(AppContext)

	const showMenu = () => {
		menuRef.current.show()
	}

	useFocusEffect(() => {
		return () => {
			if (!menuRef.current) {
				return
			}
			menuRef.current.hide()
		}
	})

	const onLike = async (e) => {
		setLikesCount(likesCount + 1)
		await postRequest(`/api/likes/`, { postId: item._id, userId: item.user._id })
	}

	const deletePost = async (e) => {
		await deleteRequest(`/api/posts/${item._id}`)
		setIsDeleted(true)
	}
	if (isDeleted) {
		return <Text>Post deleted.</Text>
	}

	return (
		<View style={[ styles.container, withMargin ? styles.containerMargin : {} ]}>
			<View style={styles.header}>
				<View style={styles.userInf}>
					<FastImage source={{ uri: item.user.avatarUrl }} style={styles.avatar} />
					<Text style={styles.userName}>
						{item.user.name} {item.user.surname}
					</Text>
				</View>
				<View style={styles.menuButton}>
					{user._id === item.user._id && (
						<Menu
							ref={menuRef}
							button={
								<TouchableOpacity onPress={showMenu}>
									<FastImage
										source={{
											uri:
												'https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/more-512.png'
										}}
										style={{ width: 25, height: 25 }}
									/>
								</TouchableOpacity>
							}
						>
							<MenuItem onPress={() => navigation.navigate('AddPost', { item })}>Edit</MenuItem>
							<MenuDivider />
							<MenuItem onPress={deletePost}>Delete</MenuItem>
						</Menu>
					)}
				</View>
			</View>

			<TouchableWithoutFeedback onPress={() => navigation.navigate('Details', { item })}>
				<View style={styles.body}>
					<Text style={styles.postText}>{item.text}</Text>
					{item.imageUrl && (
						<View style={styles.picContainer}>
							<Image source={{ uri: item.imageUrl }} style={styles.postPic} />
						</View>
					)}
					<View style={styles.line} />
				</View>
			</TouchableWithoutFeedback>

			<View style={styles.footer}>
				<View style={styles.count}>
					<TouchableOpacity onPress={onLike}>
						<LikeSvg width={26} height={26} style={styles.icon} />
					</TouchableOpacity>
					<Text>{likesCount}</Text>
				</View>
				<View style={styles.count}>
					<TouchableOpacity>
						<CommentSvg width={25} height={25} style={styles.icon} />
					</TouchableOpacity>
					<Text>{commentsCount}</Text>
				</View>
			</View>
			<CommentList postId={item._id} user={item.user} addComment={() => setCommentsCount(commentsCount + 1)} />
		</View>
	)
}

export default PostItem

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#eeeeee',
		borderBottomColor: '#37393b',
		borderBottomWidth: 1,
		padding: 15
	},

	containerMargin: {
		marginHorizontal: 40
	},

	header: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between'
	},

	userInf: {
		flexDirection: 'row',
		flexWrap: 'nowrap'
	},

	menuButton: {
		alignItems: 'center',
		marginVertical: 5
	},

	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginBottom: 10
	},

	userName: {
		marginLeft: 10,
		marginVertical: 8,
		fontSize: 17
	},

	body: {
		flex: 1,
		alignItems: 'center',
		marginTop: 10
	},

	picContainer: {
		width: '100%',
		marginTop: 10
	},

	postPic: {
		borderRadius: 5,
		resizeMode: 'contain',
		aspectRatio: 1.5,
		marginHorizontal: 'auto'
	},

	postText: {
		fontSize: 15,
		lineHeight: 18
	},

	line: {
		borderBottomWidth: 0.4,
		borderBottomColor: 'black',
		marginHorizontal: 50,
		marginTop: 20,
		width: 90
	},

	footer: {
		marginTop: 10,
		height: 50,
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-evenly'
	},

	icon: {
		width: 25,
		height: 25
	},

	count: {
		alignItems: 'center'
	}
})
