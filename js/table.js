"use strict";
function loadTable() {
    let mapCollapse = document.getElementById('mapWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse,{
        toggle: false,
        show: false
    });
    bsMapCollapse.hide();
    let adwCollapse = document.getElementById('graphDataWrapperWrapper');
    let bsAdwCollapse = new bootstrap.Collapse(adwCollapse,{
        toggle: false,
        show: true
    });
    bsAdwCollapse.show();

    // code to create the graph goes here – see below
    let widtha = document.getElementById("graphDataWrapper").clientWidth * 2;
    let heighta = document.getElementById("graphDataWrapper").offsetHeight;

    // Add the close button and an SVG element for the graph
    document.getElementById("graphDataWrapper").innerHTML = `<div class="h-100 w-100">
 <button type="button" class="btn-close float-end" arialabel="Close" onclick="closeAssetData()"></button>
 <svg fill="blue" width="` + widtha + `" height="` + heighta + `" id="svg1">
 </svg>
 </div>`;
    createGraph();
}