export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies'


// Получаем все данные
export function getMovies() {
    return fetch(`${BASE_URL}/`)
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