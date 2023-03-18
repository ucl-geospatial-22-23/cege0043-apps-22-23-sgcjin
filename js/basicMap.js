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
     let popUpHTML = getPopupHTML();
     console.log(popUpHTML);
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
htmlString = htmlString+ "<div>" + "Asset Name: "+asset_name + "</div><br>";
// now include a hidden element with the previous condition value
htmlString = htmlString + "<div id=previousCondition_" + id + " style='display: none;'>"+previousCondition+"</div>";
// and a hidden element with the ID of the asset so that we can insert the condition with the correct asset later
htmlString = htmlString + "<div id=asset_" + id + " style='display: none;'>"+id+"</div>";
htmlString = htmlString + "<div>"+"Asset Installation Date: "+installation_date + "</div><br>";
htmlString = htmlString + "<input type='radio' name='answer' id ='"+id+"_1'/>"+con_1+"<br>";
htmlString = htmlString + "<input type='radio' name='answer' id ='"+id+"_2'/>"+con_2+"<br>";
htmlString = htmlString + "<input type='radio' name='answer' id ='"+id+"_3'/>"+con_3+"<br>";
htmlString = htmlString + "<input type='radio' name='answer' id ='"+id+"_4'/>"+con_4+"<br>";
htmlString = htmlString + "<input type='radio' name='answer' id ='"+id+"_5'/>"+con_5+"<br>";
htmlString = htmlString + "<button onclick='checkCondition(" + id + ");return false;'>SAVE CONDITION BUTTON</button>";
htmlString = htmlString + "</div>";
return htmlString;
}

function checkCondition(id){
    let postString = "&asset_id="+id;

	// The previous condition (from the hidden field)
	let previousConditionValue = document.getElementById("previousCondition_"+id).value;
	// The ID of the asset (from the hidden field)
	let assetID = document.getElementById("assetID").value;
	let condition = "";
	
	if (document.getElementById(id+"_1").checked) {
 		 condition = document.getElementById(id+"_1").value;
	}
	if (document.getElementById(id+"_2").checked) {
 		 condition = document.getElementById(id+"_2").value;
	}
	if (document.getElementById(id+"_3").checked) {
 		 condition = document.getElementById(id+"_3").value;
	}
	if (document.getElementById(id+"_4").checked) {
 		 condition = document.getElementById(id+"_4").value;
	}
	if (document.getElementById(id+"_5").checked) {
 		 condition = document.getElementById(id+"_5").value;
	}
   
	if (condition == previousConditionValue){
		alert("The the selected condition is the same as the previous condition");
		postString = postString + "&condition="+condition
	}else{
		alert("The the selected condition is NOT the same as the previous condition");
		postString = postString + "&condition="+condition
	}
	processData(postString)    
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
