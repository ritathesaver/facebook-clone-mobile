
import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button
} from 'react-native';
import CommentItem from './CommentItem'
import { useState, useEffect } from 'react'
import { getRequest, postRequest } from '../api.service'


export default function CommentList({ postId, user, addComment }) {

  const [commentList, setCommentList] = useState([]);

  const [input, setInput] = useState('')

  const onSubmit = async (e) => {

    //addComment()
    await postRequest(`/api/comments/`, { text: input, postId, userId: user._id })
    setInput('')
    const { data } = await getRequest(`/api/comments/${postId}`)
    console.log(data)

    setCommentList(data);
  }


  useEffect(() => {
    (async () => {
      const { data } = await getRequest(`/api/comments/${postId}`)
     // console.log(data)
      console.log(postId)

      setCommentList(data);
    })();
  }, []);


  return (
    <View>
    <FlatList style={styles.commentList}
      data={commentList}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <CommentItem item={item} />}
    />
      <TextInput style={styles.inputForm}
        onChangeText={text => setInput(text)}
        defaultValue={input}
        placeholder="Type your comment..."
      />

      <Button style={styles.button} color="black"  title="Send" onPress={onSubmit}></Button>
      
    </View>

  );
}


const styles = StyleSheet.create({
  containerPost: {

    flexDirection: 'column',
    padding: 10,
  },
  commentList: {
    marginBottom: 15
  },
  inputForm: {
    height: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom:4
  }
});


