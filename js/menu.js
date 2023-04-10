"use strict";
// check if layer is already loaded
function loadedOrNot(name) {
  for (var i=0;i<listOfThings.length ;i++){
 if (layerlist[i][0] == name){
 return true;
 } }
    return false;}

// remove all layer except tile layer
function removeAllLayer() {
    mymap.eachLayer(function (layer) {
  // Check if the layer is not a tile layer (base layer)
  if (!(layer instanceof L.TileLayer)) {
    mymap.removeLayer(layer);
  }
});
}

// remove a layer by name
function removelayers(name){
      for (var i=0;i<layerlist.length ;i++){
     // use a loop to use layer name to delete layers
     if (layerlist[i][0] == name){
     mymap.removeLayer(layerlist[i][1]);
     layerlist.splice(i,1);
     }
}}



function listOfAssets(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is listOfAssets and menu is called by: "+ sCallerName);
}
// menu 2
function dailyReportingRates(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is dailyReportingRates and menu is called by: "+ sCallerName);
}
function help(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is help and menu is called by: "+ sCallerName);
    mymap.removeLayer(mapPoint);
}
// menu 5
function userRanking(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is userRanking and menu is called by: "+ sCallerName);
}

// S2: showing the 5 assets closest to the user’s current location, added by any user    
function add5ClosestAssets(){
loadDefaultConditionFlag = false;
removeAllLayer();
removePositionPoints();

navigator.geolocation.getCurrentPosition(function(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    $.ajax({url:baseURL+"/api/geojson/userFiveClosestAssets/"+latitude+"/"+longitude,
    	crossDomain: true,
 		success: function(result){
    // use the mapPoint and add it to the map  
    let closestAssets = L.geoJson(result,
     {

      // use point to layer to create the points
     pointToLayer: function (feature, latlng){
     // pass geoJSON features and conditions to construct popUpHTML
    let popUpHTML = "<div>Asset Name:"+feature.properties.asset_name +
"</div><br /><div>Installation Date:"+feature.properties.installation_date+" </div>";
    // set all initial color using getIconByValue
    return L.marker(latlng).bindPopup(popUpHTML);
      
     }, // end of point to layer          
     }).addTo(mymap);// end of mappoint            
    layerlist.push(["closestAssets",closestAssets]);
     
    // fit bounds
    mymap.fitBounds(closestAssets.getBounds());  
    
    }}); //end of the AJAX call of userAssets
});//end of getCurrentPosition

}

    
// menu 8
function remove5ClosestAssets(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is remove5ClosestAssets and menu is called by: "+ sCallerName);
}
function add5LastReports(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is add5LastReports and menu is called by: "+ sCallerName);
}
// menu 11
function remove5LastReports(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is remove5LastReports and menu is called by: "+ sCallerName);
}
function addNotRated(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is addNotRated and menu is called by: "+ sCallerName);
}
// menu 14
function removeNotRated(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is removeNotRated and menu is called by: "+ sCallerName);
}
