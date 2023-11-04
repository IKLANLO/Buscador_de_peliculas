const searchInput = document.querySelector('#movieSearchInput')
const searchButton = document.querySelector('#movieSearchBtn')
const cardsContainer = document.querySelector('#container')
const APIKey = '1b17fa6ee6d58dcbf1646a5224f5e350'
const APIBearer = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjE3ZmE2ZWU2ZDU4ZGNiZjE2NDZhNTIyNGY1ZTM1MCIsInN1YiI6IjY1NDYxMjNhNDFhNTYxMzM2ZDg0MzA2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2LBfdKl_PRAm68pC-93z-_0WqrMo3ebS2YypYtj9TKM'

const requestCards = (requests) => {
    let requestCard = ''
    for(let i = 0; i < requests.length; i++){
        requestCard += `<div class="card m-1" style="width: 18rem;">
                <img src="https://image.tmdb.org/t/p/w500${requests[i].poster_path}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${requests[i].title}</h5>
                    <p class="card-text">${requests[i].overview}</p>
                    <p class="card-text">${requests[i].genre_ids}</p>
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
          Authorization: `Bearer ${APIBearer}`
        }
    }

    // const genres = {
    //     method: 'GET',
    //     url: 'https://api.themoviedb.org/3/genre/movie/list',
    //     params: {language: 'en'},
    //     headers: {
    //         accept: 'application/json',
    //         Authorization: `Bearer ${APIBearer}`
    //     }
    // }

    const search = searchInput.value
    options.url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${APIKey}`
    // genres.url = ``

    // const requestGenres = await axios
    //     .request(genres)
    //     .then(function (genres, options) {
    //         genres.filter((genre) => {
                
    //         })
    //     })
    //     .catch(function (error) {
    //         console.error(error);
    //     });
    
    const requestData = await axios
        .request(options)
        .then(function (options) {
            // const listGenres = requestGenres()
            // console.log(listGenres);
            requestCards(options.data.results)
        })
        .catch(function (error) {
            console.error(error);
    });
}

searchButton.addEventListener('click', searchMovie)