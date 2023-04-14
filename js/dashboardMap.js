"use strict";
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NmQ2NmVmNy0zZGY4LTQ1ZDAtYmUwOC03MjkzM2JjNzQ2OTQiLCJpZCI6MTU2NjMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Njg1MjQwNTl9.siDvMt3fH91XzE39FU_xqVrx-i6M1wWOBl_2vCrY6Xo';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NmQ2NmVmNy0zZGY4LTQ1ZDAtYmUwOC03MjkzM2JjNzQ2OTQiLCJpZCI6MTU2NjMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Njg1MjQwNTl9.siDvMt3fH91XzE39FU_xqVrx-i6M1wWOBl_2vCrY6Xo';

let imageryProviders = Cesium.createDefaultImageryProviderViewModels();
let selectedImageryProviderIndex = 7;
let myDataSource;
// MapBox Street is 5th in the list.

let viewer = new Cesium.Viewer('cesiumContainer',{
    imageryProviderViewModels: imageryProviders,
    selectedImageryProviderViewModel: imageryProviders[selectedImageryProviderIndex]
});

// load data points
function loadVectorLayer() {

    // get the data - NB this assumes that the API is running
    let layerURL = document.location.origin + "/api/geojson/userAssets/" + userID;

    let geoJSONOptions = {
        strokeWidth: 3,
        markerSymbol: '*',
        markerColor: Cesium.Color.WHITE
    }

    let dataSource = new Cesium.GeoJsonDataSource("Assets");
    dataSource.clampToGround = false;
    dataSource._name = "Assets";

    viewer.dataSources.add(dataSource);

    dataSource.load(layerURL, geoJSONOptions).then(function(dataSource) {
        myDataSource = dataSource;
        viewer.flyTo(dataSource);
        console.log(dataSource);
        // change color by condition
        setColorByCondition(dataSource);

    });
    // end of then

}

function setColorByCondition(dataSource) {
    // change color by condition
    dataSource.entities.values.forEach(function(entity) {
        console.log(entity);
        // get condition value
        let condition = entity.properties.condition_description._value;
        if (condition === conditions[0].condition_description) {
            entity.billboard.color = Cesium.Color.GREEN;
        } else if (condition === conditions[1].condition_description) {
            entity.billboard.color = Cesium.Color.YELLOWGREEN;
        } else if (condition === conditions[2].condition_description) {
            entity.billboard.color = Cesium.Color.YELLOW;
        } else if (condition === conditions[3].condition_description) {
            entity.billboard.color = Cesium.Color.ORANGE;
        } else if (condition === conditions[4].condition_description) {
            entity.billboard.color = Cesium.Color.RED;
        } else {
            entity.billboard.color = Cesium.Color.GRAY;
        }

    });
}

// click event: highlight bar and pie chart
// adapted click event from https://stackoverflow.com/questions/65788440/cesium-trigger-event-when-a-point-is-selected
viewer.selectedEntityChanged.addEventListener(function(selectedEntity) {

    if (Cesium.defined(selectedEntity)) {
        if (Cesium.defined(selectedEntity.name)) {
            // highlight bar chart
            highlightBar([selectedEntity.name]);
            let condition_description = selectedEntity.properties.condition_description._value;
            // highlight Pie chart
            highlightPie(getConditionValue(condition_description));
        }
    }
});

// zoom to assets using assets name array
// code adapted from https://stackoverflow.com/questions/29644062/how-to-zoom-move-camera-to-display-a-polygon-in-cesium-js-fit-viewport-to-polyg
// and https://sandcastle.cesium.com/index.html?src=Camera.html
// and https://cesium.com/learn/cesiumjs/ref-doc/PositionProperty.html
function zoomToAssets(asset_names) {
    var entities = myDataSource.entities.values;
    var boundingSphere = new Cesium.BoundingSphere();

    console.log(asset_names);
    // get an array of entities that relate to the asset_names array
    let selectedEntities = [];
    for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];
        console.log(entity.name);
        console.log(entity);
        // if the entity is one of the asset_name array
        // add to selectedEntities array
        if (asset_names.includes(entity.name)) {
            selectedEntities.push(entity);
        }
    }

    // get bounding box of these entities
    let rectangle = Cesium.Rectangle.fromCartesianArray(selectedEntities.map(function(entity) {
        // return Cartesian3 object to create CartesianArray
        return entity.position.getValue(viewer.clock.currentTime);
    }));
    console.log(rectangle);
    // add offset for the rectangle
    // adapted from https://sandcastle.cesium.com/#c=jVRNj9MwEP0ro+6liNYpAsRumlZIAQkkxErsir304iaTxqxjL7bTqqz63xk7SZOwPZBDNX7z8d48J820sg72Ag9oYAUKD5CiFXXFfgZsuplk4Zxq5bhQaDaTV8uN2iiALPQekH5WML9ZsMWyh62uXUn42+sRjLypvv4wgpU2ofrdeIjBzHG1k0ipVtaPDmKF0dUn3BlEO/UtEKTMmjDQt7HnbMPA48PxDrooLHpdC/Z+QO9tue1S/8kP83baUMi/YHDh9RhrLOjATiO0d8MyXqHhrJDHez19blpy4hOKO6FVPBAbBp66DaMI7kp9AFdi7ycD+K69v79rYTBfwq+aFBXagKVaNuBF5YQTaBnP8473PCaGFvGOaZN7MWjjvmDWpQshZQwFl7bHyBlJb1QMztQv0FRLbeLO9XBiD1++3n9uC0/9lpPZJLHuKHHdzfgoqieyE2ojp4xFDqsn6ZVF2zp7RMcyazt7/HPld01LUoz5WcdV43gL94uS7cLSuGNMV6Zw2eNbnj3ujK5VPs8a9d7aPt+Ch1K4vu3UBEk03CDJxR5Evrrw8UEmubWUKWop78Qf3EzWSUT1L1ql5nQhu9s9GlLry8o3628NyBhLIjpe7nRayy0nsrOhfW5gFeX9nwS0x+Gs0QpDH6knDedLXcP4Lw
    let offset = 0.0002
    rectangle.east = rectangle.east + offset;
    rectangle.west = rectangle.west - offset;
    rectangle.south = rectangle.south - offset;
    rectangle.north = rectangle.north + offset;
    console.log(rectangle);

    viewer.camera.flyTo({
        destination: rectangle
    });
}
