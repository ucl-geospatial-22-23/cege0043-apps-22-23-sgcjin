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
busStationLayer=L.geoJSON(busStationFeature,{
color: 'green',
fillColor: '#f03',
fillOpacity: 0.2
}).addTo(mymap).
bindPopup(
    "<b>"+busStationFeature.properties.name+"</b>"+
"<br>"+"bus_station_id: "+busStationFeature.properties.bus_station_id+
"<br>"+"last_repainted: "+busStationFeature.properties.last_repainted+
"<br>"+"user_id: "+busStationFeature.properties.user_id+"<br>"+
"ucl_user_id: "+busStationFeature.properties.ucl_user_id
    );
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
}).addTo(mymap).bindPopup(
"<b>"+"waiting_room_id: "+
waitingRoomFeature.properties.waiting_room_id+"</b>"+"<br>"+
"bus_station_id: "+waitingRoomFeature.properties.bus_station_id+
"<br>"+"opening_time: "+waitingRoomFeature.properties.opening_time+
"<br>"+"closing_time: "+waitingRoomFeature.properties.closing_time+
"<br>"+"user_id: "+waitingRoomFeature.properties.user_id+"<br>"+
"ucl_user_id: "+waitingRoomFeature.properties.ucl_user_id
);

// add sensors points
let sensorsFeature = {
"type":"FeatureCollection","features": [
{
"type": "Feature",
 "properties": {
 "sensor_make": "UCL Sensors 302",
 "sensor_installation_date": "2023-09-19",
"sensor_id": "1",
"waiting_room_id": "1",
 "user_id": "user605",
 "ucl_user_id": "ucescj0"
 },
 "geometry": {
 "type": "Point",
 "coordinates": [-3.449849296912167, 52.624517078045535]}
},
{
"type": "Feature",
 "properties": {
 "sensor_make": "UCL Sensors 202",
 "sensor_installation_date": "2023-09-23",
"sensor_id": "2",
"waiting_room_id": "1",
 "user_id": "user605",
 "ucl_user_id": "ucescj0"
 },
 "geometry": {
 "type": "Point",
 "coordinates": [-3.449776051975446, 52.62453595566769]}
},
{
"type": "Feature",
 "properties": {
 "sensor_make": "UCL Sensors 151",
 "sensor_installation_date": "2023-09-25",
"sensor_id": "3",
"waiting_room_id": "1",
 "user_id": "user605",
 "ucl_user_id": "ucescj0"
 },
 "geometry": {
 "type": "Point",
 "coordinates": [-3.449705183393333, 52.62462672809025]}
}
]
}

L.geoJSON(sensorsFeature,
 {
 // use point to layer to create the points
 pointToLayer: function (feature, latlng){
 return L.marker(latlng,
{icon:testMarkerPink}).bindPopup("<b>"+feature.properties.sensor_make +"</b>"+"<br>"+
"sensor_installation_date: "+
feature.properties.sensor_installation_date+"<br>"+"sensor_id: "+feature.properties.sensor_id+
"<br>"+"waiting_room_id: "+feature.properties.waiting_room_id+"<br>"+
"user_id: "+feature.properties.user_id+"<br>"+"ucl_user_id: "+feature.properties.ucl_user_id);
 
 }, // end of point to layer
 }).addTo(mymap);

} // end code to add the basic markers


// create a custom popup as a global variable
let popup = L.popup();
// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
function onMapClick(e) {
popup
.setLatLng(e.latlng)
.setContent("You clicked the map at " + e.latlng.toString())
.openOn(mymap);
}

