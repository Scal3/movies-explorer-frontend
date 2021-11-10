import './SavedMovies.css'
import MovieCard from '../MovieCard/MovieCard';

function SavedMovies() {

  const isSavedMovie = true

    return (
      <div className="saved-movies">
        <MovieCard isSavedMovie={isSavedMovie}></MovieCard>
      </div>
    );
  }
  
  export default SavedMovies;
  