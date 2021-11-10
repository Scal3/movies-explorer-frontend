import './AboutProject.css'


function AboutProject() {
    return (
      <div className="about-project">
        <div className="about-project__ears">
          <div className="about-project__top">
            <h2 className="about-project__heading">О проекте</h2>
          </div>

          <div className="about-project__middle">
            <div className="about-project__description-container">
              <h2 className="about-project__heading">Дипломный проект включал 5 этапов</h2>

              <p className="about-project__paragraph">
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
              </p>
            </div>

            <div className="about-project__description-container">
              <h2 className="about-project__heading">На выполнение диплома ушло 5 недель</h2>

              <p className="about-project__paragraph">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
              </p>
            </div>
          </div>

          <div className="about-project__bottom">

            <div className="about-project__grid-case about-project__grid-case_color_black">
              <p className="about-project__grid-case-title about-project__grid-case-title_color_white">1 неделя</p>
            </div>

            <div className="about-project__grid-case about-project__grid-case_color_gray">
              <p className="about-project__grid-case-title">4 недели</p>
            </div>

            <div className="about-project__grid-case">
              <p className="about-project__grid-case-title about-project__grid-case-title_type_desctop">Back-end</p>
            </div>

            <div className="about-project__grid-case">
              <p className="about-project__grid-case-title about-project__grid-case-title_type_desctop">Front-end</p>
            </div>

          </div>
        </div>
      </div>
    );
  }
  
  export default AboutProject;
  