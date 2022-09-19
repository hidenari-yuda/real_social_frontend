import React, { useContext } from 'react'
import { Search, Chat, Notifications } from "@mui/icons-material";
import './Topbar.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Topbar() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to = '/' className='link' style={{ textDecoration: 'none', color: 'black' }}>
         <span className='logo'>Real Social</span>
        </Link>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <Search className='searchIcon' />
          <input 
            type='text' 
            placeholder='探し物は何ですか？' 
            className='searchInput' 
          />
        </div>
      </div>
      <div className='topbarRight'>
        <div className='topbarIconList'>
          <div className='topbarIcon'>
            <Link to = '/chat' className='link' style={{ textDecoration: 'none', color: 'white' }}>
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
        <Link to={`/profile/${user.username}`}>
        <img src={ PUBLIC_FOLDER + 'person/noAvatar.jpeg'} alt='' className='topbarImg' />
        </Link>
        </div>
      </div>
    </div>
  )
}
