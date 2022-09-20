import React, { useContext, useEffect, useRef, useState } from 'react'
import './Post.css'
import { MoreVert } from "@mui/icons-material";
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Post({ post }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  const { currentUser } = useContext(AuthContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?userId=${post.userId}`);
      setUser(response.data);
      }
      
    fetchUser();
  }, [post.userId]);
  
  const [ isClickOnDocument, setIsClickOnDocument ] = useState( false )
  const [deleteOption, setDeleteOption] = useState( true )

  const handleClickToggle = (e) => {
    setIsClickOnDocument(prevState =>  !prevState )
    e.stopPropagation()
  }

  const refEle = useRef()

  const handleClickDocument = useRef()

  useEffect( () => {
    handleClickDocument.current = ( e ) => {
      if (!refEle.current.contains(e.target)) {
        setIsClickOnDocument( false )
        document.removeEventListener( 'click', handleClickDocument.current )
      }
    }
  }, [] )
  
  useEffect( () => {
    isClickOnDocument && document.addEventListener( 'click', handleClickDocument.current )
  }, [ isClickOnDocument ] )

  useEffect( () => {
    if ("631e09cd7f8346e49947acd0" !== post.userId) {
      setDeleteOption( false )
    }
  }, [])

  const handleMoreVert = async () => {
    window.confirm('削除しますか？');
    if (window.confirm) {
    try {
    await axios.delete('/posts/' + post._id, { userId: currentUser._id });
    window.location.reload();
    } catch (err) {
      console.log(err);
    }
    } else {
      return
    }
  }

  
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      await axios.put('/posts/' + post._id + '/like', { userId: currentUser._id });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }

    setLike(prevState => isLiked ? prevState - 1 : prevState + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profile/${user.username}`}>
            <img 
              src={
                PUBLIC_FOLDER + 'person/noAvatar.jpeg'
              } 
              alt=''
              className='postProfileImg' 
            />
            </Link>
            <span className='postUsername'>{user.username}</span>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>
        <div className='postTopRight'>
          <button type='button' className='button' onClick={(e) => handleClickToggle(e)} style={{border: 'none', background: 'transparent', outline: 'none'}}>
          <MoreVert />
          </button>
          <div className="modal" style={{display: isClickOnDocument ? '' : 'none' }}>
            <ul className="modal_inner" ref={ refEle } style={{ listStyle: 'none'}}>
              <li className="modal_item" style={{ display: deleteOption ? '' : 'none' }}>
                <Link to={`/profile/${user.username}`} className='link' style={{ textDecoration: 'none', color: 'black' }}>
                  投稿したユーザーを見る
                </Link>
              </li>
              <li className='delete' style={{display: deleteOption ? '' : 'none' }}>
                <button className='button' onClick={() => handleMoreVert()} style={{border: 'none', background: 'transparent', outline: 'none'}}>
                  投稿を削除
                </button>
              </li>
            </ul>
          </div>
        </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post.description}</span>
          <img src={PUBLIC_FOLDER + post.img} alt='' className='postImg' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img 
              src={PUBLIC_FOLDER + 'heart.png'}
              alt='like' 
              className='likeIcon' 
              onClick={() => handleLike()}
            />
            <span className='postLikeCounter'>{like}人がいいねしました</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{post.comment}コメント</span>
          </div>
        </div>
      </div>
    </div>
  )
}
