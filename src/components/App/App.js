// import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import './App.css';
// import Register from '../Register/Register';
// import Login from '../Login/Login';
// import Profile from '../Profile/Profile';
// import NotFound from '../NotFound/NotFound';
// import AboutProject from '../AboutProject/AboutProject'
// import Promo from '../Promo/Promo'
// import Techs from '../Techs/Techs'
// import AboutMe from '../AboutMe/AboutMe'
// import Portfolio from '../Portfolio/Portfolio';
// import Footer from '../Footer/Footer'
// import Main from '../Main/Main';
// import Header from '../Header/Header';
// import SearchForm from '../SearchForm/SearchForm';
// import SavedMovies from '../SavedMovies/SavedMovies';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext'
// import * as MainApi from '../../APIs/mainApi';
// import { isSavedMovie } from '../../utils/constants'


// function App() {
//   const history = useHistory()
//   const location = useLocation()
//   const [loggedIn, setLoggedIn] = useState(false) // Стэйт для защиты роутов
//   const [currentUser, setCurrentUser] = useState({})  // Стэйт данных пользователя
//   const [savedMovieCards, setSavedMovieCards] = useState([]); // Стэйт массива для сохранённых фильмов
//   const [keyWord, setKeyWord] = useState('') // Стэйт для ключевого слова
//   const [isSubmit, setIsSubmit] = useState(false) // Стэйт отображения результата поиска
//   const [checked, setChecked] = useState(false) // Стэйт для чекбокса "короткометражки"
//   const [isLoad, setIsLoad] = useState(false) //Стэйт для прелоадера

//   //Проверка токена
//   useEffect(() => {
//     if (localStorage.getItem('token')){
//       const token = localStorage.getItem('token')
//       MainApi.getContent(token)
//       .then(res => {
//         setLoggedIn(true)
//         history.push(location)
//       })
//       .catch(err => {
//         if(!token) {
//           localStorage.removeItem('token')
//         }
//         console.log(err)
//       })
//     }
//   }, [history] )


//   // Если с токеном всё ок, грузим данные пользователя
//   useEffect(() => {
//     if(loggedIn) {
//       Promise.all([MainApi.getUserInfo(), MainApi.getSavedMovies()])
//       .then(([userData, savedMoviesData]) => {
//         setCurrentUser(userData)
//         setSavedMovieCards(savedMoviesData.movies)
//       })

      

//       .catch((e) => {
//         console.log(`Ошибка загрузки данных: ${e}`)
//       })
//     }
//   }, [loggedIn] )


//   //Переход основной сайт
//   function goMain(){
//     history.push('/movies')
//   }

//   //Переход на роут логина
//   function switchToLogin(){
//     history.push('/signin')
//   }

//   //Переход на роут регистрации
//   function switchToRegistration(){
//     history.push('/signup')
//   }

//   //Выход из системы
//   function signOut(){
//     localStorage.removeItem('token');
//     history.push('/');
//     setLoggedIn(false)
//   }

//   // Сохраняем фильм 
//   const handleSaveMovie = (movie) => {
//     const {
//       country, director, duration,
//       year, description, image,
//       id, trailerLink, nameRU,
//       nameEN,
//     } = movie;

//     MainApi.saveMovie(
//         {
//           country, director, duration,
//           year, description, image,
//           id, trailerLink, nameRU,
//           nameEN,
//         }
//       )
//       .then((res) => {
//         setSavedMovieCards([res.movie, ...savedMovieCards])
//       })
//       .catch((err) => console.log(err))
//   }
  
//   // Удаляем фильм
//   const handleDeleteMovie = (id) => {
//     MainApi.deleteMovie(id)
//       .then((res) => {
//         setSavedMovieCards(savedMovieCards.filter((item) => item._id !== id));
//       })
//       .catch((err) => console.log(err))
//   }


//   return (
//     <div className="app">
//       <CurrentUserContext.Provider value={currentUser}>
//       <Switch>

//         {/* Регистрация */}
//         <Route path="/signup">
//         {!loggedIn ? <Redirect to="/signup" /> : <Redirect to="/" />}
//           <Register
//             switchToLogin={switchToLogin}
//             goMain={goMain}
//             setLoggedIn={setLoggedIn}>
//           </Register>
//         </Route>

//         {/* Логин */}
//         <Route path="/signin">
//         {!loggedIn ? <Redirect to="/signin" /> : <Redirect to="/" />}
//           <Login 
//             switchToRegistration={switchToRegistration} 
//             goMain={goMain}
//             setLoggedIn={setLoggedIn}>
//            </Login>
//         </Route>

