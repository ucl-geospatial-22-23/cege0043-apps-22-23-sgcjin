"use strict";
// create an array to store all the location tracking points
let trackLocationLayer;
// store the ID of the location tracker so that it can be used to switch the location tracking off
let geoLocationID;


function trackLocation() {


    if (navigator.geolocation) {
        // test to see if there is an active tracking and clear it if so
        // so that we don’t have multiple tracking going on
        try {
            (navigator.geolocation.clearWatch(geoLocationID));
            //console.log(trackLocationLayer)
        } catch (e) {
            // console.log(e);
        }
        // need to tell the tracker what we will do with the coordinates – showPosition
        // also what we will do if there is an error – errorPosition
        // also set some parameters – e.g how often to renew, what timeout to set
        const options = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        };

        geoLocationID = navigator.geolocation.watchPosition(showPosition, errorPosition, options);
    } else {
        alert("Geolocation is not supported by this browser.")
    }

}


function errorPosition(error) {
    alert("Failed to tarck your location: "+error);
}



function showPosition(position) {
    // clear any existing marker from the map
    removeTracks();
    trackLocationLayer = L.marker([position.coords.latitude, position.coords.longitude])
        .bindPopup("Latitude: "+position.coords.latitude+" Longitude: "+position.coords.longitude)
        .addTo(mymap);
    
    mymap.flyTo([position.coords.latitude, position.coords.longitude], 14) // fly to user location

    // store the closest point that < 25m
    let closePoint;
    // set the initial minimum distance, any value larger than 0.025 is okay
    let minDistance = 10;
    
    // loop through markers and find markers that near the user
    mapPoint.eachLayer(function(layer) {
        let coordinates = layer.getLatLng();
        let distance = calculateDistance(position.coords.latitude, position.coords.longitude,
            coordinates.lat, coordinates.lng, 'K');
        // if the distance is small than 25m 
        if (distance < 0.025 && distance<minDistance) {
            closePoint = layer;
            minDistance = distance;
        }

    }); // end of eachLayer

    if(closePoint){
        // add a message in popup
        let popupHTML = closePoint.getPopup().getContent(); // get pop up
        // if the popup html doesn't have the alert message, add alert message
        if (!popupHTML.includes("<p><b>Proximity Alert! You are close to:</b> </p>")) {
            popupHTML = "<p><b>Proximity Alert! You are close to:</b> </p>" + popupHTML // modify popup
        }
        closePoint.setPopupContent(popupHTML); // set pop up
        closePoint.openPopup(); // make the marker pops up automatically
    }



}

// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1 / 180;
    let radlat2 = Math.PI * lat2 / 180;
    let radlon1 = Math.PI * lon1 / 180;
    let radlon2 = Math.PI * lon2 / 180;
    let theta = lon1 - lon2;
    let radtheta = Math.PI * theta / 180;
    let subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    let dist;
    subAngle = Math.acos(subAngle);
    subAngle = subAngle * 180 / Math.PI; // convert the degree value returned by acos back to degrees from radians
    dist = (subAngle / 360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
    // where radius of the earth is 3956 miles
    if (unit == "K") {
        dist = dist * 1.609344;
    } // convert miles to km
    if (unit == "N") {
        dist = dist * 0.8684;
    } // convert miles to nautical miles
    return dist;
}




function removePositionPoints() {
    // disable the location tracking so that a new point won't be added while you are removing the old points
    // use the geoLocationID to do this
    navigator.geolocation.clearWatch(geoLocationID);
    removeTracks();
}

function removeTracks() {
    // remove the marker for user track (only one marker in this layer) if exists
    if (trackLocationLayer){
       mymap.removeLayer(trackLocationLayer);  
    }  
   
}