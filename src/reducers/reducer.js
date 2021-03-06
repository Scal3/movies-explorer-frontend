import { 
    CHANGE_USER_DATA,
    REMOVE_MOVIE, 
    SET_CURRENT_USER, 
    SET_CURRENT_USER_MOVIES, 
    TOGGLE_IS_CHECKED, 
    SET_IS_SUBMIT_FALSE, 
    SET_IS_SUBMIT_TRUE, 
    SET_LOGGED_IN, 
    SET_LOGGOUT, 
    SET_SAVED_MOVIE, 
    SET_IS_LOAD_TRUE,
    SET_IS_LOAD_FALSE,
    SET_KEY_WORD
} from "../actions/types"

const initialState = {
    currentUser: null,
    currentUsersMovies: [],
    loggedIn: false,
    isSubmit: false,
    isChecked: false,
    isLoad: false,
    keyWord: '',

}

const reducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case SET_CURRENT_USER: {
            const { userData } = payload

            return {
                ...state,
                currentUser: userData
            }
        }
        
        case SET_CURRENT_USER_MOVIES: {
            const { userMovies } = payload

            return {
                ...state,
                currentUsersMovies: userMovies
            }
        }

        case SET_SAVED_MOVIE: {
            const { movie } = payload

            return {
                ...state,
                currentUsersMovies: [movie, ...state.currentUsersMovies]
            }
        }

        case REMOVE_MOVIE: {
            const { newMoviesArray } = payload

            return {
                ...state,
                currentUsersMovies: newMoviesArray
            }
        }

        case SET_LOGGED_IN: {
            return {
                ...state,
                loggedIn: true
            }
        }

        case SET_LOGGOUT: {
            return {
                ...state,
                loggedIn: false
            }
        }

        case CHANGE_USER_DATA: {
            const { name, email } = payload
            const { id } = state.currentUser

            return {
                ...state,
                currentUser: { email, name, id }
            }
        }

        case SET_IS_SUBMIT_TRUE: {
            return {
                ...state,
                isSubmit: true
            }
        }

        case SET_IS_SUBMIT_FALSE: {
            return {
                ...state,
                isSubmit: false
            }
        }

        case TOGGLE_IS_CHECKED: {
            return {
                ...state,
                isChecked: !state.isChecked
            }
        }

        case SET_IS_LOAD_TRUE: {
            return {
                ...state,
                isLoad: true
            }
        }

        case SET_IS_LOAD_FALSE: {
            return {
                ...state,
                isLoad: false
            }
        }

        case SET_KEY_WORD: {
            const { keyWord } = payload

            return {
                ...state,
                keyWord: keyWord
            }
        }


        default: {
            return state
        }
    }
}

export default reducer