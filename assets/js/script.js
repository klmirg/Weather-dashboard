// created a variable for my API key
var myKey = "304018960801880d53656057e380d93a";

var searchHistory = [];
var citySearchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector(".form-input")

var weatherContainerEl = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
//var cityContainerEl = document.querySelector("#card");
var searchHistoryEl = document.getElementById("searchHistory");
 

var searchSubmitHandler = function(event) {
  event.preventDefault();
  // Creating a variable for what city you search for
  var citySearch = cityInputEl.value.trim();
  // Creating a place to put the current city you searched for and appending it to a container
  var citySearchEl = document.createElement("h2");
  citySearchEl.textContent = citySearch;
  searchHistoryEl.appendChild(citySearchEl);

  if (citySearch) {
    getWeather(citySearch);
    cityInputEl.value = "";
  } else {
    alert("Enter a valid city!");
  }
  saveSearch(citySearch);
}

var saveSearch = function(citySearch) {
  
  if(searchHistory.indexOf(citySearch) !== -1){
    return;
  }
  searchHistory.push(citySearch)
  localStorage.setItem("citySearch", JSON.stringify(searchHistory));
  renderSearchHistory()
}

var renderSearchHistory = function(){
searchHistoryEl.innerHTML = '';

for(var i=searchHistory.length -1; i >=0; i--){
  var button = document.createElement("button");
  button.setAttribute("type", "button")
  button.setAttribute("class", "historyBtn")

  button.setAttribute("data-search", searchHistory[i]);
  button.textContent = searchHistory[i];
  button.onclick = function (e) { getWeather(e.target.textContent)};
  searchHistoryEl.append(button);
  }
}


//var savedSearch = JSON.parse(localStorage.getItem("citySearch")) || [];

var getForecast = function(dataApi) {
// Creating the variables for latitude and longitude
  var latitude = dataApi.coord.lat;
  var longitude = dataApi.coord.lon;
// fetching the api
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
  // var citySearch = cityInputEl.value.trim();

  // if (cityInputEl.value != "") { citySearch = cityInputEl.value.trim() }
  console.log("running weather")
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
  // forecastContainerEl.textContent = searchTerm;
  forecastContainerEl.innerHTML = "";
  // This is a variable that allows me to use the weather icons for the page.
  var weatherIcons = "http://openweathermap.org/img/w/" + weather.current.weather[0].icon + ".png";
  var weatherIconEl = document.querySelector("#weather-icon");
  weatherContainerEl.innerHTML = `<img src=${weatherIcons}>`;

  // This is displaying the current date
  var currentDay = moment().format('(L)');
  var currentDayEl = document.createElement("h3");
  currentDayEl.textContent = currentDay;
  weatherContainerEl.appendChild(currentDayEl);

// Creating a div and adding the temperature to it to display on the page.
  var tempEl = document.createElement("div");
  tempEl.textContent = "Temp: " + weather.current.temp + '\u00B0' + " F";
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
  var uvIndexEl = document.createElement("button");

  var uvIndex = weather.current.uvi;

  if(uvIndex < 3){
    uvIndexEl.setAttribute("class", "btn-success")
  } else if(uvIndex < 6){
    uvIndexEl.setAttribute("class", "btn-warning")
  } else if(uvIndex < 10){
    uvIndexEl.setAttribute("class", "btn-danger")
  } 
  // else {
  //   uvIndexEl.setAttribute("class", "danger")
  // }

  uvIndexEl.textContent = "UV Index: " + uvIndex;
  weatherContainerEl.appendChild(uvIndexEl);
};


var displayForecast = function(futureWeather) {
console.log(futureWeather);
  // for loop to loop through the 5 days
  for (var i = 1; i < 6 ; i++) {
    // Making a variable for future weather
  var forecastWeather = futureWeather.daily[i];

  var nextFiveDaysContainer = document.createElement("div");
  // nextFiveDaysContainer.setAttribute("id", i);
  nextFiveDaysContainer.setAttribute("class", "bg-dark text-white");
  forecastContainerEl.appendChild(nextFiveDaysContainer);

   var futureDays = moment().add(i, 'days').format('L');
   var futureDaysEl = document.createElement("h3");
   futureDaysEl.textContent = futureDays;
   nextFiveDaysContainer.appendChild(futureDaysEl);

   var icon = document.createElement("img");
   icon.style.width = "50px";
   icon.style.height = "50px";
   icon.src = "http://openweathermap.org/img/w/" + forecastWeather.weather[0].icon + ".png";

   nextFiveDaysContainer.appendChild(icon);

   var tempEl = document.createElement("div");
   tempEl.textContent = "Temp: " + forecastWeather.temp.day + '\u00B0' + " F";
   nextFiveDaysContainer.appendChild(tempEl);

   var windSpeedEl = document.createElement("div");
   windSpeedEl.textContent = "Wind: " + forecastWeather.wind_speed + " MPH";
   nextFiveDaysContainer.appendChild(windSpeedEl);

   var humidityEl = document.createElement("div");
   humidityEl.textContent = "Humidity: " + forecastWeather.humidity + " %";
   nextFiveDaysContainer.appendChild(humidityEl);

  //  var icon = document.createElement("img");
  //  icon.style.width = "50px";
  //  icon.src = "http://openweathermap.org/img/wn/" + forecastWeather.weather[0].icon + ".png";
   
  //  forecastContainerEl.appendChild(icon);
  }
}

// searchHistoryEl.addEventListener("click",)

citySearchFormEl.addEventListener("submit", searchSubmitHandler);