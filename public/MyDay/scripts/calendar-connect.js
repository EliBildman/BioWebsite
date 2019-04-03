
var eventsLoaded = false;
var events = [];
var colors = [];
var currTime = new Date();
var startTime = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), 0, 0);
var endTime = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), 23, 59);


function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

function initClient() {
  gapi.client.init({
    'apiKey': 'AIzaSyCbAQtrrFdoZs-yfxiPSbR4JHBu9xLMJBA',
    'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    'clientId': '949471561840-rr8sml48042ks3f4258vn6gg0fs76iqs.apps.googleusercontent.com',
    'scope': "https://www.googleapis.com/auth/calendar.readonly"
  }).then(function() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(signInChange);
    if(!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      gapi.auth2.getAuthInstance().signIn();
    }
    signInChange(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function signInChange(isIn) {
  if(isIn) {
    loadEvents();
  }
}

function loadEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': startTime.toISOString(),
    'timeMax': endTime.toISOString(),
    'orderBy': 'startTime',
    'singleEvents': 'true'
  }).then(function(results) {
    for(let i = 0; i < results.result.items.length; i++) {
      events.push(results.result.items[i]);
    }
  }).then(function() {
    setColors();
    fillTable();
    initMap();
  });
}

function setColors() {
  for(let i = 0; i < events.length; i++) {
    colors.push(randomRGB());
  }
}


function formatTime(d) {
  let hour = d.getHours();
  let min = d.getMinutes();
  let ext = "AM";
  if (hour > 12) {
    hour -= 12;
    ext = "PM";
  }
  if(hour == 0) {
    hour = 12;
  }
  if (min < 10) {
    min = "0" + min;
  }
  return hour + ":" + min + " " + ext;
}

function cutAddress(add) {
  return add.indexOf(",") != -1 ? add.substring(0, add.indexOf(",")) : add;
}

function eventSlide(summary, time, location, eventIndex) {
  return "<div class=\"slide event\" style=\"background-color:" + hexToRGBATag(colors[eventIndex], 0.5) + "; border: 5px solid " + hexToRGBATag(colors[eventIndex], 1) + ";\"><div class=\"top\"><div class=\"eventTime\">" + time + "</div><div class=\"eventLocation\">" + location + "</div></div><div class=\"bottom\"><strong>" + summary + "</strong></div></div>";
}

function homeSlide() {
  return "<div class=\"slide home\" style=\"background-color:" + hexToRGBATag(homecolor, 0.5) + "; border: 5px solid " + hexToRGBATag(homecolor, 1) + ";\"><strong>Home</strong><div class=\"eventLocation\">" + cutAddress(home) + "</div></div>";
}

function pathSlide(origin, destination, mode, i) {
  let colHex = avgHex(i > 0 ? colors[i - 1] : homecolor, colors[i] != null ? colors[i] : homecolor);
  makeRoute(origin, destination, i);
  return "<div class=\"slide path\" onmouseover=\"eventHover(" + i + ")\" onmouseout=\"eventUnhover(" + i + ")\" style=\"background-color:" + hexToRGBATag(colHex, 0.5) + "; border: 5px solid " + hexToRGBATag(colHex, 1) + ";\"><img class= \"pathIcon\" src= \"/MyDay/assets/travel_icons/" + mode + ".png\"></img><div class=\"travelInfo\"><div class=\"travelTime\" id=\"time" + i + "\"></div><div class=\"travelSum\" id=\"sum" + i + "\"></div></div></div>";
}


function fillTable() {
  $("#list").append("<tr><td>" + homeSlide() + "</td></tr>");
  for(let i = 0; i < events.length; i++) {
    let sum = "";
    let start = formatTime(new Date(events[i].start.dateTime));
    let end = formatTime(new Date(events[i].end.dateTime));
    let location = cutAddress(events[i].location);
    sum += events[i].summary.length <= 40 ? events[i].summary : events[i].summary.substring(0, 37) + "...";
    $("#list").append("<tr><td>" + pathSlide(i == 0 ? home : events[i - 1].location, events[i].location, _mode, i) + "</td></tr>");
    $("#list").append("<tr><td>" + eventSlide(sum, start, location, i) + "</td></tr>");
  }
  if(events.length > 0) $("#list").append("<tr><td>" + pathSlide(events[events.length - 1].location, home, _mode, events.length) + "</td></tr>")
  $("#list").append("<tr><td>" + homeSlide() + "</td></tr>");
}
