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
    let city = document.querySelector('.location .city')
    city.innerHTML = `${result.name}  ${result.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date')
    date.innerHTML = dateBuilder(now)

    let temp = document.querySelector('.main-temp .temp')
    temp.innerHTML = `${Math.round(result.main.temp)} °C ` 

    let weather = document.querySelector('.main-temp .type-climate');
    weather.innerHTML = result.weather[0]['main']

    let high_low = document.querySelector('.main-temp .high-low')
    high_low.innerHTML = `${Math.round(result.main.temp_max)}°C / ${Math.round(result.main.temp_min)}°C`

}

function dateBuilder(info) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return `${weekdays[info.getDay()]} ${info.getDate()} ${months[info.getMonth()]} ${info.getFullYear()}`
}