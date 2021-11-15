import './FilterCheckbox.css'

function FilterCheckbox(props) {


  const handleClick = () => {
    props.setChecked(!props.checked)
  }

    return (
      <div className="filter-checkbox">
        <input className="filter-checkbox__switch" id="switch" type="checkbox" value={props.checked} onClick={handleClick}></input>
        <label className="filter-checkbox__switch-label" htmlFor="switch">Короткометражки</label>
      </div>
    );
  }
  
  export default FilterCheckbox;
  