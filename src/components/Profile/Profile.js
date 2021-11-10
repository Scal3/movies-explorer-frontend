import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {
    return (
      <div className="profile">
        <Header></Header>

        <div className="profile__bottom">

          <div className="profile__info">
            <h1 className="profile__greeting">Привет, Аркадий!</h1>

            <div className="profile__user-info-container">
              <div className="profile__info-container">
                <p className="profile__info-title">Имя</p> <p className="profile__info-title">Аркадий</p>
              </div>

              <div className="profile__info-container">
                <p className="profile__info-title">E-mail</p> <p className="profile__info-title">arcadiy@gmail.com</p>
              </div>
            </div>

          </div>

          <div className="profile__buttons">
            <button className="profile__button">Редактировать</button>
            <button className="profile__button profile__button_type_exit">Выйти из аккаунта</button>
          </div>

        </div>

      </div>
    );
  }
  
  export default Profile;
  