// Variables
const KEY = 'ed2abaa008db9a0ddbb70904e1f95345'
let currentPage = 0
let loaded = false;
let searchValue = '';
let lastValue = '';

let movieCards = document.getElementsByClassName('movie-card')
const searchFormElement = document.querySelector(".search-form")
const searchInputElement = document.querySelector(".search-input")
const cardContainer = document.querySelector(".movies-grid")
const cardElement = document.querySelector(".movie-card")
const modalElement = document.querySelector(".movie-window")

document.querySelector("#load-more-movies-btn").addEventListener("click", (e) => {
    loadMore();
})

document.querySelector("#erase").addEventListener("click", (e) => {
    e.preventDefault();
    cardContainer.innerHTML = ``
    currentPage = 0
    searchValue=''
    searchInputElement.value = ""
    fetcher(searchValue)
})


// Categories
const categories = {
    "Now Playing": "now_playing",
    "Top rated": "top_rated",
    "Upcoming": "upcoming" 
}

const fetcher = (searchValue) => {
    currentPage += 1;
    if(searchValue != ''){
        url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${searchValue}&page=${currentPage}&include_adult=false`;
    } else {
        url = `https://api.themoviedb.org/3/movie/${categories["Now Playing"]}?api_key=${KEY}&language=en-US&page=${currentPage}`;
    }

    fetch(url)
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < data.results.length; i++) {
            cardContainer.innerHTML += `
            <div class="movies-grid">
                <div class="movie-card pointer">
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/original/${data.results[i].poster_path}" alt="${data.results[i].title}">
                    <div class="card-info">
                        <p class="movie-votes">Score: ${data.results[i].vote_average}</p>
                        <hr style="color: #B99434; width: 310px;"/>
                        <h3 class="movie-title">${data.results[i].title}</h3>
                    </div>
                </div>
            </div>
            `
            console.log('si')
        }
    })

    lastValue = searchValue;
}


searchFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
    searchValue = document.querySelector(".search-input").value;
    console.log(searchValue)
    cardContainer.innerHTML = ``
    currentPage = 0;
    fetcher(searchValue)
})

const loadMore = () => {
    let reload = true
    fetcher(searchValue);
}

function addPopUp(movie_id) {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${KEY}&language=en-US`)
        .then(res => res.json())
        .then(data => {
            const title = data.title;
            const time = `${data.runtime}min`;
            const date = data.release_date;
            let categories = ``;

            for (let i = 0; i < data.genres.length; i++) {
                if (i < data.genres.length - 1) {
                    categories += data.genres[i].name + ` - `
                } else {
                    categories += data.genres[i].name
                }
            }
            const description = data.overview;
        })
    
    modalElement.style.display = 'block'
    modalElement.innerHTML = `
        <i class="close-button" style="color: white;">&#x2715</i>
        <div class="movie-window-header">
            <h2>Titulo</h2>
            <p>video</p>
        </div>
        <p>Lorem ipsum</p>
        `   
    }

window.onload = () => {
    fetcher(searchValue);
}