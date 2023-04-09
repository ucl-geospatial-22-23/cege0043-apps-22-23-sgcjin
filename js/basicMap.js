"use strict";
let width; // NB – keep this as a global variable
let popup; // keep this as a global variable
let mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized
let mymap;
//let baseURL = document.location.origin;
baseURL = "https://cege0043-7.cs.ucl.ac.uk";
let layerlist = [];
var userID;// store user id that loaded at set up

function loadMap() {
    // CODE TO INITIALISE AND CREATE THE MAP GOES HERE 
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);

   window.addEventListener('resize', setMapClickEvent);
 // set up user id
 let theURL =  baseURL+"/api/userID";
    $.ajax({url:theURL,
      // allow requests from other servers
    	crossDomain: true,

      // if the response is succesful then ..
 		success: function(result){
        userID = JSON.parse(JSON.stringify(result))[0].user_id;
        // update hidden user id, use it as a global variable
        document.getElementById("hidden_user_id").innerHTML=userID;      
         setMapClickEvent()
    }}); //end of the AJAX call
}
//end code to add the leaflet map


// check current number of layers
function countlayers(){
     let layerCount = 0;
    mymap.eachLayer(function (layer) {
      layerCount++;
    });
    console.log("Number of layers:", layerCount);
    console.log(layerlist);
}




function setMapClickEvent() {

     // get the window width
     width = $(window).width();
     // we use the bootstrap Medium and Large options for the asset location capture
     // and the small and XS options for the condition option
     // see here: https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
     if (width < 992) {
         //the condition capture –
         //anything smaller than 992px is defined as 'medium' by bootstrap
         
      // cancel the map onclick event using off ..
         mymap.off('click',onMapClick);
      // remove the map point if it exists
         if(mapPoint){
             removeAllLayer();
             mymap.addLayer(mapPoint);
             trackLocation();
         }else{         
         // set up a point with click functionality
         // so that anyone clicking will add asset condition information
         setUpPointClick();
         trackLocation();

         }

     }
     else { // the asset creation page
         // remove the map point if it exists
         if(mapPoint){
          // remove all layers
        removeAllLayer();
          // stop tracking
        removePositionPoints();
     }
     // the on click functionality of the MAP should pop up a blank asset creation form
         mymap.on('click', onMapClick);
     }
} // end of setMapClickEvent

function setUpPointClick() {
 
    // get condition values first
    $.ajax({url:baseURL+"/api/geojson/conditionDetails",crossDomain: true, success: function(result){
     
    let conditions = []; // variable to store conditions
     // loop and parse condition_descriptions 
     for (let i =0;i<JSON.parse(JSON.stringify(result)).length;i++){
      conditions.push(JSON.parse(JSON.stringify(result))[i].condition_description);
     }
     
     // get pre loaded user_id
     let user_id=document.getElementById("hidden_user_id").innerHTML;
     // use an AJAX call to load the asset points on the map
    $.ajax({url:baseURL+"/api/geojson/userAssets/"+user_id,crossDomain: true, success: function(result){
    
    
    // use the mapPoint and add it to the map  
    mapPoint = L.geoJson(result,
     {
      // use point to layer to create the points
     pointToLayer: function (feature, latlng){
     // pass geoJSON features and conditions to construct popUpHTML
    let popUpHTML = getPopupHTML(feature,conditions);
    // set all initial color using getIconByValue
    return L.marker(latlng,
    {icon:getIconByValue(feature,conditions)}).bindPopup(popUpHTML);
      
     }, // end of point to layer          
     }).addTo(mymap);// end of mappoint
    layerlist.push(["mapPoint",mapPoint]);
    
    }}); //end of the AJAX call of userAssets
         
    }}); //end of the AJAX call of condition

}


function getIconByValue(feature,conditions) {
 // create color icon
 let testMarkerBlue = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'blue'
 });
 let testMarkerGreen = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'green'
 });
