// store the asset features
let Assetfeatures;
// set base url
let baseURL = "https://cege0043-7.cs.ucl.ac.uk";
let conditions = [];

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
                // get condition values
                // after get user id, get conditions
                $.ajax({
                    url: baseURL + "/api/geojson/conditionDetails",
                    crossDomain: true,
                    success: function(result) {
                        // variable to store conditions
                        conditions = [];

                        // loop and parse condition_descriptions with id 
                        for (let i = 0; i < result.length; i++) {
                            conditions.push({
                                "id": result[i].id,
                                "condition_description": result[i].condition_description
                            });
                        }
                        console.log(conditions);
                        // get userAssets
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
                // end of AJAX get conditions
            }
        });
        // end  of AJAX user ID
    }
    );
}
// end of function

// get condition id from condition_description
function getConditionValue(condition_description) {
    
     for (let i = 0; i < conditions.length; i++) {
         // return id if matched
         if (condition_description===conditions[i].condition_description){
             return conditions[i].id;
         }
     }
    return 0;
}