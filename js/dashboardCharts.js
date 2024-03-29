"use strict";
// store bar chart for click event
let myBarChart;
// store pie chart for click event
let myPieChart;
// code adapted from https://github.com/StartBootstrap/startbootstrap-sb-admin-2

// add barchart from given labels and data
function addBarChart() {
    // get barchart canvas
    var ctx = document.getElementById("myBarChart");
    // lables for bar
    let labels = [];
    // data array for bar
    let data = [];

    for (let i = 0; i < Assetfeatures.length; i++) {
        let asset_name = Assetfeatures[i].properties.asset_name;
        // add asset name in x-axis
        labels.push(asset_name);
        let condition_description = Assetfeatures[i].properties.condition_description;
        // add condition id in y-axis
        data.push(getConditionValue(condition_description));
    }
    // start create bar code adapted from SB-admin template examples
    myBarChart = new Chart(ctx,{
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Condition ID",
                backgroundColor: "#4e73df",
                hoverBackgroundColor: "#22f194",
                borderColor: "#4e73df",
                data: data,
                maxBarThickness: 25
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
                callbacks: {
                    label: function(tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': ' + tooltipItem.yLabel;
                    }
                }
            },
        }
    });
    // end of chart

}

// handle click event from bar chart
// adapted from http://www.java2s.com/example/javascript/chart.js/handle-chart-click-event.html
// https://www.chartjs.org/docs/latest/developers/api.html#getelementsateventformode-e-mode-options-usefinalposition
document.getElementById("myBarChart").onclick = function(evt) {
    // get clicked element
    var activePoints = myBarChart.getElementsAtEventForMode(evt, 'point', myBarChart.options);
    if (activePoints.length) {
        var firstPoint = activePoints[0];
        // asset_name
        var asset_name = myBarChart.data.labels[firstPoint.index];
        // condotion id
        var condition_id = myBarChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

        // highlight pie chart 
        highlightPie(condition_id);
        
        // filter dataTable according to asset name
        filterTableByKeyword(asset_name);
        
        // zoom to the asset names
        zoomToAssets([asset_name]);

    }
}

// highlight Pie chart according to condition_id
function highlightPie(value) {

    // get data index of the label
    let datasetIndex = value - 1;
    // clear all highlight bar if exists
    if (myPieChart.getActiveElements().length > 0) {
        myPieChart.setActiveElements([]);
    }
    // highlight pie with given index (condition id -1)
    myPieChart.setActiveElements([{
        datasetIndex: 0,
        // index of condition pie chart is condition_id -1
        index: datasetIndex
    }]);
    myPieChart.update();
}

function addPieChart() {
    // Pie Chart Example
    var ctx = document.getElementById("myPieChart");
    // get condition_description for labels
    let labels = conditions.map(function(item) {
        return item.condition_description;
    });
    // fill data with zeros
    let data = new Array(labels.length).fill(0);
    ;// count assets of different conditions
    for (let i = 0; i < Assetfeatures.length; i++) {
        // add count in data[i] when the condition matched
        for (let j = 0; j < labels.length; j++) {
            if (Assetfeatures[i].properties.condition_description === labels[j]) {
                data[j]++;
            }
        }
    }

    myPieChart = new Chart(ctx,{
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#2cba00', '#a3ff00', '#fff400', '#ffa700', '#ff0000', '#a6a6a6'],
                hoverOffset: 10,
                hoverBackgroundColor: ['#66ff33', '#97ff4d', '#ffff99', '#ffcc66', '#ff6666', '#a6a6a6'],
                hoverBorderColor: '#4ddeff',
                hoverBorderWidth: 5
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            cutoutPercentage: 80,
        },
    });
}

// add pie chart click event listener
// handle click event from bar chart
// adapted from http://www.java2s.com/example/javascript/chart.js/handle-chart-click-event.html
// https://www.chartjs.org/docs/latest/developers/api.html#getelementsateventformode-e-mode-options-usefinalposition
document.getElementById("myPieChart").onclick = function(evt) {
    // get clicked element
    var activePoints = myPieChart.getElementsAtEventForMode(evt, 'point', myBarChart.options);

    if (activePoints.length) {

        var firstPoint = activePoints[0];
        // condition_description
        var label = myPieChart.data.labels[firstPoint.index];
        // asset count
        var value = myPieChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

        // to highlight bars, first get asset names that have the condition_description
        let relatedAssets = Assetfeatures.map(function(item) {
            if (item.properties.condition_description === label) {
                return item.properties.asset_name;
            }
        }).filter(function(item) {
            // filter out null values
            return item !== undefined;
        });

        // highlight bars according to the asset names
        highlightBar(relatedAssets);

        // filter table by condition condition_description
        filterTableByKeyword(label);
        
        // zoom to assets in map using asset names
        zoomToAssets(relatedAssets);

    }
}

// change color of barChart based on the assets
// adapted from tutorial in https://www.youtube.com/watch?v=IatLn8Od5W4
function highlightBar(relatedAssets) {

    // then use the labels to find data index in bar chart
    let datasetIndex = relatedAssets.map(function(asset_name) {
        return findDatasetIndex(myBarChart, asset_name);
    })

    // clear all highlight bar if exists
    if (myBarChart.getActiveElements().length > 0) {
        myBarChart.setActiveElements([]);
    }

    // convert asset_name index array to setActiveElements readable highlight points
    let highlightPoints = datasetIndex.map(function(item) {
        return {
            datasetIndex: 0,
            index: item
        };
    });

    // highlight bars with given indexs
    myBarChart.setActiveElements(highlightPoints);
    myBarChart.update();
}

// find the dataset index according to a given label
function findDatasetIndex(chart, label) {
    for (let i = 0; i < chart.data.labels.length; i++) {
        if (chart.data.labels[i] === label) {
            return i;
        }
    }
}
