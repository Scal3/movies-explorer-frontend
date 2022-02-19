import './SearchForm.css'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { entrBtn } from '../../utils/constants'
import { setIsSubmitFalse, setIsSubmitTrue } from '../../actions/actions';

const SearchForm = ({
  keyWord, setKeyWord, 
  setIsLoad, checked, setChecked}) => {

  const dispatch = useDispatch()

  const [keyWordError, setKeyWordError] = useState('') // Стэйт для ошибок ключевого слова
  const [disableSearchBtn, setDisableSearchBtn] = useState(false)

  //  Отменяем отображение фильмов, если нет ключевого слова
  useEffect(() => {
    if(keyWord.length < 1) {
      dispatch(setIsSubmitFalse())
      setDisableSearchBtn(false)
    }
  }, [keyWord] )


  //  Отменяем ввод клавиши entr 
  useEffect(() => {
    if (disableSearchBtn) {
      document.addEventListener('keydown', (event) => {
        if(event.keyCode === entrBtn) {
          event.preventDefault();
          return false;
        }
      })
    }

    return (
      document.removeEventListener('keydown', (event) => {
        if(event.keyCode === entrBtn) {
          event.preventDefault();
          return false;
        }
      })
    )
  }, [disableSearchBtn] )


  //  Обрабатываем инпут
  function handleInput(e) {
    setKeyWord(e.target.value)
  }

  //  Обрабатываем сабмит
  function handleSubmit(e) {
    e.preventDefault()
    if(keyWord.length < 1) {
      setKeyWordError('Нужно ввести ключевое слово')
    } else {
      setKeyWordError('')
      dispatch(setIsSubmitTrue())
      setIsLoad(true)
      setDisableSearchBtn(true)
    }
  }


    return (
        <form className="search-form" noValidate onSubmit={handleSubmit}>
          <div className="search-form__ears">
            <div className="search-form__container">
              <div className="search-form__middle">
              <div className="search-form__input-and-btn">
                <input className="search-form__input" placeholder="&#128269; Фильм" required value={keyWord} onChange={handleInput}></input>
                <button className={(disableSearchBtn ? 'search-form__btn search-form__btn_disabled' : 'search-form__btn')} type="submit">Найти</button>
                <span className="search-form__line"></span>
              </div>
          
              <FilterCheckbox checked={checked} setChecked={setChecked}></FilterCheckbox>
              </div>
            </div>
            {(keyWordError) && <div className="saved-movies__message">{keyWordError}</div>}
          </div>
        </form>
    );
  }
  
  export default SearchForm;
  