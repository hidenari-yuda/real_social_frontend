import React from 'react'

export default function CloseFriend({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className='sidebarFriend'>
    <img 
      src={PUBLIC_FOLDER + 'person/noAvatar.jpeg'}
      alt='' 
      className='sidebarFriendImg' 
    />
    <span className='sidebarFriendName'>{user.username}</span>
  </li>
  )
}
