"use strict";

function saveNewAsset() {
    // get asset_information values
	let asset_name = document.getElementById("asset_name").value;
    let installation_date = document.getElementById("installation_date").value;
    let latitude = document.getElementById("latitude").value;
	let longitude = document.getElementById("longitude").value;
    let user_id = document.getElementById("user_id").innerHTML;

    // add to postString
	let postString = "asset_name="+asset_name;
	 postString = postString + "&installation_date="+installation_date;
	 postString = postString + "&latitude="+latitude;
	 postString = postString + "&longitude="+longitude;
     postString = postString + "&user_id="+user_id;
	// call the AJAX code
	processData(postString);
}

function checkCondition(id){
    let postString = "&asset_id="+id;

	// The previous condition (from the hidden field)
	let previousConditionValue = document.getElementById("previousCondition_"+id).innerHTML;
	// The ID of the asset (from the hidden field)
	let user_id = document.getElementById("user_"+id).innerHTML;
    postString = postString + "&user_id="+user_id;
	let condition = "";
	
	if (document.getElementById(id+"_1").checked) {
 		 condition = document.getElementById(id+"_1").value;
	}
	if (document.getElementById(id+"_2").checked) {
 		 condition = document.getElementById(id+"_2").value;
	}
	if (document.getElementById(id+"_3").checked) {
 		 condition = document.getElementById(id+"_3").value;
	}
	if (document.getElementById(id+"_4").checked) {
 		 condition = document.getElementById(id+"_4").value;
	}
	if (document.getElementById(id+"_5").checked) {
 		 condition = document.getElementById(id+"_5").value;
	}

	if (condition == previousConditionValue){
		alert("The selected condition is the same as the previous condition");
		postString = postString + "&condition="+condition
	}else{
		alert("The selected condition is NOT the same as the previous condition");
		postString = postString + "&condition="+condition
        document.getElementById("previousCondition_"+id).innerHTML=condition
	}
	processData(postString)  
    
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
	//document.getElementById("conditionResult").innerHTML = JSON.stringify(data);
	// alert and consol log for prac4
	alert(JSON.stringify(data));
}