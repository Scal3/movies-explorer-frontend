import './MoviesCardList.css'
import MovieCard from '../MovieCard/MovieCard'
import * as filteredFunctions from '../../utils/filteredFunctions'
import { useEffect, useState } from 'react'
import * as MoviesApi from '../../utils/MoviesApi'

function MoviesCardList(props) {

  const [movieCards, setMovieCards] = useState([]); //Стэйт массива для карточек
  const [noMovies, setNoMovies] = useState('') // Стэйт для сообщения об отсутствии фильмов
  const [moreBtn, setMoreBtn] = useState(false)


  //  Фильтер всех фильмов
  const movies = filteredFunctions.filteredMovies(movieCards, props.keyWord)

  //  Фильтер короткометражек
  const shortMovies = filteredFunctions.filteredShortfilms(movieCards, props.keyWord)

  //  В зависимости от состояния чекбокса, выбираем какой фильтр использовать
  const result = props.checked ? shortMovies : movies

  // Обращаемся ко всем фильмам, если нажата кнопка поиска и устанавливаем состояние ошибки
  useEffect(() => {
    if(props.isSubmit) {
      MoviesApi.getMovies()
      .then((movies) =>{
        setMovieCards(movies)
        props.setIsLoad(false)
        if(result.length === 0) {
          setNoMovies('Фильмы не найдены')
          setMoreBtn(false)
        }
        if(result.length > 3) {
          setMoreBtn(true)
        }
      })
      .catch((err) => {
        console.log(err)
        setNoMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      })
    }
  }, [props.isSubmit])


  // Удаляем ошибку при очистке поля поиска
  useEffect(() => {
    if(props.keyWord) {
      setNoMovies('')
    }
  }, [props.keyWord])


    return (
      <div className="movies-card-list">
        <div className="movies-card-list__top">
        {props.isSubmit ? result.map((movie) => {
          return (
            <MovieCard key={movie.id} movie={movie} handleSaveMovie={props.handleSaveMovie} handleDeleteMovie={props.handleDeleteMovie}/>
            );
          }) : ''}
          {(noMovies) && <div className="saved-movies__message">{noMovies}</div>}
        </div>

        <div className="movies-card-list__bottom">
          {moreBtn ? <button className="movies-card-list__more-btn">Ещё</button> : null}
        </div>

      </div>
    );
  }
  
  export default MoviesCardList;


