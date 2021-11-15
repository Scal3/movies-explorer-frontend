import { useState, useEffect } from 'react'
import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  const [keyWordError, setKeyWordError] = useState('') // Стэйт для ошибок ключевого слова

  //  Отменяем отображение фильмов, если нет ключевого слова
  useEffect(() => {
    if(props.keyWord.length < 1) {
      props.setIsSubmit(false)
    }
  }, [props.keyWord] )


  //  Обрабатываем инпут
  function handleInput(e) {
    props.setKeyWord(e.target.value)
  }

  //  Обрабатываем сабмит
  function handleSubmit(e) {
    e.preventDefault()
    if(props.keyWord.length < 1) {
      setKeyWordError('Нужно ввести ключевое слово')
    } else {
      setKeyWordError('')
      props.setIsSubmit(true)
      props.setIsLoad(true)
    }
  }


    return (
        <form className="search-form" noValidate onSubmit={handleSubmit}>
          <div className="search-form__ears">
            <div className="search-form__container">
              <div className="search-form__middle">
              <div className="search-form__input-and-btn">
                <input className="search-form__input" placeholder="&#128269; Фильм" required value={props.keyWord} onChange={handleInput}></input>
                <button className="search-form__btn" type="submit">Найти</button>
                <span className="search-form__line"></span>
              </div>
          
              <FilterCheckbox checked={props.checked} setChecked={props.setChecked}></FilterCheckbox>
              </div>
            </div>
          </div>
          {(keyWordError) && <div className="saved-movies__message">{keyWordError}</div>}
        </form>
    );
  }
  
  export default SearchForm;
  