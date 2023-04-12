"use strict";
function loadTable() {
    let mapCollapse = document.getElementById('mapWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse,{
        toggle: false,
        show: false
    });
    bsMapCollapse.hide();
    let adwCollapse = document.getElementById('assetDataWrapperWrapper');
    let bsAdwCollapse = new bootstrap.Collapse(adwCollapse,{
        toggle: false,
        show: true
    });
    bsAdwCollapse.show();

    // code to create the graph goes here – see below
    let widtha = document.getElementById("assetDataWrapper").clientWidth * 2;
    let heighta = document.getElementById("assetDataWrapper").offsetHeight;

    // Add the close button and an SVG element for the graph
    document.getElementById("assetDataWrapper").innerHTML = `<div class="h-100 w-100">
 <button type="button" class="btn-close float-end" arialabel="Close" onclick="closeAssetData()"></button>
 <div fill="blue" width="` + widtha + `" height="` + heighta + `" id="tablediv">
 </div>
 
 </div>`;
    createTable();
}

// create table
// adapted from https://github.com/ucl-geospatial/cege0043-app-examples/blob/week9-datatables/dataTables.html
function createTable() {
    $.ajax({
        url: baseURL + "/api/geojson/assetsInGreatCondition",
        crossDomain: true,
        success: function(result) {
            let features = result[0].array_to_json;
            // generate a string for the table
            var tableHTML = "<table id='data3' class='display' style='width:100%'>";
            // add the column titles
            tableHTML += "<thead align><tr><td><h2>Asset Name</h2></td><td><h3>Installation Date</h3> </td></tr></thead>";
            tableHTML +="<tbody>";

            for (let i = 0; i < features.length; i++) {
                // add a new row
                tableHTML += "<tr>";
                // add asset name
                tableHTML += "<td>" + features[i].asset_name + "</td>";
                // add Date
                tableHTML += "<td>" + features[i].installation_date + "<td>";
                //close the row
                tableHTML += "</tr>";
            }
            // end of loop
            // close the table
            tableHTML += "<tbody></table>";
            // update the DIV
            document.getElementById("tablediv").innerHTML = tableHTML
        }

    });
    // end of ajax

}
//end of func
