import './FilterCheckbox.css'

import { useSelector, useDispatch } from 'react-redux';

import { getIsCheckedValue } from '../../selectors/selectors';
import { toggleIsChecked } from '../../actions/actions'

const FilterCheckbox = () => {

  const isChecked = useSelector(getIsCheckedValue)
  const dispatch = useDispatch()


  const handleClick = () => {
    dispatch(toggleIsChecked())
  }

    return (
      <div className="filter-checkbox">
        <input className="filter-checkbox__switch" id="switch" type="checkbox" value={isChecked} onClick={handleClick}></input>
        <label className="filter-checkbox__switch-label" htmlFor="switch">Короткометражки</label>
      </div>
    );
  }
  
  export default FilterCheckbox;
  