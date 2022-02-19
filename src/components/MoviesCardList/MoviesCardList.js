import './MoviesCardList.css'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import MovieCard from '../MovieCard/MovieCard'
import * as filteredFunctions from '../../utils/filteredFunctions'
import * as MoviesApi from '../../APIs/moviesApi'
import { numberOfCards, countAddCard } from '../../utils/constants'
import { getIsCheckedValue, getIsSubmitValue } from '../../selectors/selectors'
import { setIsLoadFalse, setIsSubmitFalse } from '../../actions/actions'

const MoviesCardList = ({ keyWord, setKeyWord }) => {

  const dispatch = useDispatch()
  const isSubmit = useSelector(getIsSubmitValue)
  const isChecked = useSelector(getIsCheckedValue)

  const [movieCards, setMovieCards] = useState([]) //Стэйт массива для карточек
  const [cardsLimit, setCardsLimit] = useState(numberOfCards) //Стэйт лимита прогрузки карточек
  const [isSuccess, setIsSuccess] = useState(true) //Стэйт успешного получения данных

  //  Отрисовываем по клику ещё три карточки
  const showMoreCards = () => {
    setCardsLimit((i) => i + countAddCard);
  };

  //  Фильтер всех фильмов
  const movies = filteredFunctions.filteredMovies(movieCards, keyWord)

  //  Фильтер короткометражек
  const shortMovies = filteredFunctions.filteredShortfilms(movieCards, keyWord)

  //  В зависимости от состояния чекбокса, выбираем какой фильтр использовать
  const result = isChecked ? shortMovies : movies

  // Обращаемся ко всем фильмам, если нажата кнопка поиска
  useEffect(() => {
    if(isSubmit) {
      MoviesApi.getMovies()
      .then((movies) =>{
        setMovieCards(movies)
        dispatch(setIsSubmitFalse())
        dispatch(setIsLoadFalse())
      })
      .catch((err) => {
        console.log(err)
        setIsSuccess(false)
      })
    }
  }, [isSubmit])

  //  Очищаем инпут формы поиска
  useEffect(() => {
    setKeyWord('')
  }, [])



  return (
    <div className="movies-card-list">
      {isSuccess ? (
        <>
          {isSubmit ? (
            result.length > 0 ? (
              <>
                <div className="movies-card-list__top">
                  {result
                    .map((movie) => (
                      <MovieCard
                        key={movie.id} 
                        movie={movie} 
                      />
                    )).slice(0, cardsLimit)}
                </div>
                <div className="movies-card-list__bottom">
                  {cardsLimit < result.length && (
                    <button className="movies-card-list__more-btn" onClick={showMoreCards}>Еще</button>
                  )}
                </div>
              </>
            ) : (
              <p className="movies-card-list__message">Ничего не найдено</p>
            )
          ) : (
            ""
          )}
        </>
      ) : (
        <p className="movies-card-list__message">
          Во время запроса произошла ошибка. Возможно, проблема с
          соединением или сервер недоступен. Подождите немного и попробуйте
          ещё раз.
        </p>
      )}
    </div>
  );
  }
  
  export default MoviesCardList;
