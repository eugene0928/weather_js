const api = {
    key: '0400b796d3acd1ee1c6f3301a977c52f',
    baseUrl: 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box')

searchBox.addEventListener('keypress', (e) => {
    if(e.keyCode === 13 ) {
        getResult(searchBox.value)
    }
})

function getResult(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather => weather.json())
        .then(showResult)
}

function showResult(result) {
    console.log(result)
}