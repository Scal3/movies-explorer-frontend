export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies'


// Получаем все данные
const getMovies = () => {
    return fetch(`${BASE_URL}/`)
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        console.log(res)
        return Promise.reject(`${res.status}`)
      }
    })
}

export default getMovies