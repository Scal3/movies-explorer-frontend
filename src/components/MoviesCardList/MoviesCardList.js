import './MoviesCardList.css'
import MovieCard from '../MovieCard/MovieCard'
import * as filteredFunctions from '../../utils/filteredFunctions'
import { useEffect, useState } from 'react'
import * as MoviesApi from '../../utils/MoviesApi'
import { numberOfCards, countAddCard } from '../../utils/constants'

function MoviesCardList(props) {

  const [movieCards, setMovieCards] = useState([]) //Стэйт массива для карточек
  const [cardsLimit, setCardsLimit] = useState(numberOfCards) //Стэйт лимита прогрузки карточек
  const [isSuccess, setIsSuccess] = useState(true) //Стэйт успешного получения данных

  //  Отрисовываем по клику ещё три карточки
  const showMoreCards = () => {
    setCardsLimit((i) => i + countAddCard);
  };

  //  Фильтер всех фильмов
  const movies = filteredFunctions.filteredMovies(movieCards, props.keyWord)

  //  Фильтер короткометражек
  const shortMovies = filteredFunctions.filteredShortfilms(movieCards, props.keyWord)

  //  В зависимости от состояния чекбокса, выбираем какой фильтр использовать
  const result = props.checked ? shortMovies : movies

  // Обращаемся ко всем фильмам, если нажата кнопка поиска
  useEffect(() => {
    if(props.isSubmit) {
      MoviesApi.getMovies()
      .then((movies) =>{
        setMovieCards(movies)
        props.setIsLoad(false)
      })
      .catch((err) => {
        console.log(err)
        setIsSuccess(false)
      })
    }
  }, [props.isSubmit])



  return (
    <div className="movies-card-list">
      {isSuccess ? (
        <>
          {props.isSubmit ? (
            result.length > 0 ? (
              <>
                <div className="movies-card-list__top">
                  {result
                    .map((movie) => (
                      <MovieCard
                        key={movie.id} 
                        movie={movie} 
                        handleSaveMovie={props.handleSaveMovie} 
                        handleDeleteMovie={props.handleDeleteMovie}
                        savedMovieCards={props.savedMovieCards}
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
