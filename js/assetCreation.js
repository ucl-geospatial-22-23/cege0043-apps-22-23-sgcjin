"use strict";
function saveNewAsset(){
// get asset_information values
	let asset_name = document.getElementById("asset_name").value;
	let installation_date = document.getElementById("installation_date").value;
	let latitude = document.getElementById("latitude").value;
	let longitude = document.getElementById("longitude").value;

// add to postString
	let postString = "asset_name="+asset_name;
	 postString = postString + "&installation_date="+installation_date;
	 postString = postString + "&latitude="+latitude;
	 postString = postString + "&longitude="+longitude;
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
	//document.getElementById("responseDIV").innerHTML = JSON.stringify(data);
	alert(JSON.stringify(data));
	console.log(JSON.stringify(data));
	}

function deleteSingleAsset() {
	let deleteID = document.getElementById("del_asset_id").value;
	let deleteString = "id="+deleteID;
	console.log(deleteString)
	let serviceUrl= document.location.origin + "/api/testCRUD";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    success: function(data){console.log(data); dataDeleted(data);},
	    data: deleteString
});	
}
function dataDeleted(data){
    //document.getElementById("deleteAssetResponse").innerHTML = JSON.stringify(data);
	alert(JSON.stringify(data));
	console.log(JSON.stringify(data));
}