import './Promo.css'
import logo from '../../image/registerLogo.svg'
import webLogo from '../../image/webLogo.svg'

function Promo() {
  return (
    <div className="promo">
      <div className="promo__ears">
        <div className="promo__top">
          <img className="promo__logo" src={logo} alt="logo"></img>

          <div className="promo__btns-container">
            <button className="promo__btn">Регистрация</button>

            <button className="promo__btn promo__btn_type_enter">Войти</button>
          </div>
        </div>

        <div className="promo__middle">
          <img className="promo__web-img" src={webLogo} alt="web planet"></img>

          <div className="promo__text-container">
            <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>

            <p className="promo__paragraph">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          </div>
        
        </div>

        <div className="promo__bottom">
          <button className="promo__more-btn">Узнать больше</button>
        </div>
      </div>
    </div>
  );
}

export default Promo;