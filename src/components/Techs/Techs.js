import './Techs.css'

function Techs() {
    return (
      <div className="techs about-project">
        <div className="techs__ears about-project__ears">
          <div className="techs__top  about-project__top">
            <h2 className="techs__heading about-project__heading">Технологии</h2>
          </div>

          <div className="techs__middle">
            <h2 className="techs__tech-heading">7 технологий</h2>

            <p className="techs__title">
              На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
          </div>

          <div className="techs__bottom">
            <div className="techs__grid-box">
              <div className="techs__grid-case">
                <p className="techs__grid-case-title">HTML</p>
              </div>

              <div className="techs__grid-case">
                <p className="techs__grid-case-title">CSS</p>
              </div>

              <div className="techs__grid-case">
                <p className="techs__grid-case-title">JS</p>
              </div>

              <div className="techs__grid-case">
                <p className="techs__grid-case-title">React</p>
              </div>

              <div className="techs__grid-case">
                <p className="techs__grid-case-title">Git</p>
              </div>

              <div className="techs__grid-case">
                <p className="techs__grid-case-title">Express.js</p>
              </div>

              <div className="techs__grid-case">
              <p className="techs__grid-case-title">MongoDB</p>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    );
  }
  
  export default Techs;
  