"use strict";
function closeAssetData(){
 let mapCollapse = document.getElementById('mapWrapper');
 let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
 toggle: false, show:false
 });
 bsMapCollapse.show();
 let adwCollapse = document.getElementById('assetDataWrapperWrapper');
 let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
 toggle: false, show:true
 });
 bsAdwCollapse.hide();
}
function loadGraph(){
 let mapCollapse = document.getElementById('mapWrapper');
 let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
 toggle: false, show:false
 });
 bsMapCollapse.hide();
 let adwCollapse = document.getElementById('assetDataWrapperWrapper');
 let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
 toggle: false, show:true
 });
 bsAdwCollapse.show();
// code to create the graph goes here – see below
let widtha = document.getElementById("assetDataWrapper").clientWidth*2;
 let heighta = document.getElementById("assetDataWrapper").offsetHeight;
 console.log(widtha+" "+heighta);
 // Add the close button and an SVG element for the graph
 document.getElementById("assetDataWrapper").innerHTML=`<div class="h-100 w100">
 <button type="button" class="btn-close float-end" arialabel="Close" onclick="closeAssetData()"></button>
 <svg fill="blue" width="`+widtha+`" height="`+heighta+`" id="svg1">
 </svg>
 </div>`

    
}