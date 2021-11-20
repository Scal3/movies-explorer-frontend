import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation({isBurgerMenuBtnActive, changeButtonStateFalse}) {
    return (
      <nav className={(isBurgerMenuBtnActive ? 'navigation' : 'navigation_inactive')}>
        <div className="navigation__blur"/>

        <div className="navigation__content">
          <button className="navigation__close-btn" onClick={changeButtonStateFalse}></button>

          <div className="navigation__link-list">
            <NavLink to="/" className="navigation__link">Главная</NavLink>
            <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active">Сохранённые фильмы</NavLink>
          </div>

          <NavLink to="/profile" className="navigation__profile-link">
            <button className="navigation__profile-link-img"></button>
          </NavLink>
        </div>

      </nav>
    );
  }
  
  export default Navigation;
  