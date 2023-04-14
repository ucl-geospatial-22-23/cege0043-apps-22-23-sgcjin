// add table
function addTable() {
    // convert features to table
    let dataset = Assetfeatures.map(function(feature){
        return [feature.properties.asset_name,
                feature.properties.installation_date,
               feature.properties.condition_description];
    });
    // Call the dataTables jQuery plugin
    // adapted from https://datatables.net/examples/data_sources/js_array.html
    $(document).ready(function() {
        $('#dataTable').DataTable({
            data:dataset,
            columns:[
                {title:'Asset Name'},
                {title:'Installation Date'},
                {title:'Latest Condition'},
            ]
        });
    });
    
}
