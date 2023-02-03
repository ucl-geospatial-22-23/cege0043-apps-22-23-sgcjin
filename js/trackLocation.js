"use strict";
function trackLocation() {
 if (navigator.geolocation) {
 navigator.geolocation.watchPosition(showPosition);
 } else {
 document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
 }
}
function showPosition(position) {
 document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude +
 "<br>Longitude: " + position.coords.longitude;
}