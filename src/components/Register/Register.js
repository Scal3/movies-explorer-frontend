// import { useState } from 'react'
// import logo from '../../image/registerLogo.svg'
// import './Register.css';

// function Register(props) {

//   const [email, setEmail] = useState('') // Стэйт для мыла
//   const [name, setName] = useState('') // Стэйт для имени
//   const [pass, setPass] = useState('')  // Стэйт для пароля

//   const handleName = e => setName(e.target.value)
//   const handleEmail = e => setEmail(e.target.value)
//   const handlePass = e => setPass(e.target.value)

//   return (
//     <div className="register">
//       <div className="register__top">
//         <img className="register__logo" alt="logo" src={logo}></img>
//         <h1 className="register__header">Добро Пожаловать!</h1>
//       </div>

//       <form className="register__form">
//         <div className="register__middle">
//           <div className="register__input-box">
//             <p className="register__input-name">Имя</p>
//             <input className="register__input" type="text" onChange={handleName} value={name} required></input>
//           </div>

//           <div className="register__input-box">
//             <p className="register__input-name">E-mail</p>
//             <input className="register__input" type="email" onChange={handleEmail} value={email} required></input>
//           </div>

//           <div className="register__input-box">
//             <p className="register__input-name">Пароль</p>
//             <input className="register__input" type="password" onChange={handlePass} value={pass} required></input>
//           </div>
//         </div>
        
//         <div className="register__bottom">
//           <button className="register__submit" type="submit">Зарегистрироваться</button>

//           <div className="register__title-and-btn-container">
//             <p className="register__title">Уже зарегистрированы?</p>
//             <button className="register__entr-btn" onClick={props.switchToLogin}>Войти</button>
//           </div>
//         </div>

//       </form>

//     </div>
//   );
//   }
  
//   export default Register;


import { useState } from 'react'
import logo from '../../image/registerLogo.svg'
import './Register.css';

function Register(props) {

  const [email, setEmail] = useState('') // Стэйт для мыла
  const [name, setName] = useState('') // Стэйт для имени
  const [pass, setPass] = useState('')  // Стэйт для пароля

  const handleName = e => setName(e.target.value)
  const handleEmail = e => setEmail(e.target.value)
  const handlePass = e => setPass(e.target.value)

  return (
    <div className="register">
      <div className="register__container">
      <div className="register__top">
        <img className="register__logo" alt="logo" src={logo}></img>
        <h1 className="register__header">Добро Пожаловать!</h1>
      </div>

      <form className="register__form">
        <div className="register__middle">
          <div className="register__input-box">
            <p className="register__input-name">Имя</p>
            <input className="register__input" type="text" onChange={handleName} value={name} required></input>
          </div>

          <div className="register__input-box">
            <p className="register__input-name">E-mail</p>
            <input className="register__input" type="email" onChange={handleEmail} value={email} required></input>
          </div>

          <div className="register__input-box">
            <p className="register__input-name">Пароль</p>
            <input className="register__input" type="password" onChange={handlePass} value={pass} required></input>
          </div>
        </div>
        
        <div className="register__bottom">
          <button className="register__submit" type="submit">Зарегистрироваться</button>

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
