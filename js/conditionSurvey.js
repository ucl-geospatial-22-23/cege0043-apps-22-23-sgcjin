"use strict";

function saveConditionInformation(){
    let postString = "";

	// The previous condition (from the hidden field)
	let previousConditionValue = document.getElementById("previousConditionValue").innerHTML;
	// The ID of the asset (from the hidden field)
	let assetID = document.getElementById("assetID").innerHTML;
	let condition = "";
	
	if (document.getElementById("con_1").checked) {
 		 condition = "1";
	}
	if (document.getElementById("con_2").checked) {
 		 condition = "2";
	}
	if (document.getElementById("con_3").checked) {
 		 condition = "3";
	}
	if (document.getElementById("con_4").checked) {
 		 condition = "4";
	}
	if (document.getElementById("con_5").checked) {
 		 condition = "5";
	}

	if (condition == previousConditionValue){
		alert("The the selected condition is the same as the previous condition");
		postString = postString + "&answer=True"
	}else{
		alert("The the selected condition is NOT the same as the previous condition");
		postString = postString + "&answer=False"
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
	console.log(JSON.stringify(data));
	}