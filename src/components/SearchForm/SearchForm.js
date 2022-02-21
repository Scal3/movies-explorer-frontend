// import './SearchForm.css'

// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';

// import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import { entrBtn } from '../../utils/constants'
// import { setIsLoadTrue, setIsSubmitTrue, setIsSubmitFalse, setKeyWord } from '../../actions/actions';
// import { getIsSubmitValue } from '../../selectors/selectors';

// const SearchForm = ({ isSavedMovies }) => {

//   const dispatch = useDispatch()
//   const isSubmit = useSelector(getIsSubmitValue)

//   const [searchInput, setSearchInput] = useState('')
//   const [keyWordError, setKeyWordError] = useState('') // Стэйт для ошибок ключевого слова
//   const [disableSearchBtn, setDisableSearchBtn] = useState(false)

//   //  Отменяем отображение фильмов, если нет ключевого слова
//   useEffect(() => {
//     if(searchInput.length < 1) {
//       setDisableSearchBtn(false)
//       if(isSubmit) {
//         dispatch(setIsSubmitFalse())
//       }
//     }
//   }, [searchInput] )


//   //  Отменяем ввод клавиши entr 
//   useEffect(() => {
//     if (disableSearchBtn) {
//       document.addEventListener('keydown', (event) => {
//         if(event.keyCode === entrBtn) {
//           event.preventDefault();
//           return false;
//         }
//       })
//     }

//     return (
//       document.removeEventListener('keydown', (event) => {
//         if(event.keyCode === entrBtn) {
//           event.preventDefault();
//           return false;
//         }
//       })
//     )
//   }, [disableSearchBtn] )


//   //  Обрабатываем инпут
//   function handleInput(e) {
//     setSearchInput(e.target.value)
//   }

//   //  Обрабатываем сабмит
//   function handleSubmit(e) {
//     e.preventDefault()
//     if(searchInput.length < 1) {
//       setKeyWordError('Нужно ввести ключевое слово')
//     } else {
//       setKeyWordError('')
//       setDisableSearchBtn(true)
//       dispatch(setIsSubmitTrue())
//       dispatch(setIsLoadTrue())
//       dispatch(setKeyWord(searchInput))
//     }
//   }


//     return (
//         <form className="search-form" noValidate onSubmit={handleSubmit}>
//           <div className="search-form__ears">
//             <div className="search-form__container">
//               <div className="search-form__middle">
//               <div className="search-form__input-and-btn">
//                 <input className="search-form__input" placeholder="&#128269; Фильм" required value={searchInput} onChange={handleInput}></input>
//                 {
//                   isSavedMovies
//                    ? null 
//                    : <button className={(disableSearchBtn ? 'search-form__btn search-form__btn_disabled' : 'search-form__btn')} type="submit">Найти</button>
//                 }
//                 <span className="search-form__line"></span>
//               </div>
              
//               <FilterCheckbox></FilterCheckbox>
//               </div>
//             </div>
//             {(keyWordError) && <div className="saved-movies__message">{keyWordError}</div>}
//           </div>
//         </form>
//     );
//   }
  
//   export default SearchForm;
  





import './SearchForm.css'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { entrBtn } from '../../utils/constants'
import { setIsLoadTrue, setIsSubmitTrue, setIsSubmitFalse, setKeyWord } from '../../actions/actions';
import { getIsSubmitValue, getKeyWordValue } from '../../selectors/selectors';

const SearchForm = ({ isSavedMovies }) => {

  const dispatch = useDispatch()
  const isSubmit = useSelector(getIsSubmitValue)
  const keyWord = useSelector(getKeyWordValue)

  const [keyWordError, setKeyWordError] = useState('') // Стэйт для ошибок ключевого слова
  const [disableSearchBtn, setDisableSearchBtn] = useState(false)

  //  Отменяем отображение фильмов, если нет ключевого слова
  useEffect(() => {
    if(keyWord.length < 1) {
      setDisableSearchBtn(false)
      if(isSubmit) {
        dispatch(setIsSubmitFalse())
      }
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
    dispatch(setKeyWord(e.target.value))
  }

  //  Обрабатываем сабмит
  function handleSubmit(e) {
    e.preventDefault()
    if(keyWord.length < 1) {
      setKeyWordError('Нужно ввести ключевое слово')
    } else {
      setKeyWordError('')
      setDisableSearchBtn(true)
      dispatch(setIsSubmitTrue())
      dispatch(setIsLoadTrue())
      dispatch(setKeyWord(keyWord))
    }
  }


    return (
        <form className="search-form" noValidate onSubmit={handleSubmit}>
          <div className="search-form__ears">
            <div className="search-form__container">
              <div className="search-form__middle">
              <div className="search-form__input-and-btn">
                <input className="search-form__input" placeholder="&#128269; Фильм" required value={keyWord} onChange={handleInput}></input>
                {
                  isSavedMovies
                   ? null 
                   : <button className={(disableSearchBtn ? 'search-form__btn search-form__btn_disabled' : 'search-form__btn')} type="submit">Найти</button>
                }
                <span className="search-form__line"></span>
              </div>
              
              <FilterCheckbox></FilterCheckbox>
              </div>
            </div>
            {(keyWordError) && <div className="saved-movies__message">{keyWordError}</div>}
          </div>
        </form>
    );
  }
  
  export default SearchForm;
  