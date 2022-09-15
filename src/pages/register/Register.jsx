import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './Register.css'

export default function Regiter() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity('パスワードが一致しません');
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value
        }

        await axios.post('/auth/register', user)

        navigate('/login');

      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Real Social</h3>
          <span className='loginDesc'>本格的なSNSを、自分の手で</span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={(e) => handleSubmit(e)}>
            <p className='loginMsg'>新規登録はこちら</p>
            <input 
              type='text' 
              placeholder='ユーザー名' 
              className='loginInput'
              required 
              ref={username}
            />
            <input type='email' placeholder='メールアドレス' className='loginInput' required ref={email}/>
            <input type='password' placeholder='パスワード' className='loginInput' required minLength='6' ref={password}/>
            <input type='password' placeholder='確認用パスワード' className='loginInput' required minLength='6'/>
            <button className='loginButton' type='submit' >新規登録</button>
            <button className='loginRegisterButton'>ログイン</button>
          </form>
        </div>
      </div>
    </div>
  )
}
