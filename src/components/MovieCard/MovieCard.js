import './MovieCard.css'
import { useState, useContext, useEffect } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function MovieCard(props) {

  let buttonMobile // Кнопка лайка для мобильника
  let buttonDesctop // Кнопка лайка для десктопа
  const [isBtnActive, setIsBtnActive] = useState(false) // Стэйт для переключения класса кнопки лайка

  const currentUser = useContext(CurrentUserContext);  // Контекст с инфой пользователя

  //  Массив сохранённых фильмов пользователя
  const currentUserMovieArray = props.savedMovieCards.filter(movie => {
    return movie.owner === currentUser.id
  })

  //  Поиск совпадения по nameRU между поисковым запросом и массивом сохранённых фильмов
  const findMovie = currentUserMovieArray.find(el => el.nameRU === props.movie.nameRU)

  //  Проверка на совпадение
  const chekLike = findMovie ? true : false

  // Обрабатываем клик по кнопке
  const handleClickButton = () => {
    setIsBtnActive(!isBtnActive)

    if (props.isSavedMovie === true) {
      props.handleDeleteMovie(props.movie._id)
    } else if (props.isSavedMovie === false) {
      props.handleSaveMovie(props.movie)
    } else if (isBtnActive === false){
      props.handleSaveMovie(props.movie)
    } else if (isBtnActive === true){
      props.handleDeleteMovie(findMovie._id)
    }
  }


  //  Если есть совпадение рисуем изменяем стэйт кнопки на тру
  useEffect(() => {
    if(chekLike) {
      setIsBtnActive(true)
    }
  }, [chekLike])


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
          <a className="movie-card__link" href={props.isSavedMovie ? props.movie.trailer : props.movie.trailerLink} target="_blank" rel="noreferrer">
            <img className="movie-card__image" alt="movie" src={props.isSavedMovie ? props.movie.image : `https://api.nomoreparties.co${props.movie.image.url}`}></img>
          </a>
        </div>

        <div className="movie-card__bottom">
          <div className="movie-card__heading-and-button">
          <a className="movie-card__link" href={props.isSavedMovie ? props.movie.trailer : props.movie.trailerLink} target="_blank" rel="noreferrer">
            <h2 className="movie-card__heading">{props.movie.nameRU}</h2>
          </a>
          {buttonMobile}
          </div>

          <p className="movie-card__duration">{props.movie.duration} минут</p>

          {buttonDesctop}
        </div>
      </div>
    );

  }
  
  export default MovieCard;