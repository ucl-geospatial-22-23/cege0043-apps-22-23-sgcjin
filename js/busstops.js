"use strict";
let busstopslayer;
function getBusStopsData() {
console.log(document.location.origin + "/data/busstops.geojson");
let busstopURL = document.location.origin + "/data/busstops.geojson";

$.ajax({url: busstopURL, crossDomain: true,success: function(result){
console.log(result); // check that the data is correct
 
let testMarkerGreen = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'green'
 });
let testMarkerPink = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'pink'
 });

 // add the JSON layer onto the map - it will appear using the customised icons
//busstopslayer = L.geoJson(result).addTo(mymap);


// load the geoJSON layer
 busstopslayer = L.geoJson(result,
 {
 // use point to layer to create the points
 pointToLayer: function (feature, latlng){

 // use a different marker depending on IIT_TYPE
 if (feature.properties.IIT_TYPE > 5) {
 return L.marker(latlng,
{icon:testMarkerGreen}).bindPopup("<b>"+"OBJECTID: "+feature.properties.OBJECTID +"</b>");
 }
 else {
 // IIT_TYPE is 5 or less
 return L.marker(latlng,
{icon:testMarkerPink}).bindPopup("<b>"+"OBJECTID: "+feature.properties.OBJECTID +"</b>");;
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