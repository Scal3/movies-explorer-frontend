import './MovieCard.css'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { deleteMovie, saveMovie } from '../../actions/actions';
import { getCurrentUser } from '../../selectors/selectors';

function MovieCard({
  savedMovieCards, movie, isSavedMovie, 
  handleDeleteMovie, handleSaveMovie}) {


  const dispatch = useDispatch()

  // Контекст с инфой пользователя
  const currentUser = useSelector(getCurrentUser)



  let buttonMobile // Кнопка лайка для мобильника
  let buttonDesctop // Кнопка лайка для десктопа
  const [isBtnActive, setIsBtnActive] = useState(false) // Стэйт для переключения класса кнопки лайка

  //  Массив сохранённых фильмов пользователя
  const currentUserMovieArray = savedMovieCards.filter(movie => {
    return movie.owner === currentUser.id
  })

  //  Поиск совпадения по nameRU между поисковым запросом и массивом сохранённых фильмов
  const findMovie = currentUserMovieArray.find(el => el.nameRU === movie.nameRU)

  //  Проверка на совпадение
  const chekLike = findMovie ? true : false

  // Обрабатываем клик по кнопке
  const handleClickButton = () => {
    setIsBtnActive(!isBtnActive)

    if (isSavedMovie === true) {
      dispatch(deleteMovie(movie._id))
      // handleDeleteMovie(movie._id)
    } else if (isSavedMovie === false) {
      handleSaveMovie(movie)
      // dispatch(saveMovie(movie))
    } else if (isBtnActive === false){
      handleSaveMovie(movie)
      // dispatch(saveMovie(movie))
    } else if (isBtnActive === true){
      // dispatch(deleteMovie(findMovie._id))
      handleDeleteMovie(findMovie._id)
    }
  }


  //  Если есть совпадение рисуем изменяем стэйт кнопки на тру
  useEffect(() => {
    if(chekLike) {
      setIsBtnActive(true)
    }
  }, [chekLike])


  if (isSavedMovie) {
    buttonMobile = <button className={'movie-card__button movie-card__button_type_mobile movie-card__button_type_saved'} onClick={handleClickButton}></button>
  } else {
    buttonMobile = <button className={(isBtnActive ? 'movie-card__button_type_active movie-card__button movie-card__button_type_mobile' : 'movie-card__button_type_inactive movie-card__button movie-card__button_type_mobile')} onClick={handleClickButton}></button>
  }

  if (isSavedMovie) {
    buttonDesctop = <button className={'movie-card__button movie-card__button_type_desctop movie-card__button_type_saved'} onClick={handleClickButton}></button>
  } else {
    buttonDesctop = <button className={(isBtnActive ? 'movie-card__button_type_active movie-card__button movie-card__button_type_desctop' : 'movie-card__button_type_inactive movie-card__button movie-card__button_type_desctop')} onClick={handleClickButton}></button>
  }


    return (
      <div className="movie-card">
        <div className="movie-card__top">
          <a className="movie-card__link" href={isSavedMovie ? movie.trailer : movie.trailerLink} target="_blank" rel="noreferrer">
            <img className="movie-card__image" alt="movie" src={isSavedMovie ? movie.image : `https://api.nomoreparties.co${movie.image.url}`}></img>
          </a>
        </div>

        <div className="movie-card__bottom">
          <div className="movie-card__heading-and-button">
          <a className="movie-card__link" href={isSavedMovie ? movie.trailer : movie.trailerLink} target="_blank" rel="noreferrer">
            <h2 className="movie-card__heading">{movie.nameRU}</h2>
          </a>
          {buttonMobile}
          </div>

          <p className="movie-card__duration">{movie.duration} минут</p>

          {buttonDesctop}
        </div>
      </div>
    );

  }
  
  export default MovieCard;