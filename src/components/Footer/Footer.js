import './Footer.css'

function Footer() {
    return (
      <footer className="footer">
        <div className="footer__ears">
          <div className="footer__top">
            <p className="footer__heading">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          </div>

          <div className="footer__bottom">
            <div className="footer__link-box">
              <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>

              <a className="footer__link" href="https://github.com/Scal3" target="_blank" rel="noreferrer">Github</a>

              <a className="footer__link" href="https://vk.com/b1ad3runner" target="_blank" rel="noreferrer">VK</a>
            </div>

            <p className="footer__copy">&#169; 2021</p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  