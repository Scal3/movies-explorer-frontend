import './SavedMovies.css'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import MovieCard from '../MovieCard/MovieCard';
import { filteredMovies, filteredShortfilms } from '../../utils/filteredFunctions'
import { getCurrentUserMovies, getIsCheckedValue, getKeyWordValue } from '../../selectors/selectors';
import { setKeyWord } from '../../actions/actions';

const SavedMovies =() => {

  const dispatch = useDispatch()
  const currentUserMovies = useSelector(getCurrentUserMovies)
  const isChecked = useSelector(getIsCheckedValue)
  const keyWord = useSelector(getKeyWordValue)

  // Очищаем инпут формы поиска
  useEffect(() => {
    dispatch(setKeyWord(''))
  }, [])

  // Фильтер всех фильмов
  const movies = filteredMovies(currentUserMovies, keyWord)

  // Фильтер короткометражек
  const shortMovies = filteredShortfilms(currentUserMovies, keyWord)

  // В зависимости от состояния чекбокса, выбираем какой фильтр использовать
  const result = isChecked ? shortMovies : movies



  return (
    <div className="saved-movies">
      {currentUserMovies.length > 0 ? 
        (result.length > 0 ? (result.map((movie) => {
          return (
            <MovieCard
              isSavedMovie
              key={movie._id} 
              movie={movie} 
            /> 
            )
          }))
           : (<p className="movies-card-list__message">Ничего не найдено</p>)
        ) : <p className="movies-card-list__message">Сохранённых фильмов нет</p>}
      </div>
    );
  }
  
  export default SavedMovies;