import React from 'react'
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Timeline from '../../components/timeline/Timeline';
import Topbar from '../../components/topbar/Topbar';

export default function Settings() {
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
