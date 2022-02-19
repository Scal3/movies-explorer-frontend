import './Main.css'
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';


function Main({
  isLoad, keyWord, setKeyWord, 
  checked, setChecked, 
  setIsLoad, movieCards }) {
    return (
      <main className="main">
        <Preloader isLoad={isLoad}></Preloader>
        <Header></Header>
        <SearchForm
          keyWord={keyWord}
          setKeyWord={setKeyWord}
          checked={checked}
          setChecked={setChecked}
          setIsLoad={setIsLoad}
        >
        </SearchForm>
        <MoviesCardList 
          movieCards={movieCards} 
          keyWord={keyWord} 
          setKeyWord={setKeyWord}
          checked={checked}
          setIsLoad={setIsLoad}
        >
        </MoviesCardList>
        <Footer></Footer>
      </main>
    );
  }
  
  export default Main;
  