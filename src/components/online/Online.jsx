import React from 'react'

export default function Online({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className='rightbarFriend'>
    <div className='rightbarProfileContainer'>
      <img src={PUBLIC_FOLDER + 'person/noAvatar.jpeg'} alt='' className='rightbarProfileImg' />
      <span className='rightbarOnline'></span>
    </div>
    <span className='rightbarUsername'>{user.username}</span>
  </li>
  )
}
