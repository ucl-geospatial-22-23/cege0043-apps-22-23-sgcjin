"use strict";
function saveNewAsset(){
	theURL = document.getElementById("ajaxURL").value;
$.ajax({url:theURL,
// allow requests to other servers
crossDomain: true,
// if the response is successful then ..
success: function(result){
// the result is returned as JSON so we need to convert it to a string
document.getElementById("ajaxDIV").innerHTML =
JSON.stringify(result);
}}); //end of the AJAX call
	
	
}