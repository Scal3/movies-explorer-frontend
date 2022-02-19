import { 
    CHANGE_USER_DATA,
    REMOVE_MOVIE, 
    SET_CURRENT_USER, 
    SET_CURRENT_USER_MOVIES, 
    SET_LOGGED_IN, 
    SET_LOGGOUT, 
    SET_SAVED_MOVIE 
} from "../actions/types"

const initialState = {
    currentUser: null,
    currentUsersMovies: [],
    loggedIn: false,

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


        default: {
            return state
        }
    }
}

export default reducer