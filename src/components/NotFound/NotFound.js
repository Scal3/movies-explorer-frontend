import './NotFound.css';
import { useHistory } from 'react-router-dom';
import { goBack } from '../../utils/routerFunctions';


const NotFound = () => {
  const history = useHistory()

  return (
    <div className="not-found">
        <div className="not-found__top">
            <h1 className="not-found__code">404</h1>
            <p className="not-found__message">Страница не найдена!</p>
        </div>

        <button className="not-found__btn" onClick={() => goBack(history.goBack)}>Назад</button>
    </div>
  );
}

export default NotFound;
