import './MovieCard.css'
import { useState } from 'react'

function MovieCard(props) {

  const [isBtnActive, setIsBtnActive] = useState(false);

  let buttonMobile
  let buttonDesctop


  // Обрабатываем клик по кнопке
  const handleClickButton = () => {
    setIsBtnActive(!isBtnActive)

    if (props.isSavedMovie === true) {
      props.handleDeleteMovie(props.movie._id)
    } else if (props.isSavedMovie === false) {
      props.handleSaveMovie(props.movie)
    } else {
      props.handleSaveMovie(props.movie)
    }
  }


  if (props.isSavedMovie) {
    buttonMobile = <button className={'movie-card__button movie-card__button_type_mobile movie-card__button_type_saved'} onClick={handleClickButton}></button>
  } else {
    buttonMobile = <button className={(isBtnActive ? 'movie-card__button_type_active movie-card__button movie-card__button_type_mobile' : 'movie-card__button_type_inactive movie-card__button movie-card__button_type_mobile')} onClick={handleClickButton}></button>
  }

  if (props.isSavedMovie) {
    buttonDesctop = <button className={'movie-card__button movie-card__button_type_desctop movie-card__button_type_saved'} onClick={handleClickButton}></button>
  } else {
    buttonDesctop = <button className={(isBtnActive ? 'movie-card__button_type_active movie-card__button movie-card__button_type_desctop' : 'movie-card__button_type_inactive movie-card__button movie-card__button_type_desctop')} onClick={handleClickButton}></button>
  }
    return (
      <div className="movie-card">
        <div className="movie-card__top">
        <img className="movie-card__image" alt="movie" src={props.isSavedMovie ? props.movie.image : `https://api.nomoreparties.co${props.movie.image.url}`}></img>
        </div>

        <div className="movie-card__bottom">
          <div className="movie-card__heading-and-button">
            <h2 className="movie-card__heading">{props.movie.nameRU}</h2>
            {buttonMobile}
          </div>

          <p className="movie-card__duration">{props.movie.duration} минут</p>

          {buttonDesctop}
        </div>
      </div>
    );
  }
  
  export default MovieCard;
