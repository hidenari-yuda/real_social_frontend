import React, { useRef, useContext } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { loginCall } from '../../dispatch';
import { AuthContext } from '../../state/AuthContext';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({
      email: email.current.value,
      password: password.current.value
    },
    dispatch
    )
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
            <p className='loginMsg'>ログインはこちら</p>
            <input 
              type='email' 
              placeholder='メールアドレス' 
              className='loginInput' 
              required 
              ref={email} 
            />
            <input 
              type='password' 
              placeholder='パスワード' 
              className='loginInput' 
              required 
              minLength='6'
              ref={password} 
            />
            <button className='loginButton' type='submit'>ログイン</button>
            <span className='loginForgot'>パスワードを忘れた場合</span>
            <Link to='/register'>
              <button className='loginRegisterButton'>
                  新規登録
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
