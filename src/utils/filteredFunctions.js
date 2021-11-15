export function filteredMovies(movieArray, keyWord) {
    const filteredMovies = movieArray.filter(movie => {
        return movie.nameRU.toLowerCase().includes(keyWord.toLowerCase())
      })
      return filteredMovies

}


export function filteredShortfilms(movieArray, keyWord) {
    const filteredMovies = movieArray.filter(movie => {
      return movie.duration <= 40 && movie.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    })
    return filteredMovies

}

