
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import LikeSvg from '../assets/2.svg';
import CommentSvg from '../assets/comment.svg';
import CommentList from './CommentList.js'
import { postRequest } from '../api.service.js'


export default function PostItem({item,navigation}) {
  
  const [commentsCount, setCommentsCount] = useState(item.commentsCount)
  const [likesCount, setLikesCount] = useState(item.likesCount)

  const onLike = async (e) => {
    setLikesCount(likesCount + 1)
    await postRequest(`/api/likes/`, { postId: item._id, userId: item.user._id })
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details')}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{uri: item.user.avatarUrl}} style={styles.avatar}></Image>
        <Text style={styles.userName}>{item.user?.name} {item.user.surname}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.postText}>{item.text}</Text>
        <View style={styles.picContainer}><Image source={{ uri: item.imageUrl }} style={styles.postPic}></Image></View>
        <View style={styles.line}></View>

      </View>
      
      <View style={styles.footer}>

        <View style={styles.count}><TouchableOpacity onPress={onLike}><LikeSvg width={26} height={26} style={styles.icon} /></TouchableOpacity>
     <Text >{likesCount}</Text></View>
        <View style={styles.count}><TouchableOpacity><CommentSvg width={25} height={25} style={styles.icon} /></TouchableOpacity>
       <Text >{commentsCount}</Text></View>

      </View>
      <CommentList postId={item._id}
          user={item.user}>  addComment={() => setCommentsCount(commentsCount + 1)}
            </CommentList>
    </View>
</TouchableOpacity>
    

  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    borderBottomColor: '#37393b',
    borderBottomWidth: 1,
    padding: 15,
    width: 340
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap'
    
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
    marginTop: 10,

  },

  picContainer: {
    width: 360,
    marginTop: 10
  },



  postPic: {
    borderRadius: 5,
    resizeMode: 'contain',
    aspectRatio: 1.5, 
    marginHorizontal: 'auto',
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
    height: 25,

  },

  count: {
    alignItems: 'center'
  }


});


