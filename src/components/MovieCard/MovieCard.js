import './MovieCard.css'
import moviePic from '../../image/moviePic.jpg'
import { useState } from 'react'

function MovieCard(props) {

  const [isBtnActive, setIsBtnActive] = useState(false);

  let buttonMobile
  let buttonDesctop

  const changeButtonState = () => {
    setIsBtnActive(!isBtnActive)
  }

  if (props.isSavedMovie) {
    buttonMobile = <button className={'movie-card__button movie-card__button_type_mobile movie-card__button_type_saved'} onClick={changeButtonState}></button>
  } else {
    buttonMobile = <button className={(isBtnActive ? 'movie-card__button_type_active movie-card__button movie-card__button_type_mobile' : 'movie-card__button_type_inactive movie-card__button movie-card__button_type_mobile')} onClick={changeButtonState}></button>
  }

  if (props.isSavedMovie) {
    buttonDesctop = <button className={'movie-card__button movie-card__button_type_desctop movie-card__button_type_saved'} onClick={changeButtonState}></button>
  } else {
    buttonDesctop = <button className={(isBtnActive ? 'movie-card__button_type_active movie-card__button movie-card__button_type_desctop' : 'movie-card__button_type_inactive movie-card__button movie-card__button_type_desctop')} onClick={changeButtonState}></button>
  }

    return (
      <div className="movie-card">
        <div className="movie-card__top">
        <img className="movie-card__image" alt="movie" src={moviePic}></img>
        </div>

        <div className="movie-card__bottom">
          <div className="movie-card__heading-and-button">
            <h2 className="movie-card__heading">33 слова о дизайне</h2>
            {buttonMobile}
          </div>

          <p className="movie-card__duration">1ч 42м</p>

          {buttonDesctop}
        </div>
      </div>
    );
  }
  
  export default MovieCard;
