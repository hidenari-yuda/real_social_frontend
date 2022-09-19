import React, { useContext, useRef } from 'react'
import { Search, Chat, Notifications, ExitToApp } from "@mui/icons-material";
import './Topbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Topbar() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const freewordRef = useRef()

  const handleFreeword = (e) => {
    e.preventDefault();
    navigate('/search', { state: { freeword : freewordRef.current.value } })
  }
  
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to = '/' className='link' style={{ textDecoration: 'none', color: 'black' }}>
         <span className='logo'>Real Social</span>
        </Link>
      </div>
      <div className='topbarCenter'>
        <form className='searchbar' onSubmit={(e) => handleFreeword(e)}>
            <button type='submit' className='btn btn-primary' style={{border: 'none', background: 'transparent', outline: 'none'}}>
              <Search className='searchIcon' />
            </button>
          <input 
            type='text' 
            placeholder='探し物は何ですか？' 
            className='searchInput' 
            ref={freewordRef}
          />
        </form>
      </div>
      <div className='topbarRight'>
        <div className='topbarIconList'>
          <div className='topbarIcon'>
            <Link 
              to = '/chat' 
              className='link' 
              style={{ textDecoration: 'none', color: 'white' }}>
            <Chat />
            </Link>
            <span className='topbarIconBadge'>1</span>
          </div>  
          <div className='topbarIcon'>
            <Link to = '/notifications' className='link' style={{ textDecoration: 'none', color: 'white' }}>
            <Notifications />
            </Link>
            <span className='topbarIconBadge'>2</span>
          </div>  
          <div className='topbarIcon'>
            <Link to = '/logout' className='link' style={{ textDecoration: 'none', color: 'white' }}>
              <ExitToApp />
            </Link>
          </div>  
        <Link to={`/profile/${user.username}`}>
        <img src={ PUBLIC_FOLDER + 'person/noAvatar.jpeg'} alt='' className='topbarImg' />
        </Link>
        </div>
      </div>
    </div>
  )
}
