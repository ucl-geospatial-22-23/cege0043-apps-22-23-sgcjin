"use strict";
let mymap;
// create an array to store all the location tracking points
let trackLocationLayer = [];
// store the ID of the location tracker so that it can be used to switch the location tracking off
let geoLocationID;

function trackLocation() {
if (navigator.geolocation) {
 // test to see if there is an active tracking and clear it if so
 // so that we don’t have multiple tracking going on
 try {
 (navigator.geolocation.clearWatch(geoLocationID));
 console.log(trackLocationLayer)
 }
 catch (e){
 console.log(e);
 }
// clear any existing data from the map
removeTracks();
// need to tell the tracker what we will do with the coordinates – showPosition
// also what we will do if there is an error – errorPosition
// also set some parameters – e.g how often to renew, what timeout to set
const options = {
 enableHighAccuracy: true,
 maximumAge: 30000,
 timeout: 27000
};

geoLocationID = navigator.geolocation.watchPosition(showPosition, errorPosition, options);
}
else {
document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
}
}


function errorPosition(error){
 alert(error);
}

function showPosition(position) {
	document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude +
 "<br>Longitude: " + position.coords.longitude; 

// add the new point into the array
// the 'push' command
trackLocationLayer.push(L.marker([position.coords.latitude,position.coords.longitude]).addTo(mymap)
);
}

function removePositionPoints() {
// disable the location tracking so that a new point won't be added while you are removing the old points
// use the geoLocationID to do this
navigator.geolocation.clearWatch(geoLocationID);
removeTracks();
}
function removeTracks(){
// now loop through the array and remove any points
// note that we start with the last point first as if you remove point 1 then point 2 becomes point 1 so
// a loop doesn't work
// also we use -1 as arrays in javascript start counting at 0
for (let i=trackLocationLayer.length-1; i > -1;i--) {
console.log("removing point "+i + " which has coordinates "+trackLocationLayer[i].getLatLng());
mymap.removeLayer(trackLocationLayer[i]);
// if you want to totally remove the points, you can also remove them
// from the array where they are stored, using the pop command
trackLocationLayer.pop();
}

}

// load map"use strict";
// the code is adapted from practicals in moodle
// global variable to store the map
function loadLeafletMap() {

// CODE TO INITIALISE AND CREATE THE MAP GOES HERE 
mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
 maxZoom: 19,
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);


// now call the code to add the markers
//addBasicMarkers();
} //end code to add the leaflet map