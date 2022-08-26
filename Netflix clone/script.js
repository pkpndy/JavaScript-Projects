
window.onload = () => {
    getOriginals()
    getTrendingNow()
    getTopRated()
  }
  
  function fetchMovies(url, dom_element, path_type) {
    fetch(url).then(response => {return response.json()}).then(data => {showMovies(data, dom_element,path_type)})
    
  }
  
  showMovies = (movies, dom_element, path_type) => {
    
    let dispMovies=document.querySelector(dom_element);
  
    for(let movie of movies.results){
        let imageElement = document.createElement('img')
        imageElement.setAttribute('data-id', movie.id)
        imageElement.setAttribute('src', `https://image.tmdb.org/t/p/original${movie[path_type]}`)
        dispMovies.appendChild(imageElement)
    }
    
    }
  
  
  function getOriginals() {
    let url='https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
    fetchMovies(url,'.original__movies', 'poster_path' )
  
  }

  function getTrendingNow() {
    let url= 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
    fetchMovies(url,'#trending', 'backdrop_path' )
  
  }

  function getTopRated() {
    let url='https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
    fetchMovies(url,'#top_rated', 'backdrop_path' )
  
  }
  

  async function getMovieTrailer(id) {
    let URL= `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
    let response= await fetch(URL)
    let data= await response.json()
    return data
  
  }
  
  const setTrailer = trailers => {
    const iframe = document.getElementById('movieTrailer')
    const movieNotFound=document.querySelector('.movieNotFound')
  
    if (trailers.length > 0) {

        movieNotFound.classList.add('d-none')
        iframe.classList.remove('d-none')
        iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`

    } else {
      iframe.classList.add('d-none')
      movieNotFound.classList.remove('d-none')
    }
  }
  
  
  const handleMovieSelection = e => {
    const id = e.target.getAttribute('data-id')
    const iframe = document.getElementById('movieTrailer')
    getMovieTrailer(id).then(data => {
      const results = data.results
      const youtubeTrailers = results.filter(result => {
        if (result.site == 'YouTube' && result.type == 'Trailer') {
          return true
        } else {
          return false
        }
      })
      setTrailer(youtubeTrailers)
    })
  
    $('#trailerModal').modal('show')
  }
  
  