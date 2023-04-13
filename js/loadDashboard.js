// store the asset features
let Assetfeatures;
// set base url
let baseURL = "https://cege0043-7.cs.ucl.ac.uk";

async function setUpDashboard() {
    // waiting to get data
    await getAssets();
    console.log(Assetfeatures);
    // add charts
    addBarChart();
}


// get asset features
function getAssets() {
    return new Promise((resolve)=>{
        // get user id first
        $.ajax({
            url: baseURL + "/api/userID",
            crossDomain: true,
            success: function(result) {
                let userID = JSON.parse(JSON.stringify(result))[0].user_id;
                // after get user id, get userAssets
                $.ajax({
                    url: baseURL + "/api/geojson/userAssets/" + userID,
                    crossDomain: true,
                    success: function(result) {
                        // get features
                        Assetfeatures = result.features;
                        resolve(Assetfeatures);
                    }
                });
                // end of AJAX userAssets
            }
        });
        // end  of AJAX user ID
    }
    );
}
// end of function
