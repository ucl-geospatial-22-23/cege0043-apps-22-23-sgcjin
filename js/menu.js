"use strict";

// check if layer is already loaded
function loadedOrNot(name) {
  for (var i=0;i<listOfThings.length ;i++){
 if (layerlist[i][0] == name){
 return true;
 }  
return false
}}

// remove all layer except tile layer
function removeAllLayer() {
    mymap.eachLayer(function (layer) {
  // Check if the layer is not a tile layer (base layer)
  if (!(layer instanceof L.TileLayer)) {
    mymap.removeLayer(layer);
  }
});
}





function listOfAssets(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is listOfAssets and menu is called by: "+ sCallerName);
}
// menu 2
function dailyReportingRates(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is dailyReportingRates and menu is called by: "+ sCallerName);
}
function help(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is help and menu is called by: "+ sCallerName);
    mymap.removeLayer(mapPoint);
}
// menu 5
function userRanking(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is userRanking and menu is called by: "+ sCallerName);
}
function add5ClosestAssets(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is add5ClosestAssets and menu is called by: "+ sCallerName);
}
// menu 8
function remove5ClosestAssets(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is remove5ClosestAssets and menu is called by: "+ sCallerName);
}
function add5LastReports(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is add5LastReports and menu is called by: "+ sCallerName);
}
// menu 11
function remove5LastReports(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is remove5LastReports and menu is called by: "+ sCallerName);
}
function addNotRated(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is addNotRated and menu is called by: "+ sCallerName);
}
// menu 14
function removeNotRated(){
let re = /([^(]+)@|at ([^(]+) \(/g;
let aRegexResult = re.exec(new Error().stack);
let sCallerName = aRegexResult[1] || aRegexResult[2];
alert("function name is removeNotRated and menu is called by: "+ sCallerName);
}
