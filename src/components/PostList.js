
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import PostItem from './PostItem'
import { useState, useEffect } from 'react'
import {getRequest} from '../api.service'


export default function PostList() {

 const [postList, setPostList] = useState([]);

  useEffect(() => {
      (async () => {
        const { data } = await getRequest('/api/posts')

        setPostList(data);
      })();
    }, []);

  return (
    <FlatList
      data={postList}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <PostItem navigation={navigation} item={item} />}
    />
  
  );
}


const styles = StyleSheet.create({
  containerPost: {

    flexDirection: 'column',
    padding: 15, 
  }
});