let testMarkerPink = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'pink'
 });
 let testMarkerRed = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'red'
 });
 let testMarkerGray = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'gray'
 });
  let testMarkerPurple = L.AwesomeMarkers.icon({
 icon: 'play',
 markerColor: 'purple'
 });

 // assign color icon according to condition
  switch (feature.properties.condition_description) {
    case "Unknown": // if unknown OR other values, return grey
      return testMarkerGray;
    case conditions[0]:
      return testMarkerBlue;
    case conditions[1]:
      return testMarkerGreen;
    case conditions[2]:
      return testMarkerPink;
    case conditions[3]:
      return testMarkerRed;
    case conditions[4]:
      return testMarkerPurple;
    default: // if unknown OR other values, return grey
      return testMarkerGray;
  }
   
}






function getPopupHTML(feature,conditions){

// get required values from geoJson feature
let id = feature.properties.asset_id; // this will be the asset ID
let asset_name = feature.properties.asset_name;
let installation_date = feature.properties.installation_date;
let user_id = document.getElementById("hidden_user_id").innerHTML;
let previousCondition = feature.properties.condition_description;
// condition values
let con_1 = conditions[0];
let con_2 = conditions[1];
let con_3 = conditions[2];
let con_4 = conditions[3];
let con_5 = conditions[4];

let htmlString = "<DIV id='popup'"+ id+ ">";
htmlString = htmlString+ "<div id=asset_name_" + id + " value='"+asset_name+"'>Asset Name: "+asset_name+"</div>";
// now include a hidden element with the previous condition value
htmlString = htmlString + "<div id=previousCondition_" + id + " style='display: none;'>"+previousCondition+"</div>";
// and a hidden element with the ID of the asset so that we can insert the condition with the correct asset later
htmlString = htmlString + "<div id=asset_" + id + " style='display: none;'>"+id+"</div>";
htmlString = htmlString + "<div id=user_id" +" style='display: none;'>"+user_id+"</div>";
htmlString = htmlString + "<div id=installation_date value='"+installation_date+"'>Asset Installation Date: "+installation_date+"</div>";
htmlString = htmlString + "<input type='radio' name='answer' value='"+con_1+"' id ='"+id+"_1'/>"+con_1+"<br/>";
htmlString = htmlString + "<input type='radio' name='answer' value='"+con_2+"' id ='"+id+"_2'/>"+con_2+"<br/>";
htmlString = htmlString + "<input type='radio' name='answer' value='"+con_3+"' id ='"+id+"_3'/>"+con_3+"<br/>";
htmlString = htmlString + "<input type='radio' name='answer' value='"+con_4+"' id ='"+id+"_4'/>"+con_4+"<br/>";
htmlString = htmlString + "<input type='radio' name='answer' value='"+con_5+"' id ='"+id+"_5'/>"+con_5+"<br/>";
htmlString = htmlString + "<button onclick='checkCondition(" + id + ");return false;'>SAVE CONDITION BUTTON</button>";
htmlString = htmlString + "</div>";

return htmlString;

}



function onMapClick(e) {
 let formHTML = '<div>'+
'<label for="asset_name">Asset Name </label><input type="text" size="25" id="asset_name"/><br />'+
'<label for="installation_date">Installation Date </label><input type="text" size="25" id="installation_date"/><br />'+
'<div id="latitude" value= "'+e.latlng.lat.toString()+'">Latitude: '+e.latlng.lat.toString()+'</div><br />'+
'<div id="longitude" value= "'+e.latlng.lng.toString()+'">Longitude: '+e.latlng.lng.toString()+'</div><br />'+
'<div id="user_id" style="display: none;">'+ document.getElementById("hidden_user_id").innerHTML+'</div>'+
'<button id="startUpload" onclick="saveNewAsset()">saveAsset</button>'+
'</div>';

 popup = L.popup();
 popup.setLatLng(e.latlng).setContent(formHTML).openOn(mymap);

}



