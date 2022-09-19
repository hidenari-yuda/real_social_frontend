import React from 'react'
import { useNavigate } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar'

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    window.confirm('本当にログアウトしますか？');
    if (window.confirm) {
      try {
        await localStorage.removeItem('user');
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    } else {
      return
    }
  }
  
  return (
    <>
    <Topbar />
    <div className='logoutContainer'>
      <h1>ログアウトしますか？</h1>
      <div className='logoutButtons'>
        <button className='logoutButton'>いいえ</button>
        <button className='logoutButton' onClick={() => handleLogout()}>はい</button>
      </div>
    </div>
    </>
  )
}
