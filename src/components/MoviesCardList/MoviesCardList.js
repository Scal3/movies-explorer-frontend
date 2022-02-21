import './MoviesCardList.css'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import MovieCard from '../MovieCard/MovieCard'
import { filteredMovies, filteredShortfilms } from '../../utils/filteredFunctions'
import getMoviesApi from '../../APIs/getMoviesApi'
import { numberOfCards, countAddCard } from '../../utils/constants'
import { getIsCheckedValue, getIsSubmitValue, getKeyWordValue } from '../../selectors/selectors'
import { setIsLoadFalse, setKeyWord } from '../../actions/actions'

const MoviesCardList = () => {

  const dispatch = useDispatch()
  const isSubmit = useSelector(getIsSubmitValue)
  const isChecked = useSelector(getIsCheckedValue)
  const keyWord = useSelector(getKeyWordValue)

  const [result, setResult] = useState([])
  const [cardsLimit, setCardsLimit] = useState(numberOfCards) //Стэйт лимита прогрузки карточек
  const [isSuccess, setIsSuccess] = useState(true) //Стэйт успешного получения данных

  //  Отрисовываем по клику ещё три карточки
  const showMoreCards = () => {
    setCardsLimit((i) => i + countAddCard);
  };


  // Обращаемся ко всем фильмам, если нажата кнопка поиска
  useEffect(() => {
    if(isSubmit) {
      getMoviesApi()
      .then((movies) =>{
        const longMovies = filteredMovies(movies, keyWord)
        const shortMovies = filteredShortfilms(movies, keyWord)
        setResult(isChecked ? shortMovies : longMovies)
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
    dispatch(setKeyWord(''))
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
