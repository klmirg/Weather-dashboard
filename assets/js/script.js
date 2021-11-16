
// Create click events for the search button
// Add the API's
var myKey = "304018960801880d53656057e380d93a";
var targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 5);
console.log(targetDate);

var getWeather = function() {

  // var apiUrl =
 fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=304018960801880d53656057e380d93a").then(function(response) {
   response.json().then(function(data) {
     console.log(data);
   })
 });
  
}






getWeather();