import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import SavedMovies from "../SavedMovies/SavedMovies"
import SearchForm from "../SearchForm/SearchForm"


const SavedMoviesPage = () => {

    return (
      <>
        <Header />
        <SearchForm isSavedMovies/>
        <SavedMovies />
        <Footer />
      </>
    )
}

export default SavedMoviesPage