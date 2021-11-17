// When I search for a city, then I am presented with...
// current and future conditions for that city and the city is added to the search history
// When I view current weather conditions for that city
// I am presented with the city name, the date, an icon representation of weather conditions,
// the temperature, the humidity, the wind speed, and the UV Index
// When I view the UV Index,
// I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// When I view future weather conditions for that city
// I am presented with a 5-day forecast that displays the date, an icon representations of 
// weather conditions, the temperature, the wind speed, and the humidity
// When I click on a city in the search history
// I am presented with current and future conditions for that city


// "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=304018960801880d53656057e380d93a"

// created a variable for my API key
var myKey = "304018960801880d53656057e380d93a";

var citySearchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector(".form-input")

var weatherContainerEl = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
// var forecastSearchEl = document.querySelector("#forecast");
 

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
  // console.log(event)
}



var getWeather = function(citySearch) {

  // var citySearch = cityInputEl.value.trim();

  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + myKey + "&units=imperial";
 fetch(apiUrl).then(function(response) {
   response.json().then(function(data) {
    //  console.log(data);
     displayWeather(data, citySearch);
   })
 });
}

var getForecast = function(city) {

  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=304018960801880d53656057e380d93a";
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      displayWeather(data, city);
      displayForecast(data, city);
    })
  })
}

// Figure out how to display the temperature, humidity, wind speed, and the UV index
var displayWeather = function(weather, searchTerm) {

  // clearing what is in the container
  weatherContainerEl.textContent = "";
  forecastContainerEl.textContent = searchTerm;


  var tempEl = document.createElement("div");
  tempEl.textContent = "Temperature: " + weather.main.temp + " F";
  weatherContainerEl.appendChild(tempEl);

  var windSpeedEl = document.createElement("div");
  windSpeedEl.textContent = "Wind: " + weather.wind.speed + " MPH";
  weatherContainerEl.appendChild(windSpeedEl);

  var humidityEl = document.createElement("div");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
  weatherContainerEl.appendChild(humidityEl);

  var uvIndexEl = document.createElement("div");
  uvIndexEl.textContent = "UV Index: " + weather.current.uvi;
  weatherContainerEl.appendChild(uvIndexEl);
};

var displayForecast = function(weather2) {

  // var uvIndexEl = document.createElement("div");
  // uvIndexEl.textContent = "UV Index: " + weather2.current.uvi;
  // weatherContainerEl.appendChild(uvIndexEl);
  
  // for (var i = 0; i < 6; i++) {
  //   var cityName = cities[i].current.temp
  // }
}


var displayPreviousSearch = function(cities, searchForm) {

  citySearchForm.textContent = searchForm;


}

// getWeather();

citySearchFormEl.addEventListener("submit", searchSubmitHandler);