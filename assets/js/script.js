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
console.log(citySearch)
  if (citySearch) {
    getWeather(citySearch);
    cityInputEl.value = "";
  } else {
    alert("Enter a valid city!");
  }

  var previousSearchArr =  [];
 
}



var getForecast = function(dataApi) {
// Creating the variables for latitude and longitude
  var latitude = dataApi.coord.lat;
  var longitude = dataApi.coord.lon;

  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,daily&appid=" + myKey + "&units=imperial";
 fetch(apiUrl).then(function(response) {
   response.json().then(function(data) {
     displayWeather(data, dataApi);
     displayForecast(data, dataApi);
   })
 });
}

var getWeather = function(citySearch) {
// Creating the variable for what city is searched for
  var citySearch = cityInputEl.value.trim();
  
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + myKey + "&units=imperial";
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      getForecast(data); 
      // displayForecast(data, citySearch);
    })
  })
}

// Figure out how to display the temperature, humidity, wind speed, and the UV index
var displayWeather = function(weather, searchTerm) {

  // Clearing what is in the weather container to display new content
  weatherContainerEl.textContent = "";
  forecastContainerEl.textContent = searchTerm;
  // This allows me to use the weather icons for the page.
  var weatherIcons = "http://openweathermap.org/img/wn/10d@2x.png"

  var currentDay = moment().format('MMMM Do YYYY');
  var currentDayEl = document.createElement("h2");
  currentDayEl.textContent = currentDay;
  weatherContainerEl.appendChild(currentDayEl);

// Creating a div and adding the temperature to it to display on the page.
  var tempEl = document.createElement("div");
  tempEl.textContent = "Temperature: " + weather.current.temp + " F";
  weatherContainerEl.appendChild(tempEl);
// Creating a div and adding the wind speed to it to display on the page.
  var windSpeedEl = document.createElement("div");
  windSpeedEl.textContent = "Wind: " + weather.current.wind_speed + " MPH";
  weatherContainerEl.appendChild(windSpeedEl);
// Creating a div and adding the humidity to it to display on the page.
  var humidityEl = document.createElement("div");
  humidityEl.textContent = "Humidity: " + weather.current.humidity + " %";
  weatherContainerEl.appendChild(humidityEl);
// Creating a div and adding the UV index to display on the page.
  var uvIndexEl = document.createElement("div");
  uvIndexEl.textContent = "UV Index: " + weather.current.uvi;
  weatherContainerEl.appendChild(uvIndexEl);
};

var displayForecast = function(futureweather, searchTerm) {

  weatherContainerEl.textContent = "";
  forecastContainerEl.textContent = searchTerm;

  // var cityName = cities[i].current.temp
  for (var i = 0; i < 5; i++) {

   var futureDays = moment().add(i, 'days').format('L');
   var futureDaysEl = document.createElement("h3");
   futureDaysEl.textContent = futureDays;
   forecastContainerEl.appendChild(futureDaysEl);

   var tempEl = document.createElement("div");
   tempEl.textContent = "Temperature: " + futureweather.current.temp + "F";
   forecastContainerEl.appendChild(tempEl);

   var windSpeedEl = document.createElement("div");
   windSpeedEl.textContent = "Wind: " + futureweather.current.wind_speed + " MPH";
   forecastContainerEl.appendChild(windSpeedEl);

   var humidityEl = document.createElement("div");
   humidityEl.textContent = "Humidity: " + futureweather.current.humidity + " %";
   forecastContainerEl.appendChild(humidityEl);

  }


}


var displayPreviousSearch = function(cities, searchForm) {

  citySearchFormEl.textContent = searchForm;

  var cityName = document.getElementById("")
  // cityName.textContent = 


}



citySearchFormEl.addEventListener("submit", searchSubmitHandler);