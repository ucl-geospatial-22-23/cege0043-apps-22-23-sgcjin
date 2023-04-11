"use strict";
// create an array to store all the location tracking points
let trackLocationLayer = [];
// store the ID of the location tracker so that it can be used to switch the location tracking off
let geoLocationID;


function trackLocation() {

	
if (navigator.geolocation) {
 // test to see if there is an active tracking and clear it if so
 // so that we don’t have multiple tracking going on
 try {
 (navigator.geolocation.clearWatch(geoLocationID));
 //console.log(trackLocationLayer)
 }
 catch (e){
 // console.log(e);
 }
// clear any existing data from the map
removeTracks();
// need to tell the tracker what we will do with the coordinates – showPosition
// also what we will do if there is an error – errorPosition
// also set some parameters – e.g how often to renew, what timeout to set
const options = {
 enableHighAccuracy: true,
 maximumAge: 30000,
 timeout: 27000
};

geoLocationID = navigator.geolocation.watchPosition(showPosition, errorPosition, options);
}
else {
// document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
alert("Geolocation is not supported by this browser.")
}
	
}


function errorPosition(error){
 alert(error);
}



function showPosition(position) {
trackLocationLayer.push(L.marker([position.coords.latitude,position.coords.longitude]).addTo(mymap));
mymap.flyTo([position.coords.latitude,position.coords.longitude],15) // fly to user location
// loop through markers and find markers that near the user
mapPoint.eachLayer(function (layer) {
	let coordinates = layer.getLatLng();
	let distance = calculateDistance(position.coords.latitude, position.coords.longitude,
									 coordinates.lat,coordinates.lng, 'K');
	if (distance<0.1){
		// alert("Proximity alert: you are close to an asset you have created");
		// add a message in popup
		let popupHTML = layer.getPopup().getContent(); // get pop up
		// if the popup html doesn't have the alert message, add alert message
		if (!popupHTML.includes("<p><b>Proximity Alert! You are close to:</b> </p>")){
			popupHTML = "<p><b>Proximity Alert! You are close to:</b> </p>" + popupHTML // modify popup
		}
		layer.setPopupContent(popupHTML); // set pop up
		layer.openPopup(); // make the marker pops up automatically
	}
	
  });

	
	
}

// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
 let radlat1 = Math.PI * lat1/180;
 let radlat2 = Math.PI * lat2/180;
 let radlon1 = Math.PI * lon1/180;
 let radlon2 = Math.PI * lon2/180;
 let theta = lon1-lon2;
 let radtheta = Math.PI * theta/180;
 let subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
 let dist;
 subAngle = Math.acos(subAngle);
 subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
 dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
// where radius of the earth is 3956 miles
 if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
 if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
 return dist;
}







function removePositionPoints() {
// disable the location tracking so that a new point won't be added while you are removing the old points
// use the geoLocationID to do this
navigator.geolocation.clearWatch(geoLocationID);
removeTracks();
}
function removeTracks(){
// now loop through the array and remove any points
// note that we start with the last point first as if you remove point 1 then point 2 becomes point 1 so
// a loop doesn't work
// also we use -1 as arrays in javascript start counting at 0
for (let i=trackLocationLayer.length-1; i > -1;i--) {
//console.log("removing point "+i + " which has coordinates "+trackLocationLayer[i].getLatLng());
mymap.removeLayer(trackLocationLayer[i]);
// if you want to totally remove the points, you can also remove them
// from the array where they are stored, using the pop command
trackLocationLayer.pop();
}

}

