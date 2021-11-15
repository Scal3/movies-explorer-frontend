import { useState, useEffect } from 'react'
import logo from '../../image/registerLogo.svg'
import './Login.css';
import * as MainApi from '../../utils/MainApi';

function Login(props) {

  const [email, setEmail] = useState('') // Стэйт для мыла
  const [pass, setPass] = useState('')  // Стэйт для пароля

  const [emailDirty, setEmailDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на мыло
  const [passDirty, setPassDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на пароль

  const [emailError, setEmailError] = useState('E-mail не может быть пустым') // Стэйт для ошибок мыла
  const [passError, setPassError] = useState('Пароль не может быть пустым') // Стэйт для ошибок пароля

  const [formValid, setFormValid] = useState(false) // Стэйт для валидации кнопки

  // Задаём состояние кнопки исходя из наличия ошибок валидации
  useEffect(() => {
    if (emailError || passError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passError])

  // Устанавливаем значение в инпут и валидируем email по regex
  const handleEmail = e => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некоректный email')
      if (!e.target.value) { setEmailError('E-mail не может быть пустым') }
    } else {
      setEmailError('')
    }
  }

  // Устанавливаем значение в инпут и валидируем пароль по количеству символов
  const handlePass = (e) => {
    setPass(e.target.value)
    if (e.target.value.length < 6 || e.target.value.length > 12) {
      setPassError('Пароль должен содержать от 6 до 12 символов')
      if (!e.target.value) { setPassError('Пароль не может быть пустым') }
    } else {
      setPassError('')
    }
  }

  // Проверяем клик по инпуту и устанавливаем значение в стэйт
  const blurHandler = e => {
    switch(e.target.name) {
      case 'email': setEmailDirty(true)
      break
      case 'password': setPassDirty(true)
      break
    }
  }

  //  Обработчик для сабмита формы
  const handleSubmit = e => {
    e.preventDefault()
    MainApi.authorization(pass, email)
    .then((res) => {
      props.goMain()
      console.log(res)
      setEmail('')
      setPass('')
    })
  }


    return (
      <div className="login register">
        <div className="login__container register__container">
        <div className="login__top register__top">
          <img className="login__logo register__logo" alt="logo" src={logo}></img>
          
          <h1 className="login__header register__header">Рады видеть!</h1>
        </div>
  
        <form className="login__form register__form" onSubmit={handleSubmit} formNoValidate>
          <div className="login__middle register__middle">
            <div className="login__input-box register__input-box">
              <p className="login__input-name register__input-name">E-mail</p>
              <input name="email" className="login__input register__input" type="email" onChange={handleEmail} onBlur={e => blurHandler(e)} value={email} required></input>
              {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
            </div>

            <div className="login__input-box register__input-box">
              <p className="login__input-name register__input-name">Пароль</p>
              <input name="password" className="login__input register__input" type="password" onChange={handlePass} onBlur={e => blurHandler(e)} value={pass} required></input>
              {(passDirty && passError) && <div style={{color: 'red'}}>{passError}</div>}
            </div>
          </div>
          
          <div className="login__bottom register__bottom">
            <button className={(formValid ? "login__submit register__submit" : "login__submit register__submit register__submit_type_inactive")}>Войти</button>
  
            <div className="login__title-and-btn-container register__title-and-btn-container">
              <p className="login__title register__title">Ещё не зарегистрированы?</p>
              <button className="login__entr-btn register__entr-btn" onClick={props.switchToRegistration}>Регистрация</button>
            </div>
          </div>
  
        </form>
        </div>
      </div>
    );
  }
  
  export default Login;