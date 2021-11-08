import './FilterCheckbox.css'

function FilterCheckbox() {
    return (
      <div className="filter-checkbox">
        <input className="filter-checkbox__switch" id="switch" type="checkbox"></input>
        <label className="filter-checkbox__switch-label" htmlFor="switch">Короткометражки</label>
      </div>
    );
  }
  
  export default FilterCheckbox;
  