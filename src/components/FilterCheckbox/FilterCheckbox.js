import './FilterCheckbox.css'

function FilterCheckbox({checked, setChecked}) {


  const handleClick = () => {
    setChecked(!checked)
  }

    return (
      <div className="filter-checkbox">
        <input className="filter-checkbox__switch" id="switch" type="checkbox" value={checked} onClick={handleClick}></input>
        <label className="filter-checkbox__switch-label" htmlFor="switch">Короткометражки</label>
      </div>
    );
  }
  
  export default FilterCheckbox;
  