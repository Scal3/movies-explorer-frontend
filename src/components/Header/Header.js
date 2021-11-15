import logo from '../../image/registerLogo.svg'
import './Header.css';
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  const [isBurgerMenuBtnActive, setIsBurgerMenuBtnActive] = useState(false); // Стэйт для кнопки бургер-меню

  const changeButtonStateTrue = () => {
    setIsBurgerMenuBtnActive(true)
  }

  const changeButtonStateFalse = () => {
    setIsBurgerMenuBtnActive(false)
  }

    return (
      <header className="header">
        <div className={props.promoHeaderPadding ? "header__ears header__ears_type_promo" : "header__ears"}>
          <NavLink to="/" className="header__desctop-btn-link">
            <img className="header__logo" src={logo} alt="logo"></img>
          </NavLink>

          <div className="header__desctop-container">
            <NavLink to="/movies" className={props.promoHeaderPadding ? "header__link header__link_type_promo" : "header__link"}>Фильмы</NavLink>
            <NavLink to="/saved-movies" className={props.promoHeaderPadding ? "header__link header__link_type_promo" : "header__link"}>Сохранённые фильмы</NavLink>
          </div>

          <NavLink to="/profile" className="header__desctop-btn-link">
            <button className="header__desctop-btn"></button>
          </NavLink>

          <div className="header__btn" onClick={changeButtonStateTrue}>
            <span className="header__btn__third-line"/>
          </div>

          <Navigation 
            isBurgerMenuBtnActive={isBurgerMenuBtnActive} 
            changeButtonStateFalse={changeButtonStateFalse}>
          </Navigation>
        </div>
      </header>
    );
  }
  
  export default Header;
  