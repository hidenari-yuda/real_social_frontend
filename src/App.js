import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './state/AuthContext';
import React, { useContext } from 'react';
import Chat from './pages/chat/Chat';
import Notifications from './pages/notifications/Notifications';
import Search from './pages/search/Search';
import Settings from './pages/settings/Settings';
import SearchForm from './pages/searchForm/SearchForm';
import Calendar from './pages/calendar/Calendar';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={user ? <Navigate to='/' /> : <Register />} />
        <Route path="/profile/:username" element={user ? <Profile /> : <Navigate to='/login' />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to='/login' />} />
        <Route path="/notifications" element={user ? <Notifications /> : <Navigate to='/login' /> } />
        <Route path="/search" element={user ? <Search /> : <Navigate to='/login' />} />
        <Route path="/search_form" element={user ? <SearchForm /> : <Navigate to='/login' /> } />
        <Route path="/settings" element={user ? <Settings/> : <Navigate to='/login' />} />
        <Route path="/calendar" element={user ? <Calendar /> : <Navigate to='/login' /> } />
      </Routes>
    </Router>
  );
}

export default App;
