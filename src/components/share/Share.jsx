import React, { useContext, useRef, useState } from 'react'
import { Image, Gif, Face, Analytics } from "@mui/icons-material";
import './Share.css'
import { AuthContext } from '../../state/AuthContext';
import axios from 'axios';

export default function Share() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      description: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      try {
        await axios.post('/upload', data);

      } catch (err) {
        console.log(err);
      }
    }

    try {
    await axios.post('/posts', newPost);
    window.location.reload();
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img 
            src={
              PUBLIC_FOLDER + 'person/noAvatar.jpeg'
            } 
            alt=''
            className='shareProfileImg' 
          />
          <input 
            type='text' 
            placeholder='いまどうしてる？' 
            className='shareInput'
            ref={desc}
          /> 
        </div>
        <hr className='shareHr' />
        <form className='shareButtons' onSubmit={(e) => handleSubmit(e)}>
          <div className='shareOptions' htmlFor='file'>
            <label className='shareOption'>
              <Image className='shareIcon' htmlColor='blue'/>
              <span className='shareOptionText'>写真</span>
              <input 
                type='file' 
                id='file' 
                accept='.png, .jpg, .jpeg' 
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className='shareOption'>
              <Gif className='shareIcon' htmlColor='hotpink'/>
              <span className='shareOptionText'>GIF</span>
            </div>
            <div className='shareOption'>
              <Face className='shareIcon' htmlColor='green'/>
              <span className='shareOptionText'>気持ち</span>
            </div>
            <div className='shareOption'>
              <Analytics className='shareIcon' htmlColor='red'/>
              <span className='shareOptionText'>投票</span>
            </div>
        </div>
        <button className='shareButton' type='submit'>投稿</button>
      </form>
    </div>
  </div>
  )
}
