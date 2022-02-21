import './Main.css'
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';


const Main = () => {
    return (
      <main className="main">
        <Preloader />
        <Header />
        <SearchForm />
        <MoviesCardList />
        <Footer />
      </main>
    );
  }
  
  export default Main;