import './Login.css';

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import logo from '../../image/registerLogo.svg'
import * as MainApi from '../../APIs/mainApi';
import { setLoggedIn } from '../../actions/actions';

function Login({ switchToRegistration, goMain }) {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('') // Стэйт для мыла
  const [pass, setPass] = useState('')  // Стэйт для пароля

  const [emailDirty, setEmailDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на мыло
  const [passDirty, setPassDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на пароль

  const [emailError, setEmailError] = useState('E-mail не может быть пустым') // Стэйт для ошибок мыла
  const [passError, setPassError] = useState('Пароль не может быть пустым') // Стэйт для ошибок пароля

  const [formValid, setFormValid] = useState(false) // Стэйт для валидации кнопки

  const [isRight, setIsRight] = useState(true)  // Стэйт для ошибки неверных данных

  // Задаём состояние кнопки исходя из наличия ошибок валидации
  useEffect(() => {
    if (emailError || passError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passError])

  // При изменении одного из полей ошибка неверных данных пропадает
  useEffect(() => {
    setIsRight(true)
  }, [email, pass])

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
    .then(() => {
      setEmail('')
      setPass('')
      dispatch(setLoggedIn())
      goMain()
    })
    .catch((err) => {
      console.log(err)
      setEmail('')
      setPass('')
      setFormValid(false)
      setIsRight(false)
    })
  }


  return (
    <div className="login register">
      <div className="login__container register__container">
      <div className="login__top register__top">
        <Link className="login__logo-link register__logo-link" to="/"><img className="login__logo register__logo" alt="logo" src={logo}></img></Link>
        
        <h1 className="login__header register__header">Рады видеть!</h1>
      </div>

      <form className="login__form register__form" onSubmit={handleSubmit} formNoValidate>
        <div className="login__middle register__middle">
          <div className="login__input-box register__input-box">
            <p className="login__input-name register__input-name">E-mail</p>
            <input name="email" className="login__input register__input" type="email" onChange={handleEmail} onBlur={e => blurHandler(e)} value={email} required></input>
            {(emailDirty && emailError) && <div className="login__input-err register__input-err">{emailError}</div>}
          </div>

          <div className="login__input-box register__input-box">
            <p className="login__input-name register__input-name">Пароль</p>
            <input name="password" className="login__input register__input" type="password" onChange={handlePass} onBlur={e => blurHandler(e)} value={pass} required></input>
            {(passDirty && passError) && <div className="login__input-err register__input-err">{passError}</div>}
          </div>
        </div>
        
        <div className="login__bottom register__bottom">
          {isRight ? null : <p className="login__wrong-data-message register__wrong-data-message">Неверный email или пароль</p>}
          <button className={(formValid ? "login__submit register__submit" : "login__submit register__submit register__submit_type_inactive")}>Войти</button>

          <div className="login__title-and-btn-container register__title-and-btn-container">
            <p className="login__title register__title">Ещё не зарегистрированы?</p>
            <button className="login__entr-btn register__entr-btn" onClick={switchToRegistration}>Регистрация</button>
          </div>
        </div>

      </form>
      </div>
    </div>
  );

  }
  
  export default Login;