"use strict";
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NmQ2NmVmNy0zZGY4LTQ1ZDAtYmUwOC03MjkzM2JjNzQ2OTQiLCJpZCI6MTU2NjMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Njg1MjQwNTl9.siDvMt3fH91XzE39FU_xqVrx-i6M1wWOBl_2vCrY6Xo';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NmQ2NmVmNy0zZGY4LTQ1ZDAtYmUwOC03MjkzM2JjNzQ2OTQiLCJpZCI6MTU2NjMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Njg1MjQwNTl9.siDvMt3fH91XzE39FU_xqVrx-i6M1wWOBl_2vCrY6Xo';

let imageryProviders = Cesium.createDefaultImageryProviderViewModels();
let selectedImageryProviderIndex = 7;
// MapBox Street is 5th in the list.

let viewer = new Cesium.Viewer('cesiumContainer',{
    imageryProviderViewModels: imageryProviders,
    selectedImageryProviderViewModel: imageryProviders[selectedImageryProviderIndex]
});


// load data points
function loadVectorLayer() {

    // get the data - NB this assumes that the API is running
    let layerURL = document.location.origin + "/api/geojson/ucfscde/buildings/building_id/location";
    console.log(layerURL);

    let geoJSONOptions = {
        stroke: Cesium.Color.RED,
        fill: Cesium.Color.RED,
        strokeWidth: 3,
        markerSymbol: '*',
    }
    let dataSource = new Cesium.GeoJsonDataSource("Buildings");
    dataSource.clampToGround = false;
    dataSource._name = "Buildings";
    
    viewer.dataSources.add(dataSource);
    
    dataSource.load(layerURL, geoJSONOptions).then(function(dataSource) {
        viewer.flyTo(dataSource);

    });
}
