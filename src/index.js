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
  } else if (weather === "thunderstorm") {
    weatherImage.setAttribute("src", "images/storm.gif");
  } else if (weather === "snow") {
    weatherImage.setAttribute("src", "images/snowflake.gif");
  } else if (weather.includes("rain")) {
    weatherImage.setAttribute("src", "images/rain.gif");
  } else if (weather === "mist") {
    weatherImage.setAttribute("src", "images/foggy.gif");
  } else if (weather.includes("clouds")) {
    weatherImage.setAttribute("src", "images/clouds.gif");
  }
}
function displayForecast(coordinates) {
  console.log(coordinates);
  let api = "97bed167ec49bff56e6c1b63daef9c86";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api}&units=imperial;`;
  console.log(url);
  axios.get(url).then(getForecast);
  //   let api = "97bed167ec49bff56e6c1b63daef9c86";
  //   //let cords = coordinates;
  //   //let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${api}`;
  //   axios.get(url).then(getForecast());
}

//get temp function -- get city and

function getTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temp-a");
  let weather = response.data.weather[0].description;
  let humidtiy = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let weather_desc = response.data.weather[0].description;
  let cord_lat = response.data.coord.lat;
  let cord_long = response.data.coord.lon;
  //let precepitation=
  mainTemp.innerHTML = `${temp}°`;
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = response.data.name;
  //   console.log(response.data.weather[0].description);
  console.log(response.data);
  let update_humidity = document.querySelector("#humidity");
  let update_wind = document.querySelector("#wind");
  let weather_description = document.querySelector("#weather-desc");
  weather_description.innerHTML = weather_desc;

  update_humidity.innerHTML = `${humidtiy}%`;
  update_wind.innerHTML = `${Math.round(wind)} mph`;
  //   console.log(response.data);
  //   console.log(response.data.main.humidity);
  //   console.log(response.data.wind.speed);
  to_celcius = Math.round(temp);
  weatherCheck(weather);
  displayForecast(response.data.coord);
}

// get 5 day forecast
function getForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let days = ["mon", "tue", "wed", "thur", "fri"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2 id="forecast-space">
         <div class="weather-date">${day}</div>
         <img src="images/clouds.gif" width="55" />
         <div class="weather-forecast-temp">
           <span id="min-temp">12</span>/<span id="max-temp">16</span>
         </div>
       </div>
     `;
  });
  forecastHTML = forecastHTML + `</div`;

  forecastElement.innerHTML = forecastHTML;
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
  //loc.innerHTML = inputValue.value;
  axios.get(url).then(getTemp);
  getForecast();
}
function returnPosition(position) {
  let lat = position.coords.latitude;
  let longitude = position.coords.longitude;

  let api = "d40d99ee0c9a7197579e19ec00ff7c05";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longitude}&units=imperial&appid=${api}`;
  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${longitude}&units=imperial&appid=${api}`;
  axios.get(url).then(getTemp);
  //axios.get(urlForecast).then(getForecast);
}

function getCoordinates() {
  navigator.geolocation.getCurrentPosition(returnPosition);
}

// IF USER CLICKS THE SEARCH BUTTON
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
  temp.innerHTML = to_celcius;
}

let to_celcius = null;

function showCel(event) {
  event.preventDefault();
  let celtemp = document.querySelector("#ctemp");
  let temp = document.querySelector("#temp-a");
  let convert_c = ((to_celcius - 32) * 5) / 9;
  temp.innerHTML = Math.round(convert_c);
}

let tempSelect1 = document.querySelector("#ftemp");
let tempSelect2 = document.querySelector("#ctemp");

tempSelect1.addEventListener("click", showFare);
tempSelect2.addEventListener("click", showCel);
//getForecast();
getCoordinates();
