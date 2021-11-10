import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <form className="search-form">
          <div className="search-form__ears">
            <div className="search-form__container">
              <div className="search-form__middle">
              <div className="search-form__input-and-btn">
                <input className="search-form__input" placeholder="&#128269; Фильм" required></input>

                <button className="search-form__btn">Найти</button>
                <span className="search-form__line"></span>
              </div>
          
              <FilterCheckbox></FilterCheckbox>
              </div>
            </div>
          </div>
        </form>
    );
  }
  
  export default SearchForm;
  