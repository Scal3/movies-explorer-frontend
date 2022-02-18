import './Register.css';

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import logo from '../../image/registerLogo.svg'
import * as MainApi from '../../APIs/mainApi';
import { setLoggedIn } from '../../actions/actions';

const Register = ({ goMain, switchToLogin }) => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('') // Стэйт для мыла
  const [name, setName] = useState('') // Стэйт для имени
  const [pass, setPass] = useState('')  // Стэйт для пароля

  const [emailDirty, setEmailDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на мыло
  const [nameDirty, setNameDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на имя
  const [passDirty, setPassDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на пароль

  const [emailError, setEmailError] = useState('E-mail не может быть пустым') // Стэйт для ошибок мыла
  const [nameError, setNameError] = useState('Имя не может быть пустым') // Стэйт для ошибок имени
  const [passError, setPassError] = useState('Пароль не может быть пустым') // Стэйт для ошибок пароля

  const [isRight, setIsRight] = useState(true)  // Стэйт для ошибки неверных данных

  const [formValid, setFormValid] = useState(false) // Стэйт для валидации кнопки

  // Задаём состояние кнопки исходя из наличия ошибок валидации
  useEffect(() => {
    if (emailError || nameError || passError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, nameError, passError])

  // При изменении одного из полей ошибка неверных данных пропадает
  useEffect(() => {
    setIsRight(true)
  }, [email, pass, name])

  // Устанавливаем значение в инпут и валидируем имя по regex
  const handleName = e => {
    setName(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 15) {
      setNameError('Имя может быть длинной от 2 до 15 символов')
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
    .then((res) => {
      MainApi.authorization(pass, email)
        .then(() => {
          setEmail('')
          setPass('')
          setName('')
          dispatch(setLoggedIn())
          goMain()
        })
        .catch((err) => console.log(err))

    })
    .catch((err) => {
      console.log(err)
      setEmail('')
      setPass('')
      setName('')
      setFormValid(false)
      setIsRight(false)
    })
  }

  return (
    <div className="register">
      <div className="register__container">
      <div className="register__top">
        <Link className="register__logo-link" to="/"><img className="register__logo" alt="logo" src={logo}></img></Link>
        <h1 className="register__header">Добро Пожаловать!</h1>
      </div>

      <form className="register__form" formNoValidate onSubmit={e => handleSubmit(e)}>
        <div className="register__middle">
          <div className="register__input-box">
            <p className="register__input-name">Имя</p>
            <input name="name" className="register__input" type="text" onChange={e => handleName(e)} value={name} onBlur={e => blurHandler(e)} required></input>
            {(nameDirty && nameError) && <div className="register__input-err">{nameError}</div>}
          </div>

          <div className="register__input-box">
            <p className="register__input-name">E-mail</p>
            <input name="email" className="register__input" type="email" onChange={e => handleEmail(e)} value={email} onBlur={e => blurHandler(e)} required></input>
            {(emailDirty && emailError) && <div className="register__input-err">{emailError}</div>}
          </div>

          <div className="register__input-box">
            <p className="register__input-name">Пароль</p>
            <input name="password" className="register__input" type="password" onChange={e => handlePass(e)} value={pass} onBlur={e => blurHandler(e)} required></input>
            {(passDirty && passError) && <div className="register__input-err">{passError}</div>}
          </div>
        </div>
        
        <div className="register__bottom">
          {isRight ? null : <p className="register__wrong-data-message">Пользователь с таким email уже зарегистрирован</p>}
          <button className={(formValid ? "register__submit" : "register__submit register__submit_type_inactive")} type="submit">Зарегистрироваться</button>

          <div className="register__title-and-btn-container">
            <p className="register__title">Уже зарегистрированы?</p>
            <button className="register__entr-btn" onClick={switchToLogin}>Войти</button>
          </div>
        </div>

      </form>
      </div>

    </div>
  );
  }
  
  export default Register;

