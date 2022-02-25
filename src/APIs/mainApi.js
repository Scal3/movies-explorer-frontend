export const BASE_URL = 'https://api.hb.movies-explorer.nomoredomains.monster'

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
        console.log(res)
        return Promise.reject(`${res.status}`)
      }
    })
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
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        console.log(res)
        return Promise.reject(`${res.status}`)
      }
    })
    .then((res) => {
      const { token } = res
      if (token){
        localStorage.setItem('token', token);
        return token;
      }
    })
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
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        console.log(res)
        return Promise.reject(`${res.status}`)
      }
    })
  }


  //  Получение данных пользователя
  export function getUserInfo () {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        console.log(res)
        return Promise.reject(`${res.status}`)
      }
    })
  }


  //  Изменяем данные пользователя
  export function changeUserData (name, email) {
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        console.log(res)
        return Promise.reject(`${res.status}`)
      }
    })
  }


  // Список сохранённых фильмов
  export function getSavedMovies () {
    return fetch(`${BASE_URL}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        console.log(res)
        return Promise.reject(`${res.status}`)
      }
    })
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
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
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
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        console.log(res)
        return Promise.reject(`${res.status}`)
      }
    })
  }


  // Удаляем фильм
  export function deleteMovie(id) {

    return fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        console.log(res)
        return Promise.reject(`${res.status}`)
      }
    })
  }