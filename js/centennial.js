"use strict";
let baseComputerAddress = document.location.origin;
let dataAddress="/api/geojson/ucfscde/temperature_sensors/sensor_id/location";
let layerURL = baseComputerAddress + dataAddress;
let mymap;
// create an empty array
let  listOfThings = []

function loadThing(thingname) {
 // first check if the thing is loaded already
 for (var i=0;i<listOfThings.length ;i++){
 if (listOfThings[i][1] == thingname){
 console.log("equal");
 alert("Thing already loaded");
 return;
 }
 }

let thingURL = document.location.origin + "/api/geojson/ucfscde"+thingname;
 $.ajax({url: thingURL, crossDomain: true,success: function(result){
 console.log(result); // check that the data is correct
let newThing = [result,thingname]
 // now add the thing into the array so that we can reference it later on
 // push adds an item to the top of the array
 console.log(newThing[1]);
  listOfThings.push(newThing);
  listAllThings()
 } // end of the inner function
 }); // end of the ajax request
}


function listAllThings() {
 console.log("*********************************");
 console.log("********Current Things *********");
 for (var i=0;i<listOfThings.length;i++){
 console.log(listOfThings[i][1]);
 }
 console.log("*********************************");
}

function removeThing(thingname){
 for (var i=0;i<listOfThings.length ;i++){
 if (listOfThings[i][1] == thingname){
 console.log("equal");
 listOfThings.splice(i,1);
listAllThings()
// don't continue the loop as we now have 1 less element in the array which means
// that when we try to get the last element it won't be there any more
 break;
 }
 }
}