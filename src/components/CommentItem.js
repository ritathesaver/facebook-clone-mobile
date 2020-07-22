
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import DeleteButton from '../assets/delete.svg'
import {deleteRequest} from '../api.service.js'


export default function CommentItem({ item }) {
  const [isDeleted, setIsDeleted] = useState(false)


  const onPress = async (e) => {

    await deleteRequest(`/api/comments/${item._id}`)
    setIsDeleted(true)
  }
  if (isDeleted) {
    return (<Text>Comment deleted</Text>)
  }

  return (
    <View style={styles.containerComment}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.user.avatarUrl }}></Image>
        <Text styles={styles.userName}>{item.user.name} {item.user.surname}</Text>

      </View>
      <Text style={styles.commentText}>{item.text}</Text>
      <TouchableOpacity onPress={onPress} ><DeleteButton style={styles.buttonDelete}></DeleteButton></TouchableOpacity>

    </View>

  );
}


const styles = StyleSheet.create({
  containerComment: {
    marginVertical: 10,

    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 105,
    marginBottom: 8

  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20
  },

  userName: {
    marginLeft: 16,
    fontSize: 15
  },

  buttonDelete: {
    position: 'absolute',
    right: 10,
    bottom: 35
  }
});


