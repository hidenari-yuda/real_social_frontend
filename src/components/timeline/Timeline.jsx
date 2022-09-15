import React, { useContext, useEffect, useState } from 'react'
import './Timeline.css'
import Share from '../share/Share'
import Post from '../post/Post'
import axios from 'axios'
import { AuthContext } from '../../state/AuthContext'

export default function Timeline({ username }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
    const response = 
    username 
    ? await axios.get(`/posts/profile/${username}`)
    : await axios.get(`/posts/timeline/${user._id}`);
    setPosts(response.data.sort((post1, post2) => {
      return new Date(post2.createdAt) - new Date(post1.createdAt);
    }))
    };
    fetchPosts();
  }, [user._id, username]);

  return (
    <div className='timeline'>
      <div className='timelineWrapper'>
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
          ))}
      </div>
    </div>
  )
}
