import React from 'react'
import './Chat.css'
import Topbar from '../../components/topbar/Topbar';
import ChatGroupList from '../../components/chatGroupList/ChatGroupList';
import ChatGroup from '../../components/chatGroup/ChatGroup';

export default function Chat() {

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
