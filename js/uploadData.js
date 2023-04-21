"use strict";
// set base url
let baseURL = document.location.origin;
// baseURL = "https://cege0043-7.cs.ucl.ac.uk";

// function to get new asset value from div and insert the asset
function saveNewAsset() {
    // get asset_information values
    let asset_name = document.getElementById("asset_name").value;
    let installation_date = document.getElementById("installation_date").value;
    let latitude = document.getElementById("latitude").getAttribute("value");
    let longitude = document.getElementById("longitude").getAttribute("value");

    // check if asset_name or installation_date is null
    if (!asset_name) {
        alert("Please insert asset name!");
        return;
    }
    if (!installation_date) {
        alert("Please insert installation date!");
        return;
    }
    
            // add to postString
            let postString = "asset_name=" + asset_name;
            postString = postString + "&installation_date=" + installation_date;
            postString = postString + "&latitude=" + latitude;
            postString = postString + "&longitude=" + longitude;

            // call the AJAX post func
            // if success, it will update data of all layers
            insertAsset(postString);

}

// get the condition from div and insert the condition report
function checkCondition(id) {
    let postString = '';
    let previousConditionValue = document.getElementById("previousCondition_" + id).innerHTML;

    // asset name
    let asset_name = document.getElementById("asset_name_" + id).getAttribute("value");
    postString = postString + "&asset_name=" + asset_name;
    let installation_date = document.getElementById("installation_date").getAttribute("value");
    // new_condition
    let condition = "";

    if (document.getElementById(id + "_1").checked) {
        condition = document.getElementById(id + "_1").value;
    } else if (document.getElementById(id + "_2").checked) {
        condition = document.getElementById(id + "_2").value;
    } else if (document.getElementById(id + "_3").checked) {
        condition = document.getElementById(id + "_3").value;
    } else if (document.getElementById(id + "_4").checked) {
        condition = document.getElementById(id + "_4").value;
    } else if (document.getElementById(id + "_5").checked) {
        condition = document.getElementById(id + "_5").value;
    }else if (document.getElementById(id + "_6").checked) {
        condition = document.getElementById(id + "_6").value;
    }// if no condition is checked, return an alert and stop
    else {
        alert("Please select a condition value!")
        return;
    }

    // check if current condition is the same as the previous condition
    if (condition == previousConditionValue) {
        alert("The selected condition is the same as the previous condition: \n"+condition);
    } else {
        if(previousConditionValue==="Unkown"){
            previousConditionValue="no condition captured";
        }
        alert("The selected condition is NOT the same as the previous condition. \n Previous condition: "+previousConditionValue+
             "\n Selected condition: "+condition);
    }

    postString = postString + "&condition_description=" + condition
    insertCondition(postString);

}

// process ajax POST for insert Asset
function insertAsset(postString) {
    let serviceUrl = baseURL + "/api/insertAssetPoint"
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "POST",
        success: function(data) {
            assetInserted(data);
        },
        error: function(requestObject, error, errorThrown) {
            // check if the error is caused by "asset_name_unique" constraint
            // alert asset is not unique error
            if (requestObject.responseJSON.constraint==="asset_name_unique"){
                // get the table where the error occurs
                let table_name = requestObject.responseJSON.table;
                alert(`Failed to insert the asset. The asset name is not unique in table ${table_name}. Please try a different one.`);
            }else{
                alert("Failed to insert the asset.");
            }
        },
        data: postString
    });
}

// process ajax POST for insert Condition
function insertCondition(postString) {
    let serviceUrl = baseURL + "/api/insertConditionInformation"
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "POST",
        success: function(data) {
            reportUploaded(data);
        },
        // alert response and report counts
        error: function(requestObject, error, errorThrown) {
            alert("Failed to insert the condition report. \n ");
        },
        data: postString
    });
}

// create the code to process the response from the data server
async function assetInserted(data) {
    // show the response without double quote
    alert(JSON.stringify(data).replace(/"/g, ''));
    // refresh map points after asset insertion
    setMapClickEvent();
}

// create the code to process the insert condition response from the data server
function reportUploaded(data) {

    let user_id = userID;
    // get user id

    $.ajax({
        url: baseURL + "/api/geojson/userConditionReports/" + user_id,
        crossDomain: true,
        success: function(result) {
            // alert server response and report count
            alert(JSON.stringify(data).replace(/"/g, '') + "\n You have created " + result[0].array_to_json[0].num_reports + " reports.");
            // .replace(/"/g, '') is to replace double quote

            // refresh map points after asset insertion
            setMapClickEvent();
        },
        error: function(requestObject, error, errorThrown) {
            alert("Failed to get the reports count your have created.");
        },
    });
    //end of the AJAX call
}
