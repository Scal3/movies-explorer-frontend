import './AboutMe.css'
import myPhoto from '../../image/IMG_0934.jpg'

function AboutMe() {
    return (
      <div className="about-me">
        <div className="about-me__ears">
          <div className="about-me__top about-project__top">
            <h2 className="about-me__heading about-project__heading">Студент</h2>
          </div>

          <div className="about-me__middle">
            <img className="about-me__student-pht" src={myPhoto} alt="фото студента"></img>

            <div className="about-me__middle-container">
              <h2 className="about-me__name">Герман</h2>

              <p className="about-me__paragraph">Фронтенд-разработчик, 21 год</p>

              <p className="about-me__paragraph">
                Я родился в Беларуси и живу в Минске, сразу после школы решил не спешить с поступлением и пошёл работать. 
                Накопил денег и вложил в своё образование. Так я и оказался на курсах Яндекс Практикум
                Я люблю создавать музыку, заниматься спортом, путешествовать, увлекаюсь киберспортом. 
                Кодинг окружал меня всю жизнь, а информатика была любимым предметом. 
                Уже тогда я пытался создавать сайты в блокноте, без сложной функциональности и это меня увлекало.
                Хорошо что теперь я умею гораздо больше)
                Я постоянно развиваюсь и мечтаю устроиться frontend-разработчиком
                P.S 
                Лерося love =) 
              </p>

              <div className="about-me__link-container">
                <a className="about-me__link" href="https://vk.com/b1ad3runner" target="_blank" rel="noreferrer">VK</a>

                <a className="about-me__link" href="https://github.com/Scal3" target="_blank" rel="noreferrer">Github</a>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    );
  }
  
  export default AboutMe;
  