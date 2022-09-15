import React, { useContext } from 'react'
import './Sidebar.css'
import { Home, Search, Notifications, MessageRounded, Bookmark, Person, Settings } from "@mui/icons-material";
import { Users } from "../../dummyData"
import CloseFriend from '../closeFriend/CloseFriend';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <Home className='sidebarIcon' />
            <Link to = {'/'} className='link' style={{ textDecoration: 'none', color: 'black' }}>
              <span className='sidebarListItemText'>ホーム</span>
            </Link>
          </li>
          <li className='sidebarListItem'>
            <Search className='sidebarIcon' />
            <span className='sidebarListItemText'>検索</span>
          </li>
          <li className='sidebarListItem'>
            <Notifications className='sidebarIcon' />
            <span className='sidebarListItemText'>通知</span>
          </li>
          <li className='sidebarListItem'>
            <MessageRounded className='sidebarIcon' />
            <span className='sidebarListItemText'>メッセージ</span>
          </li>
          <li className='sidebarListItem'>
            <Bookmark className='sidebarIcon' />
            <span className='sidebarListItemText'>ブックマーク</span>
          </li>
          <li className='sidebarListItem'>
            <Person className='sidebarIcon' />
            <Link to = {`/profile/${user.username}`} className='link' style={{ textDecoration: 'none', color: 'black' }}>
              <span className='sidebarListItemText'>プロフィール</span>
            </Link>
          </li>
          <li className='sidebarListItem'>
            <Settings className='sidebarIcon' />
            <span className='sidebarListItemText'>設定</span>
          </li>
        </ul>
        <hr className='sidebarHr' />
        <ul className='sidebarFriendList'>
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  )
}
