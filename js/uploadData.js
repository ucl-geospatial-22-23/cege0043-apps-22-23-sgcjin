"use strict";

function saveNewAsset() {
    // get asset_information values
	let asset_name = document.getElementById("asset_name").value;
    let installation_date = document.getElementById("installation_date").value;
    let latitude = document.getElementById("latitude").innerHTML;
	let longitude = document.getElementById("longitude").innerHTML;
    // add to postString
	let postString = "asset_name="+asset_name;
	 postString = postString + "&installation_date="+installation_date;
	 postString = postString + "&latitude="+latitude;
	 postString = postString + "&longitude="+longitude;
	// call the AJAX code
	processData(postString);
}