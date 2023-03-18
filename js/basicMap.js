"use strict";
let width; // NB – keep this as a global variable
let popup; // keep this as a global variable
let mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized


function loadLeafletMap() {

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
     let popUpHTML = getPopupHTML;
     console.log(popUpHTML);
    // use the mapPoint variable so that we can remove this point layer on
    mapPoint= L.geoJSON(geojsonFeature).addTo(mymap).bindPopup(popUpHTML);
    mymap.setView([51.522449,-0.13263], 12)

}


function getPopupHTML(){
// (in the final assignment, all the required values for the asset pop-up will be
//derived from feature.properties.xxx – see the Earthquakes code for how this is done)
let id = "1272"; // this will be the asset ID
let surname = "Ellul";
let name = "Claire";
let module="CEGE0043";
let language = "English";
let lecturetime = "6am";
let previousCondition = 3;
 let htmlString = "<DIV id='popup'"+ id+ "><h2>" + name + "</h2><br>";
 htmlString = htmlString + "<h3>"+surname + "</h3><br>";
 htmlString = htmlString + "<input type='radio' name='answer' id ='"+id+"_1'/>"+module+"<br>";
 htmlString = htmlString + "<input type='radio' name='answer' id ='"+id+"_2'/>"+language+"<br>";
 htmlString = htmlString + "<input type='radio' name='answer' id ='"+id+"_3'/>"+lecturetime+"<br>";
 htmlString = htmlString + "<button onclick='checkCondition(" + id + ");return false;'>SubmitCondition</button>";
 // now include a hidden element with the previous condition value
 htmlString = htmlString + "<div id=previousCondition_" + id + "hidden>"+previousCondition+"</div>";
// and a hidden element with the ID of the asset so that we can insert the condition with the correct asset later
 htmlString = htmlString + "<div id=asset_ " + id + " hidden>"+id+"</div>";
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
let mylet = '<label for="name">Name</label><input type="text" size="25" id="name"/><br />'+
'<label for="surname">Surname</label><input type="text" size="25" id="surname"/><br />'+
'<label for="module">Module</label><input type="text" size="25" id="module"/><br />'+
''+
''+
'<p>Would you like lectures in the morning or afternoon?</p>'+
' Morning: <input type="radio" name="amorpm" id="morning" /><br />'+
' Afternoon: <input type="radio" name="amorpm" id ="afternoon"/><br />'+
''+
''+
''+
'<p>Which modules are you taking?</p>'+
' CEGEG077: <input type="checkbox" name="modules" id = check1 value="CEGEG077"checked="yes" /><br />'+
' CEGEG129: <input type="checkbox" name="modules" id = check2 value="CEGEG129" /><br />'+
' CEGEG082: <input type="checkbox" name="modules" id = check3 value="CEGEG082" /><br />'+
' CEGEG034: <input type="checkbox" name="modules" id = check4 value="CEGEG034" /><br />'+
''+
'<p>What is your first language?</p>'+
'<select name="languageselectbox" id="languageselectbox">'+

' <option >English </option>'+
' <option>Mandarin</option>'+
' <option>Greek</option>'+
' <option>Italian</option>'+
' <option>Spanish</option>'+
' <option>Other</option>'+
''+
'</select>'+
'<br />'+
'<br />'+
'<label for="latitude">Latitude</label><input type="text" size="25" id="latitude"/><br />'+
'<label for="longitude">Longitude</label><input type="text" size="25" id="longitude"/><br />'+
''+
''+
'<p>Click here to upload the data</p>'+
'<button id="startUpload" onclick="startDataUpload()">Start Data Upload</button>'+
'<br />'+
'<br />'+
'<div id="dataUploadResult">The result of the upload goes here</div>'+
'<br />'+
'<br />'+
''+
'<hr>'+
'<hr>'+
''+
'<label for="deleteID">Delete ID</label><input type="text" size="25" id="deleteID"/><br />'+
'<button id="startDelete" onclick="deleteRecord()">Delete Record</button>'+
'<div id="dataDeleteResult">The result of the upload goes here</div>';

return mylet;
}
