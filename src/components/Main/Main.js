import './Main.css'
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';


const Main = ({ keyWord, setKeyWord, movieCards }) => {
    return (
      <main className="main">
        <Preloader></Preloader>
        <Header></Header>
        <SearchForm
          keyWord={keyWord}
          setKeyWord={setKeyWord}
        >
        </SearchForm>
        <MoviesCardList 
          movieCards={movieCards} 
          keyWord={keyWord} 
          setKeyWord={setKeyWord}
        >
        </MoviesCardList>
        <Footer></Footer>
      </main>
    );
  }
  
  export default Main;
  