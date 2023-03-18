"use strict";
// the code is adapted from practicals in moodle
function loadLeafletMap() {

// CODE TO INITIALISE AND CREATE THE MAP GOES HERE 
mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
 maxZoom: 19,
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

} //end code to add the leaflet map





