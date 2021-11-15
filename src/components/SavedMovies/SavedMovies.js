import './SavedMovies.css'
import MovieCard from '../MovieCard/MovieCard';
import { useEffect, useState } from 'react';
import * as filteredFunctions from '../../utils/filteredFunctions'

function SavedMovies(props) {

  const [noMovies, setNoMovies] = useState('') // Стэйт для сообщения об отсутствии фильмов
  const array = props.savedMovieCards.movies


  // Обращаемся к апи за сохранёнными фильмами
  useEffect(() => {
        if(!props.savedMovieCards.movies) {
          console.log('Фильмов нет')
          setNoMovies('Сохранённых фильмов нет')
        } else {
          setNoMovies('')
          }
  }, [])

  //  Для кнопки удаления фильма
  const isSavedMovie = true

  // Фильтер всех фильмов
  const movies = filteredFunctions.filteredMovies(array, props.keyWord)

  // Фильтер короткометражек
  const shortMovies = filteredFunctions.filteredShortfilms(array, props.keyWord)

  // В зависимости от состояния чекбокса, выбираем какой фильтр использовать
  const result = props.checked ? shortMovies : movies

  console.log(props.savedMovieCards.movies)

    return (
      <div className="saved-movies">
        
        {result.map((movie) => {
          return (
            <MovieCard isSavedMovie={isSavedMovie} key={movie._id} movie={movie} handleSaveMovie={props.handleSaveMovie} handleDeleteMovie={props.handleDeleteMovie}/>
            );
          })}
          {(noMovies) && <div className="saved-movies__message">{noMovies}</div>}
      </div>
    );
  }
  
  export default SavedMovies;
  
