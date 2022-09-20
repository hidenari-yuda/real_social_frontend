import React from 'react'
import './Calendar.css'
import CalendarBoard from '../../components/calendarBoard/CalendarBoard'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'

export default function Calendar() {
  return (
    <>
    <Topbar />
    <div className="calendarContainer">
      <Sidebar />
      <CalendarBoard/>
    </div>
    </>
  )
}
