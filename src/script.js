function citySearch(e) {
    e.preventDefault();
    let cityInput = document.getElementById("search-city");
    let cityValue = document.getElementById("city-value");
    cityValue.innerHTML = cityInput.value;
    searchCity(cityInput.value);
}

let form = document.getElementById("search-form");
form.addEventListener("click", citySearch);

let currentDateTime = new Date();
let h2 = document.querySelector("#date-time");

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = days[currentDateTime.getDay()];

let hours = currentDateTime.getHours();
let minutes = ("0" + currentDateTime.getMinutes()).slice(-2);

h2.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeatherCondition(response) {
    console.log(response);
    document.getElementById("temperature").innerHTML = response.data.main.temp + "° F";
}

function searchCity(city) {
    let apiKey = "edc9269d8e6b8340b9a83f2c42421179";
    let units = "imperial";
    let endPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    let apiUrl = `${endPoint}${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then((response) => displayWeatherCondition(response));
}