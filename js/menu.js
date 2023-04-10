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
    layerlist=[]; // clear all layers in layer list
}

// remove a layer by name
function removelayers(name){
      for (var i=0;i<layerlist.length ;i++){
     // use a loop to use layer name to delete layers
     if (layerlist[i][0] == name){
     mymap.removeLayer(layerlist[i][1]);
     layerlist.splice(i,1);// remove from layer list
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
}

// alert user ranking
function userRanking(){
let user_id = document.getElementById("hidden_user_id").innerHTML; // get user id
    
    $.ajax({url:baseURL+"/api/geojson/userRanking/"+user_id,
    	crossDomain: true,
 		success: function(result){
            alert("Your ranking is: "+result[0].array_to_json[0].rank);
}}); //end of the AJAX call        
}

// S2: showing the 5 assets closest to the user’s current location, added by any user    
function add5ClosestAssets(){
loadDefaultConditionFlag = false; // stop loading condition asst points
removeAllLayer(); // remove all other point layers
removePositionPoints(); // stop tracking
// set default color to blue
 let testMarkerBlue = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'blue'
 });
navigator.geolocation.getCurrentPosition(function(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // request userFiveClosestAssets
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
    return L.marker(latlng,
    {icon:testMarkerBlue}).bindPopup(popUpHTML);
      
     }, // end of point to layer          
     }).addTo(mymap);// end of mappoint            
    layerlist.push(["closestAssets",closestAssets]);
     
    // fit bounds
    mymap.fitBounds(closestAssets.getBounds());  
    
    }}); //end of the AJAX call of userAssets
});//end of getCurrentPosition

}

    
// remove 5 Closest Assets layer
function remove5ClosestAssets(){
removelayers("closestAssets"); // remove 5ClosestAssets layer
loadDefaultConditionFlag = true; // allow  condition asst points to load when resized and < conditionWidth
setUpConditionBaseLayer();// start loading condition asst points
trackLocation(); // start tracking

}
// add 5 last report layer
function add5LastReports(){
    loadDefaultConditionFlag = false; // stop loading condition asst points
    removeAllLayer(); // remove all other point layers
    removePositionPoints(); // stop tracking
    // get condition values first
    $.ajax({url:baseURL+"/api/geojson/conditionDetails",crossDomain: true, success: function(result){
     
    let conditions = []; // variable to store conditions
     // loop and parse condition_descriptions 
     for (let i =0;i<JSON.parse(JSON.stringify(result)).length;i++){
      conditions.push(JSON.parse(JSON.stringify(result))[i].condition_description);
     }
    let user_id = document.getElementById("hidden_user_id").innerHTML; // get user id
    
    $.ajax({url:baseURL+"/api/geojson/lastFiveConditionReports/"+user_id,
    	crossDomain: true,
 		success: function(result){
    // use the mapPoint and add it to the map  
    let lastReports = L.geoJson(result,
     {

      // use point to layer to create the points
     pointToLayer: function (feature, latlng){
     // pass geoJSON features and conditions to construct popUpHTML
    let popUpHTML = "<div>Asset Name:"+feature.properties.asset_name +
"</div><br /><div>Condition Description:"+feature.properties.condition_description+"</div>";
    // set all initial color using getIconByValue
    return L.marker(latlng,{icon:getIconByValue(feature,conditions)}).bindPopup(popUpHTML);    
     }, // end of point to layer          
     }).addTo(mymap);// end of mappoint            
    layerlist.push(["lastReports",lastReports]);
     
    // fit bounds
    mymap.fitBounds(lastReports.getBounds());  
    
    }}); //end of the AJAX call of userAssets
     }}); //end of the AJAX call of condition details    
}

// menu 11
function remove5LastReports(){
removelayers("lastReports"); // remove 5ClosestAssets layer
loadDefaultConditionFlag = true; // allow  condition asst points to load when resized and < conditionWidth
setUpConditionBaseLayer();// start loading condition asst points
trackLocation(); // start tracking

}

function addNotRated(){
    loadDefaultConditionFlag = false; // stop loading condition asst points
    removeAllLayer(); // remove all other point layers
    removePositionPoints(); // stop tracking
     // create color icon
     let testMarkerBlue = L.AwesomeMarkers.icon({
     icon: 'play',
     markerColor: 'blue'
     });
    let user_id = document.getElementById("hidden_user_id").innerHTML; // get user id
    
    $.ajax({url:baseURL+"/api/geojson/conditionReportMissing/"+user_id,
    	crossDomain: true,
 		success: function(result){
    if (!result.feature){
        alert("There are NO assets that you haven't rated in last 3 days.")
        return;
    }
    // use the mapPoint and add it to the map  
    let notRated = L.geoJson(result,
     {

      // use point to layer to create the points
     pointToLayer: function (feature, latlng){
    console.log(result);
     // pass geoJSON features and conditions to construct popUpHTML
    let popUpHTML = "<div>Asset Name:"+feature.properties.asset_name +
"</div>";
    // set all initial color using getIconByValue
    return L.marker(latlng,{icon:testMarkerBlue}).bindPopup(popUpHTML);    
     }, // end of point to layer          
     }).addTo(mymap);// end of mappoint            
    layerlist.push(["notRated",notRated]);
     
    // fit bounds
    mymap.fitBounds(notRated.getBounds());  
    
    }
           }); //end of the AJAX call of userAssets
}

// menu 14
function removeNotRated(){
removelayers("notRated"); // remove 5ClosestAssets layer
loadDefaultConditionFlag = true; // allow  condition asst points to load when resized and < conditionWidth
setUpConditionBaseLayer();// start loading condition asst points
trackLocation(); // start tracking
}
