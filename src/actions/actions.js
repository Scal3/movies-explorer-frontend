import * as mainApi from '../APIs/mainApi'
import { REMOVE_MOVIE, SET_CURRENT_USER, SET_CURRENT_USER_MOVIES, SET_SAVED_MOVIE } from './types'


export const setCurrentUser = userData => ({ type: SET_CURRENT_USER, payload: { userData } })

export const setCurrentUserMovies = userMovies => ({ type: SET_CURRENT_USER_MOVIES, payload: { userMovies } })

export const getUserData = () => (dispatch, getState) => {
    Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
      .then(([userData, savedMoviesData]) => {
        dispatch(setCurrentUser(userData))
        return savedMoviesData.movies
      })
      .then(savedMoviesData => {
          const { id }  = getState().currentUser
          const currentUserMovies = savedMoviesData.filter(movie => {
            return movie.owner === id
          })
          dispatch(setCurrentUserMovies(currentUserMovies))
      })
}

export const setSavedMovie = movie => ({ type: SET_SAVED_MOVIE, payload: { movie } })

export  const saveMovie = (movie) => {
    const {
      country, director, duration,
      year, description, image,
      id, trailerLink, nameRU,
      nameEN,
    } = movie;

    return (dispatch) => {
        mainApi.saveMovie(
            {
              country, director, duration,
              year, description, image,
              id, trailerLink, nameRU,
              nameEN,
            }
          )
          .then((res) => {
            dispatch(setSavedMovie(res.movie))
            console.log(res.movie)
          })
          .catch((err) => console.log(err))
    }
        
}

export const removeMovie = (newMoviesArray) => ({ type: REMOVE_MOVIE, payload: { newMoviesArray } })

export const deleteMovie = (id) => {
    return (dispatch, getState) => {
        mainApi.deleteMovie(id)
            .then(() => {
                const newMoviesArray = getState().currentUsersMovies.filter((movie) => movie._id !== id)
                dispatch(removeMovie(newMoviesArray))
            })
            .catch((err) => console.log(err))
    }
}