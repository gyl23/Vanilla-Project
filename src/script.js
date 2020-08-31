var currentCity = "New York";
var currentDateTime = new Date();

let h2 = document.getElementById("date-time");

document.getElementById("current-city").innerText = currentCity;

// search and api handling
let form = document.getElementById("search-form");
form.addEventListener("click", citySearch);

function citySearch(e) {
    e.preventDefault();
    let cityInput = document.getElementById("search-city");
    currentCity = cityInput.value;
    searchCity(cityInput.value);
}

function displayWeatherCondition(response) {
    console.log(response);
    document.getElementById("temperature").innerHTML = "Base temperature: " + response.data.main.temp + "° F";
    document.getElementById("min-max-temperature").innerHTML = "Min/max temperature: " + response.data.main.temp_min + "° F / " + response.data.main.temp_max + "° F";
    document.getElementById("humidity").innerHTML = "Humidity: " + response.data.main.humidity + "%";
    document.getElementById("current-city").innerText = currentCity;
    let offset = response.data.timezone;
    let utc = currentDateTime.getTime() + (currentDateTime.getTimezoneOffset() * 60000);
    let localDate = new Date(utc + offset * 1000);
    let text = localDate.toLocaleString();
    h2.innerHTML = text;
    let element3 = document.getElementById("main-img");
    element3.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function searchCity(city) {
    let apiKey = "edc9269d8e6b8340b9a83f2c42421179";
    let units = "imperial";
    let endPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    let apiUrl = `${endPoint}${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then((response) => displayWeatherCondition(response));

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
    console.log(response);
    let forecast = response.data.list;
    let offset = response.data.city.timezone;

    var i;
    for (i = 0; i < 5; i = i + 1) {
        let element1 = document.getElementById("slot_" + i);
        let element2 = document.getElementById("forcast_" + i);
        let element3 = document.getElementById("icon_" + i);

        let date = new Date(forecast[i].dt_txt)
        let utc = date.getTime();
        let localDate = new Date(utc + offset * 1000)
        let text = localDate.toLocaleString();

        element1.innerHTML = text;
        element2.innerHTML = forecast[i].main.temp;
        element3.setAttribute("src", `http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png`);
    }
}
searchCity("New York");


let utc = currentDateTime.getTime() + (currentDateTime.getTimezoneOffset() * 60000);
let localDate = new Date(utc + -14400 * 1000);
let text = localDate.toLocaleString();
h2.innerHTML = text;
