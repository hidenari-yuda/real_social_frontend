import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import './CalendarBoard.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; 
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import { AuthContext } from '../../state/AuthContext';
import { Box, Modal, Typography } from '@mui/material';
import { useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';

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
  }, [taskList])

  const googleApiKey = process.env.GOOGLE_CALENDAR_API_KEY

  //Googleカレンダーからタスクの取得
  // const [googleTaskList, setGoogleTaskList] = useState([])
  // const [switchGoogleTask, setSwitchGoogleTask] = useState(false)


  //   const handleGoogleTask = async () => {
  //     setSwitchGoogleTask(prevState => !prevState)
  //     const calendarId = 'yhide327@gmail.com'
  //     try {
  //     const response = await axios.get(`/https://www.googleapis.com/auth/calendar/${calendarId}`)
  //     setGoogleTaskList(response.data)
  //     console.log(response.data)
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

    //休日の表示非表示
  const [hideHoliday, setHideHoliday] = useState(false)

  const handleHoliday = () => {
    setHideHoliday(prevState => !prevState)
  }

  // モーダルの表示非表示
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  //クリックした日付を取得して、モーダルを表示
  const [clickedDate, setClickedDate] = useState({})

  const handleDateClick = (clicked) => {
    console.log(clicked)
    //取得した日付の終了時間（仮）を設定 
    const date = new Date(clicked.dateStr)

    const dateS = date.getDate()
    const monthS = date.getMonth() + 1
    const yearS = date.getFullYear()
    const hourS = date.getHours()
    const minuteS = date.getMinutes()
    
    const dateE = date.getDate()
    const monthE = date.getMonth() + 1
    const yearE = date.getFullYear()
    const hourE = date.getHours() + 1
    const minuteE = date.getMinutes()
    
    setClickedDate({
      startDate: `${yearS}/${monthS}/${dateS}`,
      startTime: `${hourS}:${minuteS}`,
      deadlineDate: `${yearE}/${monthE}/${dateE}`,
      deadlineTime: `${hourE}:${minuteE}`,
    })

    setOpen(prevState => !prevState)
  }

  const [startDate, setStartDate] = useState()

  const [startTime, setStartTime] = useState()

  const [deadlineDate, setDeadlineDate] = useState()

  const [deadlineTime, setDeadlineTime] = useState()

  const [fetchTask, setFetchTask] = useState({
    id: null,
    phase_category: null,
    phase_sub_category: null,
    remarks: '',
    deadline_date: '',
    deadline_time: '',
    good_point: '',
    ng_point: '',
    unofficial_offer_notice_url: '',
    conditions_notice_url: '',
    unofficial_offer_consent_url: '',
    accuracy: null,
    contract_signed_month: '',
    billing_month: '',
    billing_amount: null,
  })

  const phaseCategoryRef = useRef();
  const phaseSubCategoryRef = useRef();
  const remarksRef = useRef();
  const goodPointRef = useRef();
  const ngPointRef = useRef();
  const unofficialOfferNoticeUrlRef = useRef();
  const conditionsNoticeUrlRef = useRef();
  const unofficialOfferConsentUrlRef = useRef();
  const accuracyRef = useRef();
  const contractSigned_monthRef = useRef();
  const billingMonthRef = useRef();
  const billingAmountRef = useRef();
  const jobInformationIdRef = useRef();
  const jobSeekerIdRef = useRef();
  
  // タスクの作成
  const handleSubmitTask = async (e) => {
    e.preventDefault()

    const startTimePlusSeconds = startTime + ':00'
    const deadlineTimePlusSeconds = deadlineTime + ':00'

    console.log(phaseCategoryRef.current.value)
    console.log(phaseSubCategoryRef.current.value)
    console.log(remarksRef.current.value)
    console.log(deadlineTime)
    console.log(goodPointRef.current.value)

    const newTask = {
      job_information_id: jobInformationIdRef.current.value,
      job_seeker_id: jobSeekerIdRef.current.value,
      phase_category: phaseCategoryRef.current.value,
      phase_sub_category: phaseSubCategoryRef.current.value,
      remarks: remarksRef.current.value,
      start_date: startDate,
      start_time: startTimePlusSeconds,
      deadline_date: deadlineDate,
      deadline_time: deadlineTimePlusSeconds,
      good_point: goodPointRef.current.value,
      ng_point: ngPointRef.current.value,
      unofficial_offer_notice_url: unofficialOfferNoticeUrlRef.current.value,
      conditions_notice_url: conditionsNoticeUrlRef.current.value,
      unofficial_offer_consent_url: unofficialOfferConsentUrlRef.current.value,
      accuracy: accuracyRef.current.value,
      contract_signed_month: contractSigned_monthRef.current.value,
      billing_month: billingMonthRef.current.value,
      billing_amount: billingAmountRef.current.value,
    }
  
  try {
    await axios.post('/tasks', newTask)
  } catch (err) {
    console.log(err);
  }
    window.location.reload();
  }

  const handleDragg = async (info) => {
    console.log(info)

    const startDate = info.event.startStr.slice(0, 10)
    const startTime = info.event.startStr.slice(11, 19)
    const deadlineDate = info.event.endStr.slice(0, 10)
    const deadlineTime = info.event.endStr.slice(11, 19)

    console.log(startDate, startTime, deadlineDate, deadlineTime)

    try {
      await axios.put(`/tasks/${info.event.id}`, {
        start_date: startDate,
        start_time: startTime,
        deadline_date: deadlineDate,
        deadline_time: deadlineTime,
      })

    } catch (err) {
      console.log(err);
    }
  }


  const handleEventClick = async (info) => {
    console.log(info)

    //求人リストのフェッチ
    //求職者リストのフェッチ

    try {
      const response = await axios.get(`/tasks/${info.event.id}`)
      setFetchTask(response.data)
    } catch (err) {
      console.log(err);
    }
    setOpen(prevState => !prevState)
  }

  const handleEditTask = async (e) => {
    console.log(e)
    e.preventDefault()
    const startTimePlusSeconds = startTime + ':00'
    const deadlineTimePlusSeconds = deadlineTime + ':00'

    const newTask = {
      job_information_id: jobInformationIdRef.current.value,
      job_seeker_id: jobSeekerIdRef.current.value,
      phase_category: phaseCategoryRef.current.value,
      phase_sub_category: phaseSubCategoryRef.current.value,
      remarks: remarksRef.current.value,
      start_date: startDate,
      start_time: startTimePlusSeconds,
      deadline_date: deadlineDate,
      deadline_time: deadlineTimePlusSeconds,
      good_point: goodPointRef.current.value,
      ng_point: ngPointRef.current.value,
      unofficial_offer_notice_url: unofficialOfferNoticeUrlRef.current.value,
      conditions_notice_url: conditionsNoticeUrlRef.current.value,
      unofficial_offer_consent_url: unofficialOfferConsentUrlRef.current.value,
      accuracy: accuracyRef.current.value,
      contract_signed_month: contractSigned_monthRef.current.value,
      billing_month: billingMonthRef.current.value,
      billing_amount: billingAmountRef.current.value,
    }

    try {
      await axios.put(`/tasks/${fetchTask.id}`, newTask)
    } catch (err) {
      console.log(err);
    }
  }

    

  return (
    <CalendarContainer>
      <CalendarWrapper>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]} 
          initialView="dayGridMonth"
          locales={[jaLocale]}
          locale='ja'
          dateClick={(info) => handleDateClick(info)}
          eventClick={(info) => handleEventClick(info)}
          eventDrop={(info) => handleDragg(info)}

          headerToolbar={{                         
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek listWeek',
          }}
          googleCalendarApiKey= {googleApiKey}
          contentHeight='auto'
          businessHours={ hideHoliday ? true : false}
          eventSources={[
            {
              googleCalendarId: 'japanese__ja@holiday.calendar.google.com',
              rendering: 'background',
              color:"#ffd0d0"
            }
          ]}
          events={[
            {
              id: 1,
              title: 'event1',
              date: '2022-09-22',
              start: '2022-09-22T10:00:00',
              end: '2022-09-22T12:00:00',
              durationEditable: false,
              editable:true
              },
            //   taskList.map((task) => {
            //     [{
            //       id: `${task.id}`,
            //       title: `${task.phase_category}`, 
            //       start: `${task.start_date}T${task.start_time}`, 
            //       end: `${task.deadline_date}T${task.deadline_time}`,
            //       editable:true,
            //       // editable: { user.id === task.userId ? true : false}
            //       description: 
            //       `備考：${task.remarks}・優点：${task.good_point}・欠点：${task.ng_point}・非公式オファー通知URL：${task.unofficial_offer_notice_url}
            //       ・条件通知URL：${task.conditions_notice_url}・非公式オファー同意URL：${task.unofficial_offer_consent_url}・精度：${task.accuracy}
            //       ・契約締結月：${task.contract_signed_month}・請求月：${task.billing_month}・請求金額：${task.billing_amount}`,
            //     }]
            // })
          ]}
          // {switchGoogleTask 
          //   ? googleTaskList.map((googleTask) => (
          //       {title: {googleTask.title}, start: googleTask.start, end: {googleTask.end}}
          //     ))
          // }
        />
      </CalendarWrapper>
        {/* <TaskButton onClick={handleGoogleTask}>Googleカレンダーのタスクを表示</TaskButton> */}
        <TaskButton onClick={handleHoliday}>休日の表示切り替え</TaskButton>
        <Modal  
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={boxStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              タスクを作成する
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
              <div>
              <TaskForm onSubmit={(e) => {fetchTask.id ? handleEditTask(e) : handleSubmitTask(e)}}>
                  <TaskLabel>求人</TaskLabel>
                  <select ref={jobInformationIdRef}>
                    <option hidden value="">{fetchTask.job_information_id}</option>
                    {/* {jobInformationList.map((jobInfo) => <option value={jobInfo.id} required>{jobInfo.title}</option>)} */}
                  </select>
                  <TaskLabel>求職者</TaskLabel>
                  <select ref={jobSeekerIdRef}>
                  <option hidden value="">{fetchTask.job_information_id}</option>
                    {/* {jobSeekerList.map((jobSeeker) => <option value={jobSeeker.id} required>{jobSeeker.first_name} {jobSeeker.last_name}</option>)} */}
                  </select>
                  <TaskLabel>フェーズ</TaskLabel>
                  <TaskInput type="number" min={'0'} max={'5'} placeholder={fetchTask.phase_category} ref={phaseCategoryRef}/>
                  <TaskLabel>サブフェーズ</TaskLabel>
                  <TaskInput type="number" min={'0'} max={'5'} placeholder={fetchTask.phase_sub_category} ref={phaseSubCategoryRef}/>
                  <TaskLabel>備考</TaskLabel>
                  <TaskInput type="text" ref={remarksRef}/>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={clickedDate.startDate}
                      value={clickedDate.startDate}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label={clickedDate.startTime}
                      value={clickedDate.startTime}
                      onChange={(newValue) => {
                        setStartTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={clickedDate.deadlineDate}
                      value={clickedDate.deadlineDate}
                      onChange={(newValue) => {
                        setDeadlineDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label={clickedDate.deadlineTime}
                      value={clickedDate.deadlineTime}
                      onChange={(newValue) => {
                        setDeadlineTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <TaskLabel>優点</TaskLabel>
                  <TaskInput type="text"  ref={goodPointRef}/>
                  <TaskLabel>悪い点</TaskLabel>
                  <TaskInput type="text"  ref={ngPointRef}/>
                  <TaskLabel>非公式オファー通知URL</TaskLabel>
                  <TaskInput type="text"  ref={unofficialOfferNoticeUrlRef}/>
                  <TaskLabel>条件通知URL</TaskLabel>
                  <TaskInput type="text" ref={conditionsNoticeUrlRef}/>
                  <TaskLabel>非公式オファー同意URL</TaskLabel>
                  <TaskInput type="text" ref={unofficialOfferConsentUrlRef}/>
                  <TaskLabel>精度</TaskLabel>
                  <TaskInput type="number" min={'0'} max={'5'} ref={accuracyRef}/>
                  <TaskLabel>契約締結月</TaskLabel>
                  <TaskInput type="text" ref={contractSigned_monthRef}/>
                  <TaskLabel>請求月</TaskLabel>
                  <TaskInput type="text" ref={billingMonthRef}/>
                  <TaskLabel>請求金額</TaskLabel>
                  <TaskInput type="number" min={'0'} ref={billingAmountRef}/>
                  <TaskButton type="submit" variant="contained">作成</TaskButton>
                </TaskForm>
              </div>
            {/* </Typography> */}
          </Box>
        </Modal>
  </CalendarContainer>
  )
}
  
  //モーダルデザイン
  const boxStyle = {
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

  const CalendarContainer = styled.div`
    flex: 9.5;
    height: 100vh;
    margin: 30px;
  `

  const CalendarWrapper = styled.div`
    padding: 10px;
    box-shadow: 0px 1px 9px -1px #65789f;
    border-radius: 10px`

  const TaskForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: auto;
  `

  const TaskLabel = styled.label`
    padding-right: 10px;
  `

  const TaskInput = styled.input`
    margin-bottom: 10px;
  `

  const TaskButton = styled.button`
    margin-top: 10px;
  `
