"use strict";
let busstopslayer;
function getBusStopsData() {
alert("loading busstopslayer");
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
 // use a different marker depending on this value
 // also include a pop-up that shows the place value of the earthquakes
 if (feature.properties.IIT_TYPE > 5) {
 return L.marker(latlng,
{icon:testMarkerGreen}).bindPopup("<b>"+"OBJECTID: "+feature.properties.OBJECTID +"</b>");
 }
 else {
 // magnitude is 1.75 or less
 return L.marker(latlng,
{icon:testMarkerPink}).bindPopup("<b>"+"OBJECTID: "+feature.properties.OBJECTID +"</b>");;
 }
 }, // end of point to layer
 }).addTo(mymap);

 console.log('loaded busstopslayer'); 
//  // change the map zoom so that all the data is shown
// mymap.fitBounds(earthquakelayer.getBounds());

} // end of the inner function
}); // end of the ajax request
}
function removeBusStopsData() {
    alert("Earthquake data will be removed");
// try {
// alert("Earthquake data will be removed");
// mymap.removeLayer( earthquakelayer );
// } catch (err) {
// alert("Layer does not exist :" + err);
// }
}