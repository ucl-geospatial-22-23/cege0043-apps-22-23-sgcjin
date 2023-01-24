"use strict";
let busstopslayer;
function getBusStopsData() {
console.log(document.location.origin + "/data/busstops.geojson");
let busstopURL = document.location.origin + "/data/busstops.geojson";

$.ajax({url: busstopURL, crossDomain: true,success: function(result){
console.log(result); // check that the data is correct
 
 let testMarkerRed = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'red'
 });
 let testMarkerGray = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'gray'
 });

 let testMarkerPink = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'pink'
 });
 let testMarkerBlue = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'blue'
 });
 let testMarkerPurple = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'purple'
 });
 let testMarkerGreen = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'green'
 });
 let testMarkerBlack = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'black'
 });
 let testMarkerOrange = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'orange'
 });



// load the geoJSON layer
 busstopslayer = L.geoJson(result,
 {
 // use point to layer to create the points
 pointToLayer: function (feature, latlng){

if (feature.properties.IIT_METHOD == '1') {
 return L.marker(latlng, {icon: testMarkerGray
}).bindPopup("<b>"+feature.properties.IIT_METHOD +"</b>");
 }
 else if (feature.properties.IIT_METHOD =='2') {
 return L.marker(latlng, {icon:testMarkerOrange}).bindPopup("<b>"+
feature.properties.IIT_METHOD +"</b>");
 }
 else if (feature.properties.IIT_METHOD =='3') {
 return L.marker(latlng, {icon:testMarkerPurple}).bindPopup("<b>"+
feature.properties.IIT_METHOD +"</b>");
 }
 else if (feature.properties.IIT_METHOD == '4') {
 return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+
feature.properties.IIT_METHOD +"</b>");
 }
 else if (feature.properties.IIT_METHOD =='9') {
 return L.marker(latlng, {icon:testMarkerBlue}).bindPopup("<b>"+
feature.properties.IIT_METHOD +"</b>");
 }
 else {
 return L.marker(latlng, {icon:testMarkerBlack}).bindPopup("<b>"+
feature.properties.IIT_METHOD +"</b>");;
 }

 }, // end of point to layer
 }).addTo(mymap);

 console.log('loaded busstopslayer'); 
//  // change the map zoom so that all the data is shown
mymap.fitBounds(busstopslayer.getBounds());

} // end of the inner function
}); // end of the ajax request
}
function removeBusStopsData() {
try {
alert("Bus stops data will be removed");
mymap.removeLayer( busstopslayer );
} catch (err) {
alert("Layer does not exist :" + err);
}
}