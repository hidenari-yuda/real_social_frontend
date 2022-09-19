import React from 'react'
import { useLocation } from "react-router-dom"
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Timeline from '../../components/timeline/Timeline';
import Topbar from '../../components/topbar/Topbar'

export default function Search() {
  const location = useLocation();
  const search = location.state

  return (
    <>
      <Topbar />
      <div className='homeContainer'>
        <Sidebar />
        <Timeline freeword={search.freeword} />
        <Rightbar />
      </div>
    </>
  )
}
