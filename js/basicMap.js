"use strict";
let width; // NB – keep this as a global variable
let popup; // keep this as a global variable
let mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized
let mymap;

function loadMap() {
    // CODE TO INITIALISE AND CREATE THE MAP GOES HERE 
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);
   window.addEventListener('resize', setMapClickEvent);
  setMapClickEvent();
} //end code to add the leaflet map


function setMapClickEvent() {
     // get the window width
     width = $(window).width();
     // we use the bootstrap Medium and Large options for the asset location capture
     // and the small and XS options for the condition option
     // see here: https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
     if (width < 992) {
         //the condition capture –
         //anything smaller than 992px is defined as 'medium' by bootstrap
         // remove the map point if it exists
         if (mapPoint){
             mymap.removeLayer(mapPoint);
         }
         // cancel the map onclick event using off ..
         mymap.off('click',onMapClick)
         // set up a point with click functionality
         // so that anyone clicking will add asset condition information
         setUpPointClick();
     }
     else { // the asset creation page
         // remove the map point if it exists
         if (mapPoint){
             mymap.removeLayer(mapPoint);
     }
     // the on click functionality of the MAP should pop up a blank asset creation form
         mymap.on('click', onMapClick);
     }
} // end of setMapClickEvent

function setUpPointClick() {
     // create a geoJSON feature (in your assignment code this will be replaced
     // by an AJAX call to load the asset points on the map
     let geojsonFeature = {
     "type": "Feature",
     "properties": {
     "name": "London",
     "popupContent": "This is where UCL is based"
     },
     "geometry": {
     "type": "Point",
     "coordinates": [-0.13263, 51.522449]
     }
     };
     // and add it to the map and zoom to that location
     // the on click functionality of the POINT should pop up partially populated condition form so that the user can select the condition they require
     let popUpHTML = getPopupHTML();
    // use the mapPoint variable so that we can remove this point layer on
    mapPoint= L.geoJSON(geojsonFeature).addTo(mymap).bindPopup(popUpHTML);
    mymap.setView([51.522449,-0.13263], 12)

}


function getPopupHTML(){
// (in the final assignment, all the required values for the asset pop-up will be
//derived from feature.properties.xxx – see the Earthquakes code for how this is done)
let id = "2"; // this will be the asset ID
let asset_name = "UCL";
let installation_date = "2023";
let user_id="user_id";
// condition values
let con_1 = "Element is in very good condition";
let con_2 = "Some aesthetic defects, needs minor repair";
let con_3 = "Functional degradation of some parts, needs maintenance";
let con_4 = "Not working and maintenance must be done as soon as reasonably possible";
let con_5 = "Not working and needs immediate, urgent maintenance";
let asset_id = "2";
let previousCondition = con_1;
let htmlString = "<DIV id='popup'"+ id+ ">";
htmlString = htmlString+ "<div id=asset_name_" + id + " value='"+asset_name+"'>Asset Name: "+asset_name+"</div>";
// now include a hidden element with the previous condition value
htmlString = htmlString + "<div id=previousCondition_" + id + " style='display: none;'>"+previousCondition+"</div>";
// and a hidden element with the ID of the asset so that we can insert the condition with the correct asset later
htmlString = htmlString + "<div id=asset_" + id + " style='display: none;'>"+id+"</div>";
htmlString = htmlString + "<div id=user_" + id +" style='display: none;'>"+user_id+"</div>";
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
 let formHTML = basicFormHtml();
 //debug
 popup = L.popup();

 popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()+"<br>"+formHTML).openOn(mymap);

}



function basicFormHtml() {

var myvar = '<div>'+
'<label for="asset_name">Asset Name: </label><input type="text" size="25" id="asset_name"/><br />'+
'<label for="installation_date">Installation Date: </label><input type="text" size="25" id="installation_date"/><br />'+
'<label for="latitude">Latitude: </label><input type="text" size="25" id="latitude"/><br />'+
'<label for="longitude">Longitude: </label><input type="text" size="25" id="longitude"/><br />'+
'<div id="user_id" style="display: none;">2</div>'+
'<button id="startUpload" onclick="saveNewAsset()">saveAsset</button>'+
'</div>';
return myvar;
}
