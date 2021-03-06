const api = {
  key: "0400b796d3acd1ee1c6f3301a977c52f",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

function getResult(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => weather.json())
    .then(showResult);
}

function showResult(result) {
  console.log(result.cod);
  let city = document.querySelector(".location .city");
  let date = document.querySelector(".location .date");
  let temp = document.querySelector(".main-temp .temp");
  let weather = document.querySelector(".main-temp .type-climate");
  let high_low = document.querySelector(".main-temp .high-low");

  if (result.cod === 200) {
    
    // values
    city.innerHTML = `${result.name}`;
    let now = new Date();
    date.innerHTML = dateBuilder(now);
    temp.innerHTML = `${Math.round(result.main.temp)} °C `;
    high_low.innerHTML = `${Math.round(result.main.temp_max)}°C / ${Math.round(
      result.main.temp_min
    )}°C`;
    weather.innerHTML = result.weather[0]["main"];

    switch (result.weather[0]["main"]) {
      case "Mist":
        document.body.style.backgroundImage = "url('../src/mist.jpg')";
        break;

      case "Haze":
        document.body.style.backgroundImage = "url('../src/mist.jpg')";
        break;

      case "Smoke":
        document.body.style.backgroundImage = "url('../src/mist.jpg')";
        break;

      case "Clouds":
        document.body.style.backgroundImage = "url('../src/cloudy.jpg')";
        break;

      case "Fog":
        document.body.style.backgroundImage = "url('../src/fog.jpeg')";
        break;

      case "Rain":
        document.body.style.backgroundImage = "url('../src/rainy.jpg')";
        break;

      case "Snow":
        document.body.style.backgroundImage = "url('../src/snowy.jpg')";
        break;

      case "Wind":
        document.body.style.backgroundImage = "url('../src/windy.jpg')";
        break;

      case "Clear":
        document.body.style.backgroundImage = "url('../src/clear.jpg')";
        break;

      default:
        document.body.style.backgroundImage = "url('../src/river.jpeg')";
        break;
    }
    document.body.style.backgroundSize = 'cover'

  } else {
    document.body.style.backgroundImage = "url('../src/404.png')";
    document.body.style.backgroundSize = '100vw 160vh'

    // clear inputs
    city.innerHTML = null;
    date.innerHTML = null;
    temp.innerHTML = null;
    weather.innerHTML = null;
    high_low.innerHTML = null;
  }
}

function dateBuilder(info) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${weekdays[info.getDay()]} ${info.getDate()} ${
    months[info.getMonth()]
  } ${info.getFullYear()}`;
}

let city = "";

window.addEventListener("load", function () {
  // Step 1: Get user coordinates
  function getCoordinates() {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      let crd = pos.coords;
      let lat = crd.latitude.toString();
      let lng = crd.longitude.toString();
      let coordinates = [lat, lng];
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      getCity(coordinates);
      return;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  // Step 2: Get city name
  function getCity(coordinates) {
    let xhr = new XMLHttpRequest();
    let lat = coordinates[0];
    let lng = coordinates[1];

    // Paste your LocationIQ token below.
    xhr.open(
      "GET",
      "https://us1.locationiq.com/v1/reverse.php?key=pk.9c19f9056cc513fa58eef37199d4b406&lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json",
      true
    );
    xhr.send();
    xhr.onreadystatechange = processRequest();
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        city = response.address.city;
        getResult(city);
        return city;
      }
    }
  }
  getCoordinates();
});

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    getResult(searchBox.value);
    searchBox.value = "";
  }
});
