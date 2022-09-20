import React, { useCallback, useContext, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; 
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import { AuthContext } from '../../state/AuthContext';
import { Box, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button'

export default function CalendarBoard() {
  const { user } = useContext(AuthContext);

  //ログインユーザーのタスクの取得
  const [taskList, setTaskList] =useState([])

  useEffect(() => {
  const fetchTask = async () => {
    try {
    const response = await axios.get(`/tasks/${user._id}`)
    setTaskList(response.data)
    } catch (err) {
      console.log(err);
    }
  }
  fetchTask()
  }, [])

  //Googleカレンダーからタスクの取得(できれば実装したい)
  const [googleTaskList, setGoogleTaskList] = useState([])
  const [switchGoogleTask, setSwitchGoogleTask] = useState(false)

  const googleApiKey = process.env.GOOGLE_CALENDAR_API_KEY

    const handleGoogleTask = async () => {
      setSwitchGoogleTask(prevState => !prevState)
      const calendarId = 'yhide327@gmail.com'
      try {
      const response = await axios.get(`/https://www.googleapis.com/auth/calendar/${calendarId}`)
      setGoogleTaskList(response.data)
      console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    }

    //休日の表示非表示
  const [hideHoliday, setHideHoliday] = useState(false)

  const handleHoliday = () => {
    setHideHoliday(prevState => !prevState)
  }

  
  // モーダルの表示非表示
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  //モーダルデザイン
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  //クリックした日付を取得して、モーダルを表示
  const [newTask, setNewTask] = useState({})
  const handleDateClick = useCallback( async (arg) => {
    setOpen(prevState => !prevState)

    //取得した日付の終了時間（仮）を設定
    arg.dateStr.setHours(arg.dateSrt.getHours() + 1);
    const endTime = arg.dateStr.substr()

    setTaskList(prevState => [...prevState, {title: 'new event', date: arg.dateStr}])
    setNewTask({date: arg.dateStr, deadlineTime: endTime})

  }, []);

  // タスクの作成
  const handleSubmitTask = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/tasks', {title: 'new event', date: '2021-09-01'})
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='calendar' style={{  flex: 9.5, height: '100vh', margin: '30px'}}>
      <div className='calendarWrapper' style={{ padding: '10px',   boxShadow: '0px 1px 9px -1px #65789f', borderRadius: '10px'}}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]} 
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale='ja'
        dateClick={handleDateClick}
        headerToolbar={{                         
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek listWeek',
        }}
        contentHeight='auto'
        businessHours={ hideHoliday ? true : false}
        eventSources={[
          {
            googleCalendarApiKey: googleApiKey,
            googleCalendarId: 'japanese__ja@holiday.calendar.google.com',
            rendering: 'background',
            color:"#ffd0d0"
          }
        ]}
        events={[
          taskList.map((task) => (
              console.log(task),
            {
              title: `${task.title}`, 
              start: `${task.date}`, 
              end: `${task.date}`,
              extendedProps: {
                department: 'BioChemistry'
              },
              editable: true,
              durationEditable: true,
              description: '山田さん、株式会社Motoyui最終面接に向けての面接対策',
            }
          ))
        ]}

        //データ入れたら時使えそうなやつ
        // editable: { user.id === task.userId ? true : false}
        // {switchGoogleTask 
        //   ? googleTaskList.map((googleTask) => (
        //       {title: {googleTask.title}, end: {googleTask.deadlineDate}}
        //     ))
        // }
      />
      </div>
        <button onClick={handleGoogleTask}>Googleカレンダーのタスクを表示</button>
        <button onClick={handleHoliday}>休日の表示切り替え</button>
        <Modal  
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              タスクを作成する
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={(e) => handleSubmitTask(e)}>
                <input type="text" placeholder="タスク名" />
                <input type="date" placeholder=''/>
                <Button type="submit" variant="contained" color="primary">作成</Button>
              </form>
            </Typography>
          </Box>
        </Modal>
  </div>
  )
}

