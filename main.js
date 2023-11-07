const searchInput = document.querySelector('#movieSearchInput')
const searchButton = document.querySelector('#movieSearchBtn')
const cardsContainer = document.querySelector('#container')

const requestCards = async (requests) => {
    const genres = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/genre/movie/list',
        params: {language: 'en'},
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${PrivateKeys.APIBearer}`
        }
    }

    const requestGenres = await axios
        .request(genres)
        .then(function (genres) {
            return genres
        })
        
        .catch(function (error) {
            console.error(error);
        });

    let requestCard = '', genresCard = ''
    for(let i = 0; i < requests.length; i++){
        genresCard = ''
       const genresCardList = requests[i].genre_ids
       for (let j = 0; j < requestGenres.data.genres.length; j++){
            if (genresCardList.includes(requestGenres.data.genres[j].id)){
                genresCard += `${requestGenres.data.genres[j].name} `
            }
       }
        requestCard += `<div class="card m-1" style="width: 18rem;">
                <img src="https://image.tmdb.org/t/p/w500${requests[i].poster_path}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${requests[i].title}</h5>
                    <p class="card-text">${requests[i].overview}</p>
                    <p class="card-text">${genresCard}</p>
                </div>
            </div>`
    }
    
    cardsContainer.innerHTML = requestCard
}

const searchMovie = async (e) => {
    e.preventDefault()
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {include_adult: 'false', language: 'en-US', page: '1'},
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${PrivateKeys.APIBearer}`
        }
    }

    const search = searchInput.value
    options.url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${PrivateKeys.APIKey}`
    // genres.url = ``
    
    const requestData = await axios
        .request(options)
        .then(function (options) {
            requestCards(options.data.results)
        })
        .catch(function (error) {
            console.error(error);
    });
}

searchButton.addEventListener('click', searchMovie)