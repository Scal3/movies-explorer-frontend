import './SavedMovies.css'
import MovieCard from '../MovieCard/MovieCard';
import * as filteredFunctions from '../../utils/filteredFunctions'
import { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function SavedMovies({
  savedMovieCards, keyWord, checked, 
  isSavedMovie, handleSaveMovie, handleDeleteMovie, 
  isSubmit, setKeyWord}) {

  const currentUser = useContext(CurrentUserContext);  // Контекст с инфой пользователя
  const [currentMovies, setCurrentMovies] = useState([]); // Стэйт сохранённых фильмов
  const submit = isSubmit ? keyWord : '' // Если нажата кнопка поиска, тогда передаём ключевое слово

  // При изменении массива сохранённых фильмов переопределяем состояние
  useEffect(() => {
    setCurrentMovies(savedMovieCards)
  }, [savedMovieCards])

  // Очищаем инпут формы поиска
  useEffect(() => {
    setKeyWord('')
  }, [])

  // Массив фильмов сохранённых текущим пользователем
  const currentUserMovieArray = currentMovies.filter(movie => {
    return movie.owner === currentUser.id
  })

  // Фильтер всех фильмов
  const movies = filteredFunctions.filteredMovies(currentUserMovieArray, submit)

  // Фильтер короткометражек
  const shortMovies = filteredFunctions.filteredShortfilms(currentUserMovieArray, submit)

  // В зависимости от состояния чекбокса, выбираем какой фильтр использовать
  const result = checked ? shortMovies : movies



  return (
    <div className="saved-movies">
      {currentUserMovieArray.length > 0 ? 
        (result.length > 0 ? (result.map((movie) => {
          return (
            (movie.owner === currentUser.id ? 
              <MovieCard
                isSavedMovie={isSavedMovie} 
                key={movie._id} movie={movie} 
                handleSaveMovie={handleSaveMovie} 
                handleDeleteMovie={handleDeleteMovie}
                savedMovieCards={savedMovieCards}
              /> : null)
            )
          }))
           : (<p className="movies-card-list__message">Ничего не найдено</p>)
        ) : <p className="movies-card-list__message">Сохранённых фильмов нет</p>}
      </div>
    );
  }
  
  export default SavedMovies;