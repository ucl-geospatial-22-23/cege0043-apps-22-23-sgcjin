// store table for search event
var table;
// add table
function addTable() {
    // convert features to table
    let dataset = Assetfeatures.map(function(feature) {
        return [feature.properties.asset_name, feature.properties.installation_date, feature.properties.condition_description];
    });
    // Call the dataTables jQuery plugin and add data
    // adapted from https://datatables.net/examples/data_sources/js_array.html
    $(document).ready(function() {
        table = $('#dataTable').DataTable({
            data: dataset,
            columns: [{
                title: 'Asset Name'
            }, {
                title: 'Installation Date'
            }, {
                title: 'Latest Condition'
            }, ],
        });
        // Add click event listener to the "reset table" button
        $('#resetTable').on('click', function() {
            table.search('').draw();
            // Remove the filter and redraw the table
        });
        // Add click event listener to the row
        // adapted from https://datatables.net/examples/advanced_init/events_live.html
        table.on('click', 'tr', function() {
            var data = table.row(this).data();
            let asset_name = data[0];
            let condition_description = data[2];
            // highlight bar chart
            highlightBar([asset_name]);
            // highlight Pie chart
            highlightPie(getConditionValue(condition_description));
            // zoom to asset in map
            zoomToAssets([asset_name]);
        });

    });
    // end of ready function    
}

// use keyword to filter Table
function filterTableByKeyword(key) {
    table.search(key).draw();
}
