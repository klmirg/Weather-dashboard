// When I search for a city, then I am presented with...
// current and future conditions for that city and the city is added to the search history
// When I view current weather conditions for that city
// I am presented with the city name, the date, an icon representation of weather conditions,
// the temperature, the humidity, the wind speed, and the UV Index
// When I view the UV Index,
// I am presented with a color that indicates wether the conditions are favorable, moderate, or severe
// When I view future weather conditions for that city
// I am presented with a 5-day forecast that displays the date, an icon representations of 
// weather conditions, the temperature, the wind speed, and the humidity
// When I click on a city in the search history
// I am presented with current and future conditions for that city


// "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=304018960801880d53656057e380d93a"

var myKey = "304018960801880d53656057e380d93a";

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector(".form-input")

var weatherContainerEl = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastSearchEl = document.querySelector("#forecast");

var targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 5);
console.log(targetDate);

var searchSubmitHandler = function(event) {
  event.preventDefault();

  var citySearch = cityInputEl.value.trim();

  if (citySearch) {
    getWeather(citySearch);
    cityInputEl.value = "";
  } else {
    alert("Enter a valid city!");
  }
  console.log(event)
}

var getWeather = function(city) {

  var citySearch = cityInputEl.value.trim();

  var apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + citySearch +"&appid=304018960801880d53656057e380d93a";
 fetch(apiUrl).then(function(response) {
   response.json().then(function(data) {
     displayWeather(data, city);
   })
 });
}

var displayWeather = function() {

}

var displayForecast = function() {

}


// getWeather();


searchFormEl.addEventListener("submit", searchSubmitHandler);