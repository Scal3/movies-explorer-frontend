import './NotFound.css';
import { useHistory} from 'react-router-dom';


function NotFound() {
  const history = useHistory()

  // Переход на страницу назад
  function goBack(){
    history.goBack()
    history.goBack()
  }

  return (
    <div className="not-found">
        <div className="not-found__top">
            <h1 className="not-found__code">404</h1>
            <p className="not-found__message">Страница не найдена!</p>
        </div>

        <button className="not-found__btn" onClick={goBack}>Назад</button>
    </div>
  );
}

export default NotFound;
