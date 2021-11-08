import { Route, Switch } from 'react-router-dom';
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
import SavedMovies from '../SavedMovies/SavedMovies'


function App() {

  return (
    <div className="app">
      <Switch>

        {/* Регистрация */}
        <Route path="/signup">
          <Register></Register>
        </Route>

        {/* Логин */}
        <Route path="/signin">
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
          <Main></Main>
        </Route>

        {/* Страница с сохранёнными фильмами */}
        <Route path="/saved-movies">
          <Header></Header>
          <SearchForm></SearchForm>
          <SavedMovies></SavedMovies>
          <Footer></Footer>
        </Route>

        {/* Профиль */}
        <Route path="/profile">
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
