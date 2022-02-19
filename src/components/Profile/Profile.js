import './Profile.css';

import React from 'react';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader'
import { getCurrentUser } from '../../selectors/selectors';
import { changeUserData, setIsLoadTrue } from '../../actions/actions'
import { signOut } from '../../utils/routerFunctions';


const Profile = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)


  const [email, setEmail] = useState('') // Стэйт для мыла
  const [name, setName] = useState('')  // Стэйт для имени

  const [emailDirty, setEmailDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на мыло
  const [nameDirty, setNameDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на имя

  const [emailError, setEmailError] = useState('') // Стэйт для ошибок мыла
  const [nameError, setNameError] = useState('') // Стэйт для ошибок имени

  const [formValid, setFormValid] = useState(false) // Стэйт для валидации кнопки

  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  
  // Задаём состояние кнопки исходя из наличия ошибок валидации
  useEffect(() => {
    if (emailError || nameError || (name === currentUser.name && email === currentUser.email)) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, nameError, name, email, currentUser.name, currentUser.email])


  //  Устанавливаем значения в инпуты
  useEffect(() => {
    setEmail(currentUser.email)
    setName(currentUser.name)
  }, [currentUser])


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


  // Проверяем клик по инпуту и устанавливаем значение в стэйт
  const blurHandler = e => {
    switch(e.target.name) {
      case 'email': setEmailDirty(true)
      break
      case 'name': setNameDirty(true)
      break
    }
  }


  //  Обработчик для сабмита формы
  const handleSubmit = event => {
    event.preventDefault()
    dispatch(setIsLoadTrue())
    dispatch(changeUserData(name, email, { setFormValid, setSuccess, setFail }))
  }


    return (
      <div className="profile">
        <Preloader></Preloader>

        <Header></Header>

        <form className="profile__bottom" noValidate onSubmit={handleSubmit}>

          <div className="profile__info">
            <h1 className="profile__greeting">Привет, {name}</h1>

            <div className="profile__user-info-container">
              <div className="profile__info-container">
                <p className="profile__info-title">Имя</p>
                <input
                 name="name" 
                 value={name} 
                 onChange={handleName} 
                 onBlur={e => blurHandler(e)} 
                 className="profile__info-title" 
                />
                {(nameDirty && nameError) && <div className="profile__input-error-top">{nameError}</div>}
              </div>

              <div className="profile__info-container">
                <p className="profile__info-title">E-mail</p> 
                <input
                 name="email"
                 value={email}
                 onChange={handleEmail} 
                 onBlur={e => blurHandler(e)} 
                 className="profile__info-title" 
                />
                {(emailDirty && emailError) && <div className="profile__input-error-bottom">{emailError}</div>}
              </div>
            </div>

          </div>

          <div className="profile__buttons">
            {(success) && <p className="profile__req-success">Успешно обновлено =)</p>}
            {(fail) && <p className="profile__req-fail">Произошла ошибка =(</p>}
            <button className={(formValid ? "profile__button" : "profile__button profile__button_type_inactive")} type="submit">Редактировать</button>
            <button className="profile__button profile__button_type_exit" onClick={() => signOut(history.push, dispatch)}>Выйти из аккаунта</button>
          </div>

        </form>
      </div>
    );
  }
  
  export default Profile;
  