import './Promo.css'

import { useSelector } from "react-redux";

import logo from '../../image/registerLogo.svg'
import webLogo from '../../image/webLogo.svg'
import Header from '../Header/Header';
import { getLoggedIn } from "../../selectors/selectors";

function Promo({ switchToRegistration, switchToLogin, goMain}) {

  const isLoggedIn = useSelector(getLoggedIn)  

  return (
    <div className="promo">
      <div className="promo__ears">
      {isLoggedIn ? <Header promoHeaderPadding={true}></Header> : 
        <div className="promo__top">
          <img className="promo__logo" src={logo} alt="logo"></img>

          <div className="promo__btns-container">
            <button className="promo__btn" onClick={switchToRegistration}>Регистрация</button>

            <button className="promo__btn promo__btn_type_enter" onClick={switchToLogin}>Войти</button>
          </div>
        </div>}

        <div className="promo__middle">
          <img className="promo__web-img" src={webLogo} alt="web planet"></img>

          <div className="promo__text-container">
            <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>

            <p className="promo__paragraph">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          </div>
        
        </div>

        <div className="promo__bottom">
          {isLoggedIn ? <button className="promo__more-btn" onClick={goMain}>Узнать больше</button> :
            <button className="promo__more-btn" onClick={switchToLogin}>Узнать больше</button>}
        </div>
      </div>
    </div>
  );
}

export default Promo;