//         {/* Страница о проекте */}
//         <Route path="/" exact>
//           <Promo 
//             loggedIn={loggedIn} 
//             switchToRegistration={switchToRegistration} 
//             switchToLogin={switchToLogin}
//             goMain={goMain}>
//           </Promo>
//           <AboutProject></AboutProject>
//           <Techs></Techs>
//           <AboutMe></AboutMe>
//           <Portfolio></Portfolio>
//           <Footer></Footer>
//         </Route>

//         {/* Страница с фильмами */}
//         <Route path="/movies">
//           {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
//           <Main 
//             keyWord={keyWord} 
//             isSubmit={isSubmit} 
//             checked={checked}
//             setKeyWord={setKeyWord}
//             setIsSubmit={setIsSubmit}
//             setChecked={setChecked}
//             isLoad={isLoad} 
//             setIsLoad={setIsLoad}
//             handleSaveMovie={handleSaveMovie}
//             handleDeleteMovie={handleDeleteMovie}
//             savedMovieCards={savedMovieCards}>
//           </Main>
//         </Route>

//         {/* Страница с сохранёнными фильмами */}
//         <Route path="/saved-movies">
//           {loggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/" />}
//           <Header></Header>
//           <SearchForm
//             keyWord={keyWord}
//             setKeyWord={setKeyWord}
//             setIsSubmit={setIsSubmit}
//             setChecked={setChecked}
//             setIsLoad={setIsLoad}
//             checked={checked}>
//           </SearchForm>
//           <SavedMovies
//             savedMovieCards={savedMovieCards}
//             keyWord={keyWord} 
//             isSubmit={isSubmit} 
//             checked={checked}
//             handleSaveMovie={handleSaveMovie}
//             handleDeleteMovie={handleDeleteMovie}
//             isSavedMovie={isSavedMovie}
//             setKeyWord={setKeyWord}>
//           </SavedMovies>
//           <Footer></Footer>
//         </Route>

//         {/* Профиль */}
//         <Route path="/profile">
//           {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
//           <Profile signOut={signOut} isLoad={isLoad} setIsLoad={setIsLoad} setCurrentUser={setCurrentUser}></Profile>
//         </Route>

//         {/* Ошибка 404 */}
//         <Route path="*">
//           <NotFound></NotFound>
//         </Route>

//       </Switch>
//       </CurrentUserContext.Provider>
//     </div>
//   );
// }

// export default App;










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
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import * as MainApi from '../../APIs/mainApi';
import { isSavedMovie } from '../../utils/constants'
import { getUserData, setLoggedIn, setLoggout } from '../../actions/actions';
import { loggedIn } from "../../selectors/selectors";


function App() {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(loggedIn) 



  const history = useHistory()
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState({})  // Стэйт данных пользователя
  const [savedMovieCards, setSavedMovieCards] = useState([]); // Стэйт массива для сохранённых фильмов
  const [keyWord, setKeyWord] = useState('') // Стэйт для ключевого слова
  const [isSubmit, setIsSubmit] = useState(false) // Стэйт отображения результата поиска
  const [checked, setChecked] = useState(false) // Стэйт для чекбокса "короткометражки"
  const [isLoad, setIsLoad] = useState(false) //Стэйт для прелоадера

  //Проверка токена
  useEffect(() => {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token')
      MainApi.getContent(token)
      .then(res => {
        dispatch(setLoggedIn())
        history.push(location)
      })
      .catch(err => {
        if(!token) {
          localStorage.removeItem('token')
        }
        console.log(err)
      })
    }
  }, [history] )


  // Если с токеном всё ок, грузим данные пользователя
  useEffect(() => {
    if(true) {
      Promise.all([MainApi.getUserInfo(), MainApi.getSavedMovies()])
      .then(([userData, savedMoviesData]) => {
        setCurrentUser(userData)
        setSavedMovieCards(savedMoviesData.movies)


        dispatch(getUserData())
      })
      .catch((e) => {
        console.log(`Ошибка загрузки данных: ${e}`)
      })
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
        setSavedMovieCards([res.movie, ...savedMovieCards])
      })
      .catch((err) => console.log(err))
  }
  
  // Удаляем фильм
  const handleDeleteMovie = (id) => {
    MainApi.deleteMovie(id)
      .then((res) => {
        setSavedMovieCards(savedMovieCards.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err))
  }


  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
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
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            savedMovieCards={savedMovieCards}
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
            savedMovieCards={savedMovieCards}
            keyWord={keyWord} 
            isSubmit={isSubmit} 
            checked={checked}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
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
            setCurrentUser={setCurrentUser}
          >
          </Profile>
        </Route>

        {/* Ошибка 404 */}
        <Route path="*">
          <NotFound></NotFound>
        </Route>

      </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

