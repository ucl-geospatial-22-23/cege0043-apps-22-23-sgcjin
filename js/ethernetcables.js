"use strict";
let ethernetCables;
// the code is adapted from practicals in moodle

function getEthernetData(){

console.log(document.location.origin + "/data/ethernet.geojson");
let ethernetURL = document.location.origin + "/data/ethernet.geojson";

$.ajax({url: ethernetURL, crossDomain: true,success: function(result){
console.log(result); // check that the data is correct
 
let style1 = {
 "color": "#ea3008",
 "weight": 10,
 "opacity": 0.65
 };
 let style2 = {
 "color": "#08EA3E",
 "weight": 10,
 "opacity": 0.65
 };
 let style3 = {
 "color": "#0811EA",
 "weight": 10,
 "opacity": 0.65
 };


// load the geoJSON layer
 ethernetCables = L.geoJSON().addTo(mymap);
 ethernetCables.addData(result);
 // iterate over the lines and set style depending on district
 ethernetCables.eachLayer(function(layer) {
 console.log(layer);
switch (layer.feature.properties.criticality) {
 case 2:
 layer.setStyle(style1);
 break;
 case 3:
 layer.setStyle(style2);
 break;
 default:
 layer.setStyle(style2);
 }
});

 // change the map zoom so that all the data is shown
 mymap.fitBounds(ethernetCables.getBounds());


} // end of the inner function
}); // end of the ajax request

}
function removeEthernetData(){
alert("Ethernet cables data will be removed");
}