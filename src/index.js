// Weather Emojis
let weatherImage = [];
// Display date and time
let date = new Date();
let currentday = date.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let showdate = document.querySelector("#currentdate");
console.log(days[currentday]);
console.log(date.getHours());
if (date.getMinutes() >= 10) {
  showdate.innerHTML = `${days[currentday]} 
${date.getHours()}:${date.getMinutes()}`;
  console.log(date);
} else {
  showdate.innerHTML = `${days[currentday]} 
${date.getHours()}:0${date.getMinutes()}`;
  console.log(date);
}
// function to get weather images
function weatherCheck(weather) {
  let weatherImage = document.querySelector("#weather-image");
  if (weather === "clear sky") {
    weatherImage.setAttribute("src", "images/sunrise.gif");
  } else if (weather === "few clouds") {
    weatherImage.setAttribute("src", "images/cloudy.gif");
  } else if (weather === "scattered clouds") {
    weatherImage.setAttribute("src", "images/clouds.gif");
  } else if (weather === "broken clouds") {
    weatherImage.setAttribute("src", "images/clouds.gif");
  } else if (weather === "thunderstorm") {
    weatherImage.setAttribute("src", "images/storm.gif");
  } else if (weather === "snow") {
    weatherImage.setAttribute("src", "images/snowflake.gif");
  } else if (
    weather === "rain" ||
    weather === "shower rain" ||
    weather === "moderate rain"
  ) {
    weatherImage.setAttribute("src", "images/rain.gif");
  } else if (weather === "mist") {
    weatherImage.setAttribute("src", "images/foggy.gif");
  }
}

//get temp function

function getTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temp-a");
  let weather = response.data.weather[0].description;
  mainTemp.innerHTML = `${temp}°`;
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = response.data.name;
  console.log(response.data.weather[0].description);

  weatherCheck(weather);
}

// get 5 day forecast
function getForecast(response) {
  console.log(response.data);
}

// Display city name

function userSearch(event) {
  event.preventDefault();
  let api = "d40d99ee0c9a7197579e19ec00ff7c05";
  let inputValue = document.querySelector("#city");
  let city = inputValue.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api}`;
  let loc = document.querySelector("#location");
  let submitForm = document.querySelector("#search-form");
  loc.innerHTML = inputValue.value;
  axios.get(url).then(getTemp);
}
function returnPosition(position) {
  let lat = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(lat);
  console.log(longitude);
  let api = "d40d99ee0c9a7197579e19ec00ff7c05";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longitude}&units=imperial&appid=${api}`;
  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${longitude}&units=imperial&appid=${api}`;
  axios.get(url).then(getTemp);
  axios.get(urlForecast).then(getForecast);
}

function getCoordinates() {
  navigator.geolocation.getCurrentPosition(returnPosition);
}

let userInput = document.querySelector(".search-form");
userInput.addEventListener("submit", userSearch);

// if user clicks current location button
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCoordinates);

// F and C Display

function showFare(event) {
  event.preventDefault();

  let faretemp = document.querySelector("#ftemp");
  let temp = document.querySelector("#temp-a");

  temp.innerHTML = "66°";
}

function showCel(event) {
  event.preventDefault();
  let celtemp = document.querySelector("#ctemp");
  let temp = document.querySelector("#temp-a");
  temp.innerHTML = "19°";
}

let tempSelect1 = document.querySelector("#ftemp");
let tempSelect2 = document.querySelector("#ctemp");

tempSelect1.addEventListener("click", showFare);
tempSelect2.addEventListener("click", showCel);
