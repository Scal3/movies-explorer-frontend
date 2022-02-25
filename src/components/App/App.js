import './App.css';

import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Main from '../Main/Main';
import ProjectPage from '../ProjectPage/ProjectPage';
import SavedMoviesPage from '../SavedMoviesPage/SavedMoviesPage'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { getUserData, checkValidToken } from '../../actions/actions';
import { getLoggedIn } from "../../selectors/selectors";


const App = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const isLoggedIn = useSelector(getLoggedIn) 
  console.log(history.location.pathname)

  //Проверка токена
  useEffect(() => {
    if (localStorage.getItem('token')){
      dispatch(checkValidToken(history.push, location))
    } 
  }, [dispatch] )


  // Если с токеном всё ок, грузим данные пользователя
  useEffect(() => {
    if(isLoggedIn) {
      dispatch(getUserData())
    }
  }, [isLoggedIn, dispatch] )


  return (
    <div className="app">
      <Switch>

        {/* Регистрация */}
        <ProtectedRoute
          component={Register} 
          isItAnAuthorizationComponent={true} 
          path="/signup" 
          redirectPath="/movies" 
        />

        {/* Логин */}
        <ProtectedRoute
          component={Login}
          isItAnAuthorizationComponent={true} 
          path="/signin" 
          redirectPath="/movies" 
        />

        {/* Страница о проекте */}
        <Route path="/" exact>
          <ProjectPage/>
        </Route>

        {/* Страница с фильмами */}
        <ProtectedRoute 
          component={Main} 
          isItAnAuthorizationComponent={false} 
          path="/movies" 
          redirectPath="/" 
        />

        {/* Страница с сохранёнными фильмами */}
        <ProtectedRoute 
          component={SavedMoviesPage} 
          isItAnAuthorizationComponent={false} 
          path="/saved-movies" 
          redirectPath="/" 
        />

        {/* Профиль */}
        <ProtectedRoute 
          component={Profile} 
          isItAnAuthorizationComponent={false} 
          path="/profile" 
          redirectPath="/" 
        />

        {/* Ошибка 404 */}
        <Route path="*">
          <NotFound/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;

