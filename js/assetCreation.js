"use strict";
function saveNewAsset(){
// get asset_information values
	let asset_name = document.getElementById("asset_name").value;
	let installation_date = document.getElementById("installation_date").value;
	let latitude = document.getElementById("latitude").value;
	let longitude = document.getElementById("longitude").value;
// get asset_condition_information values
	let asset_id = document.getElementById("asset_id").value;
	let condition_id = document.getElementById("condition_id").value;
	let asset_condition_options = document.getElementById("asset_condition_options").value;
// add to postString
	let postString = "asset_name="+asset_name;
	 postString = postString + "&installation_date="+installation_date;
	 postString = postString + "&latitude="+latitude;
	 postString = postString + "&longitude="+longitude;
	 postString = postString + "&asset_id="+asset_id;
	 postString = postString + "&condition_id="+condition_id;
	 postString = postString + "&asset_condition_options="+asset_condition_options;
	// call the AJAX code
	processData(postString);
	console.log(postString)
	
	
	
}

function processData(postString) {
	let serviceUrl= document.location.origin +"/api/testCRUD"
	//serviceUrl = "https://cege0043-7.cs.ucl.ac.uk/api/testCRUD"
	$.ajax({
	url: serviceUrl,
	crossDomain: true,
	type: "POST",
	success: function(data){console.log(data); dataUploaded(data);},
	data: postString
	});
}

// create the code to process the response from the data server
function dataUploaded(data) {
	// change the DIV to show the response
	document.getElementById("responseDIV").innerHTML =
	JSON.stringify(data);
	}