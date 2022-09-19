import React, { useContext } from 'react'
import { AuthContext } from '../../state/AuthContext';

export default function Notifications() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  return (
    <>
    <Topbar />
    <div className='homeContainer'>
    <Sidebar />
    <Timeline />
    <Rightbar />
    </div>
    </>
  )
}
