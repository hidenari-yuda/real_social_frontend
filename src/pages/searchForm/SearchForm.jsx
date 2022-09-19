import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import Search from '../search/Search';

export default function SearchForm() {
  const navigate = useNavigate();
  const freewordRef = useRef()

  const handleFreeword = (e) => {
    e.preventDefault();
    navigate('/search', { state: { freeword : freewordRef.current.value } })
  }
  
  return (
    <>
    <Topbar />
    <div className='seachFormContainer'>
      <Sidebar />
      <div className='searchFormMain'>
        <form 
          className='searchbar' 
          onSubmit={(e) => handleFreeword(e)}
        >
          <button 
            type='submit' 
            className='btn btn-primary' 
            style={{border: 'none', background: 'transparent', outline: 'none'}}
           >
            <Search className='searchIcon' />
          </button>
          <input 
            type='text' 
            placeholder='探し物は何ですか？' 
            className='searchInput' 
            ref={freewordRef}
          />
        </form>
      </div>
    </div>
    </>
  )
}
