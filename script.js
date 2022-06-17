// API variables
const KEY = 'ed2abaa008db9a0ddbb70904e1f95345'
const url = `https://api.themoviedb.org/3/movie/${categories[selectedCategorie]}?api_key=${KEY}&language=en-US&page=${currentPage}`;

let fetcher = () => {
    fetch(baseURL)
    .then(res => res.json())
    .then(data => {

    })
}

// Elements
searchFormElement = document.querySelector(".search-form")
cardContainer = document.querySelector("")


searchFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = document.querySelector(".search-input");
    console.log(value.value)
    getConfig(value.value)
})