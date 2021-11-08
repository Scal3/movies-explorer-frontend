import './MovieCard.css'
import moviePic from '../../image/moviePic.png'

function MovieCard() {
    return (
      <div className="movie-card">
        <div className="movie-card__top">
        <img className="movie-card__image" alt="movie" src={moviePic}></img>
        </div>

        <div className="movie-card__bottom">
          <div className="movie-card__heading-and-button">
            <h2 className="movie-card__heading">33 слова о дизайне</h2>
            <button className="movie-card__button movie-card__button_type_mobile"></button>
          </div>

          <p className="movie-card__duration">1ч 42м</p>

          <button className="movie-card__button movie-card__button_type_desctop"></button>
        </div>
      </div>
    );
  }
  
  export default MovieCard;
  