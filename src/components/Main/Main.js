import './Main.css'
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';


function Main(props) {
    return (
      <main className="main">
        <Preloader isLoad={props.isLoad}></Preloader>
        <Header></Header>
        <SearchForm
          keyWord={props.keyWord}
          setKeyWord={props.setKeyWord}
          setIsSubmit={props.setIsSubmit}
          checked={props.checked}
          setChecked={props.setChecked}
          setIsLoad={props.setIsLoad}>
        </SearchForm>
        <MoviesCardList 
          movieCards={props.movieCards} 
          keyWord={props.keyWord} 
          isSubmit={props.isSubmit} 
          checked={props.checked}
          setIsLoad={props.setIsLoad}
          handleSaveMovie={props.handleSaveMovie}
          handleDeleteMovie={props.handleDeleteMovie}
          savedMovieCards={props.savedMovieCards}>
        </MoviesCardList>
        <Footer></Footer>
      </main>
    );
  }
  
  export default Main;
  