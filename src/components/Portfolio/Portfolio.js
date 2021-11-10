import linkArrow from '../../image/linkArrow.svg'
import './Portfolio.css'

function Portfolio() {
    return (
      <div className="portfolio">
        <div className="portfolio__ears">
          <p className="portfolio__heading">Портфолио</p>

          <div className="portfolio__link-container">
            <div className="portfolio__link-and-arrow">
              <a className="portfolio__link" href="https://github.com/Scal3/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a> 

              <img className="portfolio__arrow-img" src={linkArrow} alt="arrow"></img>
            </div>

            <div className="portfolio__link-and-arrow portfolio__link-and-arrow_border">
              <a className="portfolio__link" href="https://github.com/Scal3/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт</a> 

              <img className="portfolio__arrow-img" src={linkArrow} alt="arrow"></img>
            </div>

            <div className="portfolio__link-and-arrow">
              <a className="portfolio__link" href="https://github.com/Scal3/react-mesto-api-full" target="_blank" rel="noreferrer">Одностраничное приложение</a> 

              <img className="portfolio__arrow-img" src={linkArrow} alt="arrow"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Portfolio;
  