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
showdate.innerHTML = `${
  days[currentday]
} ${date.getHours()}:${date.getMinutes()}`;

//get temp function

function getTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temp-a");
  mainTemp.innerHTML = `${temp}°`;
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = response.data.name;
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
  axios.get(url).then(getTemp);
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
