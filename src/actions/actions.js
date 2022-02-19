import * as mainApi from '../APIs/mainApi'
import { 
    CHANGE_USER_DATA, 
    REMOVE_MOVIE, 
    TOGGLE_IS_CHECKED, 
    SET_CURRENT_USER, 
    SET_CURRENT_USER_MOVIES, 
    SET_IS_SUBMIT_FALSE, 
    SET_IS_SUBMIT_TRUE, 
    SET_LOGGED_IN, 
    SET_LOGGOUT, 
    SET_SAVED_MOVIE, 
    SET_IS_LOAD_TRUE,
    SET_IS_LOAD_FALSE
} from './types'


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
      .catch(console.log)
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
          .catch(console.log)
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
            .catch(console.log)
    }
}

export const setLoggedIn = () => ({ type: SET_LOGGED_IN })

export const setLoggout = () => ({ type: SET_LOGGOUT })




export const checkValidToken = (historyHookPush, location) => (dispatch) => {
    const token = localStorage.getItem('token')

    mainApi.getContent(token)
      .then(() => {
        dispatch(setLoggedIn())
        historyHookPush(location)
      })
      .catch(err => {
        if(!token) {
          localStorage.removeItem('token')
        }
        console.log(err)
      })
}


export const setChangeUserData = (name, email) => ({ type: CHANGE_USER_DATA, payload: { name, email } })

export const changeUserData = (name, email, { setFormValid, setSuccess, setFail }) => (dispatch) => {

    mainApi.changeUserData(name, email)
      .then((res) => {
        dispatch(setIsLoadFalse())
        setFormValid(false)
        setCurrentUser(res.data)
        dispatch(setChangeUserData(name, email))
        setSuccess(true)
    })
      .catch(err => {
        console.log(err)
        dispatch(setIsLoadFalse())
        setFail(true)
    })
}


export const setIsSubmitTrue = () => ({ type: SET_IS_SUBMIT_TRUE })

export const setIsSubmitFalse = () => ({ type: SET_IS_SUBMIT_FALSE })

export const toggleIsChecked = () => ({ type: TOGGLE_IS_CHECKED })

export const setIsLoadTrue = () => ({ type: SET_IS_LOAD_TRUE })

export const setIsLoadFalse = () => ({ type: SET_IS_LOAD_FALSE })