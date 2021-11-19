export function filteredMovies(movieArray, keyWord) {
  if(movieArray === undefined) {
    return console.log('undefind')
  } else {
    const filteredMovies = movieArray.filter(movie => {
      return movie.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    })
    return filteredMovies
  }

}


export function filteredShortfilms(movieArray, keyWord) {
  if(movieArray === undefined) {
    return console.log('undefind')
  } else {
    const filteredMovies = movieArray.filter(movie => {
      return movie.duration <= 40 && movie.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    })
    return filteredMovies
  }

}


