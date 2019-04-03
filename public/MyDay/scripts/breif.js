var weekDays = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
}
var months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}
setClock()
setInterval(setClock, 1000);

function setClock() {
  let time = new Date();
  $("#clock").html(formatTime(time));
  $("#date").html(weekDays[time.getDay()] + ", " + months[time.getMonth()] + " " + time.getDate());
}


let apiKey = "7b373a3239a7dee48b85e73097afd38b";
let lat = 42.382443;
let lon = -71.126815;
let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

axios.get(url).then(function(result) {
  let weather = JSON.parse(result.request.response);
  $("#type").html(weather.weather[0].main);
  $("#icon").html("<img src= /MyDay/assets/weather_icons/" + weather.weather[0].icon + ".png></img>");
  $("#temp").html(Math.floor(weather.main.temp) + String.fromCharCode(176) + "F (" + Math.floor(weather.main.temp_min) + ", " + Math.floor(weather.main.temp_max) + ")");
  $("#location").html("(" + weather.name + ", " + weather.sys.country + ")");
});
