import './Main.css'
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function Main() {
    return (
      <main className="main">
        <Header></Header>
        <SearchForm></SearchForm>
        <MoviesCardList></MoviesCardList>
        <Footer></Footer>
      </main>
    );
  }
  
  export default Main;
  