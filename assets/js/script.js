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


// created a variable for my API key
var myKey = "304018960801880d53656057e380d93a";

var citySearchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector(".form-input")

var weatherContainerEl = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var cityContainerEl = document.querySelector("#card");
 

// var targetDate = new Date();
// targetDate.setDate(targetDate.getDate() + 5);
// console.log(targetDate);

var searchSubmitHandler = function(event) {
  event.preventDefault();
  // Creating a variable for what city you search for
  var citySearch = cityInputEl.value.trim();
  // Creating a place to put the current city you searched for and appending it to a container
  var citySearchEl = document.createElement("h2");
  citySearchEl.textContent = citySearch;
  cityContainerEl.appendChild(citySearchEl);

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

  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=" + myKey + "&units=imperial";
 fetch(apiUrl).then(function(response) {
   response.json().then(function(data) {
     displayWeather(data, dataApi);
     displayForecast(data);
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
console.log(weather);
  // Clearing what is in the weather container to display new content
  weatherContainerEl.textContent = "";
  forecastContainerEl.textContent = searchTerm;
  // This is a variable that allows me to use the weather icons for the page.
  var weatherIcons = "http://openweathermap.org/img/wn/" + weather.current.weather[0].icon + ".png";
  var weatherIconEl = document.querySelector("#weather-icon");
  weatherContainerEl.innerHTML = `<img src=${weatherIcons}>`;
  



  // This is displaying the current date
  var currentDay = moment().format('MMMM Do YYYY');
  var currentDayEl = document.createElement("h3");
  currentDayEl.textContent = currentDay;
  weatherContainerEl.appendChild(currentDayEl);



// Creating a div and adding the temperature to it to display on the page.
  var tempEl = document.createElement("div");
  tempEl.textContent = "Temperature: " + weather.current.temp + '\u00B0' + " F";
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

  // document.getElementById('weather-icon').src=`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
};


var displayForecast = function(futureWeather) {
console.log(futureWeather);
  // var cityName = cities[i].current.temp
  for (var i = 1; i < 5 ; i++) {
    // Making a variable for future weather
  var forecastWeather = futureWeather.daily[i];

   var futureDays = moment().add(i, 'days').format('L');
   var futureDaysEl = document.createElement("h3");
   futureDaysEl.textContent = futureDays;
   forecastContainerEl.appendChild(futureDaysEl);

   var weatherIcons = "http://openweathermap.org/img/wn/" + forecastWeather.weather[0].icon + ".png";
   var weatherIconEl = document.querySelector("#weather-icon");
   forecastContainerEl.innerHTML = `<img src=${weatherIcons}>`;

   var tempEl = document.createElement("div");
   tempEl.textContent = "Temperature: " + forecastWeather.temp.day + '\u00B0' + " F";
   forecastContainerEl.appendChild(tempEl);

   var windSpeedEl = document.createElement("div");
   windSpeedEl.textContent = "Wind: " + forecastWeather.wind_speed + " MPH";
   forecastContainerEl.appendChild(windSpeedEl);

   var humidityEl = document.createElement("div");
   humidityEl.textContent = "Humidity: " + forecastWeather.humidity + " %";
   forecastContainerEl.appendChild(humidityEl);

  }
}


var displayPreviousSearch = function(cities, searchForm) {

  citySearchFormEl.textContent = searchForm;

  var cityName = document.getElementById("")
  // cityName.textContent = 


}



citySearchFormEl.addEventListener("submit", searchSubmitHandler);