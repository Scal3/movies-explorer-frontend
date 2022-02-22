import './App.css';

import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import AboutProject from '../AboutProject/AboutProject'
import Promo from '../Promo/Promo'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer'
import Main from '../Main/Main';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import SavedMovies from '../SavedMovies/SavedMovies';
import { isSavedMovie } from '../../utils/constants'
import { getUserData, checkValidToken } from '../../actions/actions';
import { getLoggedIn } from "../../selectors/selectors";


const App = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const isLoggedIn = useSelector(getLoggedIn) 

  //Проверка токена
  useEffect(() => {
    if (localStorage.getItem('token')){
      dispatch(checkValidToken(history.push, location))
    }
  }, [dispatch, history.push] )


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
        <Route path="/signup">
        {!isLoggedIn ? <Redirect to="/signup" /> : <Redirect to="/" />}
          <Register></Register>
        </Route>

        {/* Логин */}
        <Route path="/signin">
        {!isLoggedIn ? <Redirect to="/signin" /> : <Redirect to="/" />}
          <Login></Login>
        </Route>

        {/* Страница о проекте */}
        <Route path="/" exact>
          <Promo></Promo>
          <AboutProject></AboutProject>
          <Techs></Techs>
          <AboutMe></AboutMe>
          <Portfolio></Portfolio>
          <Footer></Footer>
        </Route>

        {/* Страница с фильмами */}
        <Route path="/movies">
          {isLoggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          <Main></Main>
        </Route>

        {/* Страница с сохранёнными фильмами */}
        <Route path="/saved-movies">
          {isLoggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/" />}
          <Header></Header>
          <SearchForm isSavedMovies></SearchForm>
          <SavedMovies></SavedMovies>
          <Footer></Footer>
        </Route>

        {/* Профиль */}
        <Route path="/profile">
          {isLoggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
          <Profile></Profile>
        </Route>

        {/* Ошибка 404 */}
        <Route path="*">
          <NotFound></NotFound>
        </Route>

      </Switch>
    </div>
  );
}

export default App;