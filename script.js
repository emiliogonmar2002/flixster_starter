// API variables
const KEY = 'ed2abaa008db9a0ddbb70904e1f95345'
let currentPage = 1
// const url = `https://api.themoviedb.org/3/movie/${categories["Now Playing"]}?api_key=${KEY}&language=en-US&page=${currentPage}`;

// Categories
const categories = {
    "Now Playing": "now_playing",
    "Top rated": "top_rated",
    "Upcoming": "upcoming" 
}

let fetcher = (value) => {
    fetch(`https://api.themoviedb.org/3/movie/${categories["Now Playing"]}?api_key=${KEY}&language=en-US&page=${currentPage}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for (let i = 0; i < data.results.length; i++) {
            cardContainer.innerHTML += `
            <div class="movies-grid">
                <div class="movie-card">
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/original/${data.results[i].poster_path}" alt="${data.results[i].title}">
                    <div class="card-info">
                        <p class="movie-votes">Score: ${data.results[i].vote_average}</p>
                        <hr style="color: #B99434; width: 310px;"/>
                        <h3 class="movie-title">${data.results[i].title}</h3>
                    </div>
                </div>
            </div>
            `
        }
    })
    currentPage++;
}

// Elements
searchFormElement = document.querySelector(".search-form")
cardContainer = document.querySelector(".movies-grid")


// searchFormElement.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const value = document.querySelector(".search-input");
//     console.log(value.value)
//     fetcher(value.value)
// })

const loadMore = () => {
    let reload = true
    fetcher();
    // page += step; 
    // limit += step;
}

document.querySelector("#load-more-movies-btn").addEventListener("click", (e) => {
    loadMore();
})


window.onload = () => {
    fetcher();
}