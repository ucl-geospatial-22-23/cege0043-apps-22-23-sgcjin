"use strict";
let width;
// wdith of the window
let conditionWidth = 992;
// width to determine whether to load condition APP
let popup;
// keep this as a global variable
let mapPoint;
// layer for base condition APP
let assetPoint;
// layer for asset creation APP
let mymap;
// let baseURL = document.location.origin;
baseURL = "https://cege0043-7.cs.ucl.ac.uk";
let layerlist = [];
var userID;
// store user id that loaded at set up
var loadDefaultConditionFlag = true;
// this variable is used for determine whether base condition map will be loaded when resized

function loadMap() {
    // CODE TO INITIALISE AND CREATE THE MAP GOES HERE 
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);

    window.addEventListener('resize', setMapClickEvent);
    // set up user id first
    let theURL = baseURL + "/api/userID";
    $.ajax({
        url: theURL,
        // allow requests from other servers
        crossDomain: true,

        // if the response is succesful then ..
        success: function(result) {
            userID = JSON.parse(JSON.stringify(result))[0].user_id;

            setMapClickEvent()

        }
    });
    //end of the AJAX call

}
//end code to add the leaflet map

// check current number of layers
function countlayers() {
    let layerCount = 0;
    mymap.eachLayer(function(layer) {
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
    if (width < conditionWidth) {
        //the condition capture –
        //anything smaller than 992px is defined as 'medium' by bootstrap

        // cancel the map onclick event using off ..
        mymap.off('click', onMapClick);

        // remove the map point if it exists
        if (mapPoint && loadDefaultConditionFlag) {
            removeAllLayer();
            // load map point if there are no other asset points layer, load mapPoint layer and track
            mymap.addLayer(mapPoint);
            layerlist.push(["mapPoint", mapPoint]);
            // push this layer into layer list

            trackLocation();
            // if map point haven't initalized and there are no other asset points layer, load mapPoint layer and track
        } else if ((!mapPoint) && loadDefaultConditionFlag) {
            // set up a mapPoint layer with click functionality for add asset condition information
            setUpConditionBaseLayer();
            trackLocation();
        }

    } else {
        // the asset creation page

        removeAllLayer();
        // remove all layer
        // since all other layer is removed
        // base condition layer is allowed to be load when size is small
        loadDefaultConditionFlag = true;
        // set flag for base condition layer

        // stop tracking if exists
        removePositionPoints();

        // add asset points if it already exists
        if (assetPoint) {
            mymap.addLayer(assetPoint);
            // add assetPoint layer back
            mymap.fitBounds(assetPoint.getBounds());
            // zoom to assetPoint layer
            layerlist.push(["assetPoint", assetPoint]);
        } else {
            // if assetPoint haven't been initialized, set up assetPoint layer
            setUpAssetCreationLayer();

        }

        // the on click functionality of the MAP will pop up a blank asset creation form
        mymap.on('click', onMapClick);

    }
}
// end of setMapClickEvent

// set up base condition app layer 
function setUpConditionBaseLayer() {
    // get condition values first
    $.ajax({
        url: baseURL + "/api/geojson/conditionDetails",
        crossDomain: true,
        success: function(result) {

            let conditions = [];
            // variable to store conditions
            // loop and parse condition_descriptions 
            for (let i = 0; i < JSON.parse(JSON.stringify(result)).length; i++) {
                conditions.push(JSON.parse(JSON.stringify(result))[i].condition_description);
            }

            // get pre loaded user_id
            let user_id = userID;
            // use an AJAX call to load the asset points on the map
            $.ajax({
                url: baseURL + "/api/geojson/userAssets/" + user_id,
                crossDomain: true,
                success: function(result) {

                    // use the mapPoint and add it to the map  
                    mapPoint = L.geoJson(result, {
                        // use point to layer to create the points
                        pointToLayer: function(feature, latlng) {
                            // pass geoJSON features and conditions to construct popUpHTML
                            let popUpHTML = getReportPopupHTML(feature, conditions);
                            // set all initial color using getIconByValue
                            return L.marker(latlng, {
                                icon: getIconByValue(feature, conditions)
                            }).bindPopup(popUpHTML);

                        },
                        // end of point to layer          
                    });
                    // end of mappoint
                    // add layer only if width is condition APP size   
                    if (width < conditionWidth) {
                        mapPoint.addTo(mymap);
                        layerlist.push(["mapPoint", mapPoint]);
                    }
                    // end of if condition
                }
            });
            //end of the AJAX call of userAssets         
        }
    });
    //end of the AJAX call of condition
}
// end of function

// set marker color by its condition value
function getIconByValue(feature, conditions) {
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
    case "Unknown":
        // if unknown OR other values, return grey
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
    default:
        // if unknown OR other values, return grey
        return testMarkerGray;
    }

}

// set up pop up html for condition app
function getReportPopupHTML(feature, conditions) {

    // get required values from geoJson feature
    let id = feature.properties.asset_id;
    // this will be the asset ID
    let asset_name = feature.properties.asset_name;
    let installation_date = feature.properties.installation_date;
    let user_id = userID;
    let previousCondition = feature.properties.condition_description;
    // condition values
    let con_1 = conditions[0];
    let con_2 = conditions[1];
    let con_3 = conditions[2];
    let con_4 = conditions[3];
    let con_5 = conditions[4];

    let htmlString = "<DIV id='popup'" + id + ">";
    htmlString = htmlString + "<div id=asset_name_" + id + " value='" + asset_name + "'>Asset Name: " + asset_name + "</div>";
    // now include a hidden element with the previous condition value
    htmlString = htmlString + "<div id=previousCondition_" + id + " style='display: none;'>" + previousCondition + "</div>";
    // and a hidden element with the ID of the asset so that we can insert the condition with the correct asset later
    htmlString = htmlString + "<div id=asset_" + id + " style='display: none;'>" + id + "</div>";
    htmlString = htmlString + "<div id=user_id" + " style='display: none;'>" + user_id + "</div>";
    htmlString = htmlString + "<div id=installation_date value='" + installation_date + "'>Asset Installation Date: " + installation_date + "</div>";
    htmlString = htmlString + "<input type='radio' name='answer' value='" + con_1 + "' id ='" + id + "_1'/>" + con_1 + "<br/>";
    htmlString = htmlString + "<input type='radio' name='answer' value='" + con_2 + "' id ='" + id + "_2'/>" + con_2 + "<br/>";
    htmlString = htmlString + "<input type='radio' name='answer' value='" + con_3 + "' id ='" + id + "_3'/>" + con_3 + "<br/>";
    htmlString = htmlString + "<input type='radio' name='answer' value='" + con_4 + "' id ='" + id + "_4'/>" + con_4 + "<br/>";
    htmlString = htmlString + "<input type='radio' name='answer' value='" + con_5 + "' id ='" + id + "_5'/>" + con_5 + "<br/>";
    htmlString = htmlString + "<button onclick='checkCondition(" + id + ");return false;'>SAVE CONDITION BUTTON</button>";
    htmlString = htmlString + "</div>";

    return htmlString;

}

// set up base asset creation app layer 
function setUpAssetCreationLayer() {

    // get pre loaded user_id
    let user_id = userID;

    // use an AJAX call to load the asset points on the map
    $.ajax({
        url: baseURL + "/api/geojson/userAssets/" + user_id,
        crossDomain: true,
        success: function(result) {
            // create color icon
            let testMarkerBlue = L.AwesomeMarkers.icon({
                icon: 'play',
                markerColor: 'blue'
            });

            // use the mapPoint and add it to the map  
            assetPoint = L.geoJson(result, {
                // use point to layer to create the points
                pointToLayer: function(feature, latlng) {
                    // pass geoJSON features and conditions to construct popUpHTML
                    let popUpHTML = getCreationPopupHTML(feature);

                    // set all initial color as blue
                    return L.marker(latlng, {
                        icon: testMarkerBlue
                    }).bindPopup(popUpHTML);

                },
                // end of point to layer          
            });
            // end of mappoint

            // add layer only if width is asset creation APP size   
            if (width >= conditionWidth) {
                assetPoint.addTo(mymap);
                layerlist.push(["assetPoint", mapPoint]);
                mymap.fitBounds(assetPoint.getBounds());
            }
            // end of if condition
        }
    });
    //end of the AJAX call of userAssets         

}

// set up map click pop ups for asset creation app
function onMapClick(e) {
    let formHTML = '<div>' + '<label for="asset_name">Asset Name </label><input type="text" size="25" id="asset_name"/><br />' + '<label for="installation_date">Installation Date </label><input type="text" size="25" id="installation_date"/><br />' + '<div id="latitude" value= "' + e.latlng.lat.toString() + '">Latitude: ' + e.latlng.lat.toString() + '</div><br />' + '<div id="longitude" value= "' + e.latlng.lng.toString() + '">Longitude: ' + e.latlng.lng.toString() + '</div><br />' + '<div id="user_id" style="display: none;">' + userID + '</div>' + '<button id="startUpload" onclick="saveNewAsset()">saveAsset</button>' + '</div>';
    popup = L.popup();
    popup.setLatLng(e.latlng).setContent(formHTML).openOn(mymap);
}

// pop up HTML for existing assets points in  asset creation APP
function getCreationPopupHTML(feature) {
    // get required values from geoJson feature
    let asset_name = feature.properties.asset_name;
    let asset_id = feature.properties.asset_id;
    let previousCondition = feature.properties.condition_description;
    // change div content if previousCondition is unknown
    if (previousCondition == "Unknown") {
        previousCondition = "no condition captured";
    }
    let htmlString = "<DIV>";
    htmlString = htmlString + "<div>Asset Name: " + asset_name + "</div>";
    htmlString = htmlString + "<div>Latest Condition: " + previousCondition + "</div>";
    htmlString = htmlString + "</div>";
    return htmlString;
}
