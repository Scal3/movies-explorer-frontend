import './MoviesCardList.css'
import MovieCard from '../MovieCard/MovieCard'

function MoviesCardList() {
    return (
      <div className="movies-card-list">
        <div className="movies-card-list__top">
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
        </div>

        <div className="movies-card-list__bottom">
          <button className="movies-card-list__more-btn">Ещё</button>
        </div>
      </div>
    );
  }
  
  export default MoviesCardList;
  