import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import * as MainApi from '../../utils/MainApi';


function App() {
  const history = useHistory()
  const [loggedIn, setLoggedIn] = useState(false) //Стэйт для защиты роутов
  const [currentUser, setCurrentUser] = useState({})  //Стэйт данных пользователя
  const [savedMovieCards, setSavedMovieCards] = useState([]); //Стэйт массива для сохранённых фильмов
  const [keyWord, setKeyWord] = useState('') // Стэйт для ключевого слова
  const [isSubmit, setIsSubmit] = useState(false) // Стэйт отображения результата поиска
  const [checked, setChecked] = useState(false) // Стэйт для чекбокса "короткометражки"
  const [isLoad, setIsLoad] = useState(false) //Стэйт для прелоадера

  //Получаем данные пользователя и список карточек
  useEffect(() => {
    tokenCheck()
  }, [] )

  // Если с токеном всё ок, грузим данные пользователя
  useEffect(() => {
    if(loggedIn) {
      Promise.all([MainApi.getUserInfo(), MainApi.getSavedMovies()])
      .then(([userData, savedMoviesData]) => {
        setCurrentUser(userData)
        setSavedMovieCards(savedMoviesData)
      })
      .catch((e) => {
        console.log(`Ошибка загрузки данных: ${e}`)
      })
    }
  }, [loggedIn] )

  //Проверка токена
  function tokenCheck() {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token')
      MainApi.getContent(token)
      .then(res => {
        setLoggedIn(true)
        history.push('/movies')
      })
      .catch(err => {
        if(!token) {
          localStorage.removeItem('token')
        }
        console.log(err)
      })
    }
  }

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

  //Переход на страницу назад
  function goBack(){
    history.goBack()
  }

  //Выход из системы
  function signOut(){
    localStorage.removeItem('token');
    history.push('/signin');
  }

  // Сохраняем фильм 
  const handleSaveMovie = (movie) => {
    const {
      country, director, duration,
      year, description, image,
      id, trailerLink, nameRU,
      nameEN,
    } = movie;

    MainApi.saveMovie(
        {
          country, director, duration,
          year, description, image,
          id, trailerLink, nameRU,
          nameEN,
        }
      )
      .then((res) => {
        setSavedMovieCards([res, ...savedMovieCards.movies])
      })
  }

  // Удаляем фильм
  const handleDeleteMovie = (id) => {
    MainApi.deleteMovie(id)
      .then((res) => {
        setSavedMovieCards(savedMovieCards.movies.filter((item) => item._id !== id));
      })
  }


  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>

        {/* Регистрация */}
        <Route path="/signup">
          <Register
            switchToLogin={switchToLogin}
            goMain={goMain}>
          </Register>
        </Route>

        {/* Логин */}
        <Route path="/signin">
          <Login 
            switchToRegistration={switchToRegistration} 
            goMain={goMain}>
           </Login>
        </Route>

        {/* Страница о проекте */}
        <Route path="/" exact>
          <Promo 
            loggedIn={loggedIn} 
            switchToRegistration={switchToRegistration} 
            switchToLogin={switchToLogin}>
          </Promo>
          <AboutProject></AboutProject>
          <Techs></Techs>
          <AboutMe></AboutMe>
          <Portfolio></Portfolio>
          <Footer></Footer>
        </Route>

        {/* Страница с фильмами */}
        <Route path="/movies">
          {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
          <Main 
            keyWord={keyWord} 
            isSubmit={isSubmit} 
            checked={checked}
            setKeyWord={setKeyWord}
            setIsSubmit={setIsSubmit}
            setChecked={setChecked}
            isLoad={isLoad} 
            setIsLoad={setIsLoad}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            savedMovieCards={savedMovieCards}>
          </Main>
        </Route>

        {/* Страница с сохранёнными фильмами */}
        <Route path="/saved-movies">
          {loggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/signin" />}
          <Header></Header>
          <SearchForm
            keyWord={keyWord}
            setKeyWord={setKeyWord}
            setIsSubmit={setIsSubmit}
            setChecked={setChecked}>
          </SearchForm>
          <SavedMovies
            savedMovieCards={savedMovieCards}
            keyWord={keyWord} 
            isSubmit={isSubmit} 
            checked={checked}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}>
          </SavedMovies>
          <Footer></Footer>
        </Route>

        {/* Профиль */}
        <Route path="/profile">
          {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/signin" />}
          <Profile signOut={signOut} isLoad={isLoad} setIsLoad={setIsLoad}></Profile>
        </Route>

        {/* Ошибка 404 */}
        <Route path="*" goBack={goBack}>
          <NotFound></NotFound>
        </Route>

      </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
