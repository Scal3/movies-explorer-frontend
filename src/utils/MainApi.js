export const BASE_URL = 'https://api.hb.movies-explorer.nomoredomains.monster'
const userToken = localStorage.getItem('token');

//  Регистрация
export function registration (password, email, name) {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        email,
        name
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        return console.log(res.status)
      }
    })
    .then(res => res)
    .catch(err => console.log(err))
  }
  
  
  //  Авторизация
  export function authorization (password, email) {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(res => res.json())
    .then((res) => {
      const { token } = res
      if (token){
        localStorage.setItem('token', token);
        return token;
      }
    })
    .catch(err => console.log(err))
  }; 
  
  
  //  Проверка токена
  export function getContent (token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
  }


  //  Получение данных пользователя
  export function getUserInfo () {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${userToken}`
      }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
  }


  //  Изменяем данные пользователя
  export function changeUserData ({name, email}) {
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${userToken}`
      },
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
    .then(res => res.json())
      .then(data => data)
    .catch(err => console.log(err))
  }


  // Список сохранённых фильмов
  export function getSavedMovies () {
    return fetch(`${BASE_URL}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${userToken}`
      }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
  }


  // Добавляем фильм к себе
  export function saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    id,
    trailerLink,
    nameRU,
    nameEN,
  }) {

    let thumbnailUrl
    if (image.formats !== undefined) {
      thumbnailUrl = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;
    }

    const imageUrl = `https://api.nomoreparties.co${image.url}`;


    return fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: imageUrl,
        trailer: trailerLink,
        thumbnail: thumbnailUrl,
        movieId: id,
        nameRU: nameRU,
        nameEN: nameEN,
      }),
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
  }


  // Удаляем фильм
  export function deleteMovie(id) {

    return fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`,
      },
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
  }