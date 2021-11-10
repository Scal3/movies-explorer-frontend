import './NotFound.css';


function NotFound() {
  return (
    <div className="not-found">
        <div className="not-found__top">
            <h1 className="not-found__code">404</h1>
            <p className="not-found__message">Страница не найдена!</p>
        </div>

        <button className="not-found__btn">Назад</button>
    </div>
  );
}

export default NotFound;