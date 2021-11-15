import React from 'react';
import { useState, useEffect } from 'react'
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import * as MainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader'

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);  //Контекст с инфой пользователя

  const [email, setEmail] = useState(currentUser.email) // Стэйт для мыла
  const [name, setName] = useState(currentUser.name)  // Стэйт для имени

  const [emailDirty, setEmailDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на мыло
  const [nameDirty, setNameDirty] = useState('') // Стэйт, чтобы понять кликнул ли пользователь на имя

  const [emailError, setEmailError] = useState('') // Стэйт для ошибок мыла
  const [nameError, setNameError] = useState('') // Стэйт для ошибок имени

  const [formValid, setFormValid] = useState(false) // Стэйт для валидации кнопки


  // Задаём состояние кнопки исходя из наличия ошибок валидации
  useEffect(() => {
    if (emailError || nameError || (name === currentUser.name && email === currentUser.email)) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, nameError, name, email, currentUser.name, currentUser.email])


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
    const re = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/
    if (!re.test(String(e.target.value).toLowerCase())) {
      setNameError('Некоректное имя')
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
  const handleSubmit = e => {
    props.setIsLoad(true)
    e.preventDefault()
    MainApi.changeUserData({name, email})
    .then((res) => {
      props.setIsLoad(false)
      setFormValid(false)
    })
    .catch(err => {
      console.log(err)
      props.setIsLoad(false)
    })
  }


    return (
      <div className="profile">
        <Preloader isLoad={props.isLoad}></Preloader>

        <Header></Header>

        <form className="profile__bottom" noValidate onSubmit={handleSubmit}>

          <div className="profile__info">
            <h1 className="profile__greeting">Привет, {name}</h1>

            <div className="profile__user-info-container">
              <div className="profile__info-container">
                <p className="profile__info-title">Имя</p> <input name="name" value={name} onChange={handleName} onBlur={e => blurHandler(e)} className="profile__info-title"></input>
                {(nameDirty && nameError) && <div className="profile__input-error-top">{nameError}</div>}
              </div>

              <div className="profile__info-container">
                <p className="profile__info-title">E-mail</p> <input name="email" value={email} onChange={handleEmail} onBlur={e => blurHandler(e)} className="profile__info-title"></input>
                {(emailDirty && emailError) && <div className="profile__input-error-bottom">{emailError}</div>}
              </div>
            </div>

          </div>

          <div className="profile__buttons">
            <button className={(formValid ? "profile__button" : "profile__button profile__button_type_inactive")} type="submit">Редактировать</button>
            <button className="profile__button profile__button_type_exit" onClick={props.signOut}>Выйти из аккаунта</button>
          </div>

        </form>
      </div>
    );
  }
  
  export default Profile;
  