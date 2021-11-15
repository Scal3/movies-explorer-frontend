import { useState, useEffect } from 'react'
import logo from '../../image/registerLogo.svg'
import './Register.css';
import * as MainApi from '../../utils/MainApi';

function Register(props) {

  const [email, setEmail] = useState('') // Стэйт для мыла
  const [name, setName] = useState('') // Стэйт для имени
  const [pass, setPass] = useState('')  // Стэйт для пароля

  const [emailDirty, setEmailDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на мыло
  const [nameDirty, setNameDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на имя
  const [passDirty, setPassDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на пароль

  const [emailError, setEmailError] = useState('E-mail не может быть пустым') // Стэйт для ошибок мыла
  const [nameError, setNameError] = useState('Имя не может быть пустым') // Стэйт для ошибок имени
  const [passError, setPassError] = useState('Пароль не может быть пустым') // Стэйт для ошибок пароля

  const [formValid, setFormValid] = useState(false) // Стэйт для валидации кнопки

  // Задаём состояние кнопки исходя из наличия ошибок валидации
  useEffect(() => {
    if (emailError || nameError || passError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, nameError, passError])

  // Устанавливаем значение в инпут и валидируем имя по regex
  const handleName = e => {
    setName(e.target.value)
    const re = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/
    if (!re.test(String(e.target.value).toLowerCase())) {
      setNameError('Некоректное имя')
      if (!e.target.value) { setNameError('Имя не может быть пустым') }
    } else {
      setNameError('')
    }
  }

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
      case 'name': setNameDirty(true)
      break
    }
  }

  //  Обработчик для сабмита формы
  const handleSubmit = e => {
    e.preventDefault()
    MainApi.registration(pass, email, name)
    .then(() => {
      MainApi.authorization(pass, email)
      setEmail('')
      setPass('')
      setName('')
      props.goMain()
    })
  }

  return (
    <div className="register">
      <div className="register__container">
      <div className="register__top">
        <img className="register__logo" alt="logo" src={logo}></img>
        <h1 className="register__header">Добро Пожаловать!</h1>
      </div>

      <form className="register__form" formNoValidate onSubmit={e => handleSubmit(e)}>
        <div className="register__middle">
          <div className="register__input-box">
            <p className="register__input-name">Имя</p>
            <input name="name" className="register__input" type="text" onChange={e => handleName(e)} value={name} onBlur={e => blurHandler(e)} required></input>
            {(nameDirty && nameError) && <div style={{color: 'red'}}>{nameError}</div>}
          </div>

          <div className="register__input-box">
            <p className="register__input-name">E-mail</p>
            <input name="email" className="register__input" type="email" onChange={e => handleEmail(e)} value={email} onBlur={e => blurHandler(e)} required></input>
            {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
          </div>

          <div className="register__input-box">
            <p className="register__input-name">Пароль</p>
            <input name="password" className="register__input" type="password" onChange={e => handlePass(e)} value={pass} onBlur={e => blurHandler(e)} required></input>
            {(passDirty && passError) && <div style={{color: 'red'}}>{passError}</div>}
          </div>
        </div>
        
        <div className="register__bottom">
          <button className={(formValid ? "register__submit" : "register__submit register__submit_type_inactive")} type="submit">Зарегистрироваться</button>

          <div className="register__title-and-btn-container">
            <p className="register__title">Уже зарегистрированы?</p>
            <button className="register__entr-btn" onClick={props.switchToLogin}>Войти</button>
          </div>
        </div>

      </form>
      </div>

    </div>
  );
  }
  
  export default Register;

