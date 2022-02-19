import './App.css';

import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import { getUserData, setLoggedIn, setLoggout, checkValidToken } from '../../actions/actions';
import { getLoggedIn } from "../../selectors/selectors";


function App() {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getLoggedIn) 



  const history = useHistory()
  const location = useLocation()
  const [keyWord, setKeyWord] = useState('') // Стэйт для ключевого слова
  const [isSubmit, setIsSubmit] = useState(false) // Стэйт отображения результата поиска
  const [checked, setChecked] = useState(false) // Стэйт для чекбокса "короткометражки"
  const [isLoad, setIsLoad] = useState(false) //Стэйт для прелоадера

  //Проверка токена
  useEffect(() => {
    if (localStorage.getItem('token')){
      dispatch(checkValidToken(history.push, location))
    }
  }, [history] )


  // Если с токеном всё ок, грузим данные пользователя
  useEffect(() => {
    if(isLoggedIn) {
      dispatch(getUserData())
    }
  }, [isLoggedIn] )


  //Переход основной сайт
  function goMain(){
    history.push('/movies')
  }

  //Переход на роут логина
  function switchToLogin(){
    history.push('/signin')
  }

  //Переход на роут регистрации
  function switchToRegistration(){
    history.push('/signup')
  }

  //Выход из системы
  function signOut(){
    localStorage.removeItem('token');
    history.push('/');
    dispatch(setLoggout())
  }



  return (
    <div className="app">
      <Switch>

        {/* Регистрация */}
        <Route path="/signup">
        {!isLoggedIn ? <Redirect to="/signup" /> : <Redirect to="/" />}
          <Register
            switchToLogin={switchToLogin}
            goMain={goMain}
          >
          </Register>
        </Route>

        {/* Логин */}
        <Route path="/signin">
        {!isLoggedIn ? <Redirect to="/signin" /> : <Redirect to="/" />}
          <Login 
            switchToRegistration={switchToRegistration} 
            goMain={goMain}
          >
           </Login>
        </Route>

        {/* Страница о проекте */}
        <Route path="/" exact>
          <Promo
            switchToRegistration={switchToRegistration} 
            switchToLogin={switchToLogin}
            goMain={goMain}
          >
          </Promo>
          <AboutProject></AboutProject>
          <Techs></Techs>
          <AboutMe></AboutMe>
          <Portfolio></Portfolio>
          <Footer></Footer>
        </Route>

        {/* Страница с фильмами */}
        <Route path="/movies">
          {isLoggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          <Main 
            keyWord={keyWord} 
            isSubmit={isSubmit} 
            checked={checked}
            setKeyWord={setKeyWord}
            setIsSubmit={setIsSubmit}
            setChecked={setChecked}
            isLoad={isLoad} 
            setIsLoad={setIsLoad}
          >
          </Main>
        </Route>

        {/* Страница с сохранёнными фильмами */}
        <Route path="/saved-movies">
          {isLoggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/" />}
          <Header></Header>
          <SearchForm
            keyWord={keyWord}
            setKeyWord={setKeyWord}
            setIsSubmit={setIsSubmit}
            setChecked={setChecked}
            setIsLoad={setIsLoad}
            checked={checked}
          >
          </SearchForm>
          <SavedMovies
            keyWord={keyWord} 
            isSubmit={isSubmit} 
            checked={checked}
            isSavedMovie={isSavedMovie}
            setKeyWord={setKeyWord}
          >
          </SavedMovies>
          <Footer></Footer>
        </Route>

        {/* Профиль */}
        <Route path="/profile">
          {isLoggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
          <Profile
            signOut={signOut} 
            isLoad={isLoad} 
            setIsLoad={setIsLoad} 
          >
          </Profile>
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

