"use strict";
// the code is adapted from practicals in moodle
let mymap; // global variable to store the map

function loadLeafletMap() {

// CODE TO INITIALISE AND CREATE THE MAP GOES HERE 
mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
 maxZoom: 19,
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

// now add the click event detector to the map
mymap.on('click', onMapClick);
// now call the code to add the markers
addBasicMarkers();
} //end code to add the leaflet map


function addBasicMarkers() {
// CODE TO CREATE THE MARKERS GOES HERE

 let testMarkerPink = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'pink'
 });

	// add a circle
L.circle([51.508, -0.11], 5000, {
color: 'green',
fillColor: '#f03',
fillOpacity: 0.8
}).addTo(mymap).bindPopup("I am a circle.");

console.log("added a circle");

// add a polygon
let myPolygon = L.polygon([
[51.709, -0.10],
[51.703, 0.07],
[51.22, 0.07],
[51.22, -0.057]
],{
color: 'orange',
fillColor: '#f03',
fillOpacity: 0.5
}).addTo(mymap).bindPopup("I am a polygon in 2022.");

let geojsonFeature = {
 "type": "Feature",
 "properties": {
 "name": "London",
 "popupContent": "This is where UCL is based. We have on campus and off campus activity."
 },
 "geometry": {
 "type": "Point",
 "coordinates": [-0.132630, 51.522449]
}};

//L.geoJSON(geojsonFeature).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+""+geojsonFeature.properties.popupContent+"<b>");
L.geoJSON(geojsonFeature, {
 pointToLayer: function (feature, latlng) {
 return L.marker(latlng, {icon:testMarkerPink});
 }
 }).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+""+geojsonFeature.properties.popupContent+"<b>");


// add bustation polygon
var busStationLayer
let busStationFeature = {
 "type": "Feature",
 "properties": {
 "bus_station_id": "1",
 "last_repainted": "2019-03-20",
 "name": "Main Bus Station 302",
 "user_id": "user605",
 "ucl_user_id": "ucescj0"
 },
 "geometry": {
 "type": "Polygon",
 "coordinates": [[[-3.451296339904943, 52.62360030515013],
    [-3.448342837666167, 52.623636461349896],
    [-3.448431873717275, 52.62633251943749],
    [-3.451385557332611, 52.62629635973269],
    [-3.451296339904943, 52.62360030515013]]]
}};
busStationLayer=L.geoJSON(busStationFeature).addTo(mymap).
bindPopup("<b>"+busStationFeature.properties.name+"<b>");
// fit bounds of bus station
mymap.fitBounds(busStationLayer.getBounds());

// add waiting room polygon
let waitingRoomFeature = {
 "type": "Feature",
 "properties": {
 "waiting_room_id": "1",
 "bus_station_id": "1",
"opening_time": "5.3",
"closing_time": "23.3",
 "user_id": "user605",
 "ucl_user_id": "ucescj0"
 },
 "geometry": {
 "type": "Polygon",
 "coordinates": [[[-3.450572825965498, 52.624058693770685],
    [-3.449096059732196, 52.624076772162645],
    [-3.449155447329065, 52.625874143637304],
    [-3.45063227402122, 52.62585606407699],
    [-3.450572825965498, 52.624058693770685]]]
}};

L.geoJSON(waitingRoomFeature,{
color: 'orange',
fillColor: '#f03',
fillOpacity: 0.5
}).addTo(mymap).bindPopup("<b>"+waitingRoomFeature.properties.waiting_room_id+"<b>");
console.log("added polygons");







} // end code to add the basic markers


// create a custom popup as a global variable
let popup = L.popup();
// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you
function onMapClick(e) {
popup
.setLatLng(e.latlng)
.setContent("You clicked the map at " + e.latlng.toString())
.openOn(mymap);
}

