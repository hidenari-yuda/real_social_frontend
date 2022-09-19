import React, { useContext } from 'react'
import './Chat.css'
import { AuthContext } from '../../state/AuthContext';
import Topbar from '../../components/topbar/Topbar';
import ChatGroupList from '../../components/chatGroupList/ChatGroupList';
import ChatGroup from '../../components/chatGroup/ChatGroup';

export default function Chat() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  return (
    <>
      <Topbar />
      <div className='chatContainer'>
        <ChatGroupList />
        <ChatGroup />
      </div>
    </>
  )
}
