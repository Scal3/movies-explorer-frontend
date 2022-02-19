import './SavedMovies.css'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import MovieCard from '../MovieCard/MovieCard';
import * as filteredFunctions from '../../utils/filteredFunctions'
import { getCurrentUser, getCurrentUserMovies } from '../../selectors/selectors';

function SavedMovies({
  keyWord, checked, 
  isSavedMovie,
  isSubmit, setKeyWord}) {


  const currentUser = useSelector(getCurrentUser)
  const currentUserMovies = useSelector(getCurrentUserMovies)

  const submit = isSubmit ? keyWord : '' // Если нажата кнопка поиска, тогда передаём ключевое слово


  // Очищаем инпут формы поиска
  useEffect(() => {
    setKeyWord('')
  }, [])

  // Фильтер всех фильмов
  const movies = filteredFunctions.filteredMovies(currentUserMovies, submit)

  // Фильтер короткометражек
  const shortMovies = filteredFunctions.filteredShortfilms(currentUserMovies, submit)

  // В зависимости от состояния чекбокса, выбираем какой фильтр использовать
  const result = checked ? shortMovies : movies



  return (
    <div className="saved-movies">
      {currentUserMovies.length > 0 ? 
        (result.length > 0 ? (result.map((movie) => {
          return (
            (movie.owner === currentUser.id ? 
              <MovieCard
                isSavedMovie={isSavedMovie} 
                key={movie._id} 
                movie={movie} 
              /> : null)
            )
          }))
           : (<p className="movies-card-list__message">Ничего не найдено</p>)
        ) : <p className="movies-card-list__message">Сохранённых фильмов нет</p>}
      </div>
    );
  }
  
  export default SavedMovies;