import { useState } from 'react'
import logo from '../../image/registerLogo.svg'
import './Login.css';

function Login(props) {

  const [email, setEmail] = useState('') // Стэйт для мыла
  const [pass, setPass] = useState('')  // Стэйт для пароля

  const handleEmail = e => setEmail(e.target.value)
  const handlePass = e => setPass(e.target.value)


    return (
      <div className="login register">
        <div className="login__container register__container">
        <div className="login__top register__top">
          <img className="login__logo register__logo" alt="logo" src={logo}></img>
          
          <h1 className="login__header register__header">Рады видеть!</h1>
        </div>
  
        <form className="login__form register__form">
          <div className="login__middle register__middle">
            <div className="login__input-box register__input-box">
              <p className="login__input-name register__input-name">E-mail</p>
              <input className="login__input register__input" type="email" onChange={handleEmail} value={email} required></input>
            </div>

            <div className="login__input-box register__input-box">
              <p className="login__input-name register__input-name">Пароль</p>
              <input className="login__input register__input" type="password" onChange={handlePass} value={pass} required></input>
            </div>
          </div>
          
          <div className="login__bottom register__bottom">
            <button className="login__submit register__submit" type="submit">Войти</button>
  
            <div className="login__title-and-btn-container register__title-and-btn-container">
              <p className="login__title register__title">Ещё не зарегистрированы?</p>
              <button className="login__entr-btn register__entr-btn" onClick={props.switchToLogin}>Регистрация</button>
            </div>
          </div>
  
        </form>
        </div>
      </div>
    );
  }
  
  export default Login;