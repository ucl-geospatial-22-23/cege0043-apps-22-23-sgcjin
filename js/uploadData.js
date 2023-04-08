"use strict";

function saveNewAsset() {
    // get asset_information values
	let asset_name = document.getElementById("asset_name").value;
    let installation_date = document.getElementById("installation_date").value;
    let latitude = document.getElementById("latitude").getAttribute("value");
	let longitude = document.getElementById("longitude").getAttribute("value");
    //let user_id = document.getElementById("create_user_id").innerHTML;

    // add to postString
	let postString = "asset_name="+asset_name;
	 postString = postString + "&installation_date="+installation_date;
	 postString = postString + "&latitude="+latitude;
	 postString = postString + "&longitude="+longitude;
     //postString = postString + "&user_id="+user_id;
	// call the AJAX code
	console.log(postString);
	insertAsset(postString);

}

function checkCondition(id){
    let postString = '';
	// TODO: check The previous condition (from the hidden field)
	let previousConditionValue = document.getElementById("previousCondition_"+id).innerHTML;
    // postString = "&old_condition="+previousConditionValue;
	// TODO: The ID of the asset (from the hidden field)
	// let user_id = document.getElementById("user_"+id).innerHTML;
    // postString = postString + "&user_id="+user_id;
    // asset name
    let asset_name = document.getElementById("asset_name_" + id).getAttribute("value");
    postString = postString + "&asset_name="+asset_name;
    // installation_date
    let installation_date = document.getElementById("installation_date").getAttribute("value");
    // postString = postString + "&installation_date="+installation_date;
    // new_condition
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
	}else{
		alert("The selected condition is NOT the same as the previous condition");
        document.getElementById("previousCondition_"+id).innerHTML=condition
	}
    // asset id
    //postString = postString+"&asset_id="+id;
	postString = postString + "&condition_description="+condition
	insertCondition(postString)  
    
}
 

function insertAsset(postString) {
	let serviceUrl= document.location.origin +"/api/insertAssetPoint"
	//serviceUrl = "https://cege0043-7.cs.ucl.ac.uk/api/testCRUD"
	$.ajax({
	url: serviceUrl,
	crossDomain: true,
	type: "POST",
	success: function(data){dataUploaded(data);},
	data: postString
	});
}

function insertCondition(postString) {
	let serviceUrl= document.location.origin +"/api/insertConditionInformation"
	//serviceUrl = "https://cege0043-7.cs.ucl.ac.uk/api/testCRUD"
	$.ajax({
	url: serviceUrl,
	crossDomain: true,
	type: "POST",
	success: function(data){dataUploaded(data);},
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