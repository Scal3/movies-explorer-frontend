import { useState, useEffect } from 'react'
import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  const [keyWordError, setKeyWordError] = useState('') // Стэйт для ошибок ключевого слова
  const [disableSearchBtn, setDisableSearchBtn] = useState(false)

  //  Отменяем отображение фильмов, если нет ключевого слова
  useEffect(() => {
    if(props.keyWord.length < 1) {
      props.setIsSubmit(false)
      setDisableSearchBtn(false)
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
      setDisableSearchBtn(true)
    }
  }


    return (
        <form className="search-form" noValidate onSubmit={handleSubmit}>
          <div className="search-form__ears">
            <div className="search-form__container">
              <div className="search-form__middle">
              <div className="search-form__input-and-btn">
                <input className="search-form__input" placeholder="&#128269; Фильм" required value={props.keyWord} onChange={handleInput}></input>
                {props.isSavedMovie ? null : <button className={(disableSearchBtn ? 'search-form__btn search-form__btn_disabled' : 'search-form__btn')} type="submit">Найти</button>}
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
  