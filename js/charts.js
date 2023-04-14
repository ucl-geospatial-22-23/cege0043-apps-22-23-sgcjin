"use strict";
// store bar chart for click event
let myBarChart;
// store pie chart for click event
let myPieChart;

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
            scales: {
                xAxes: [{
                    time: {
                        unit: 'asset'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: data.length
                    },
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: conditions.length - 1,
                        maxTicksLimit: conditions.length,
                        padding: 10,
                        // add condition id 
                        callback: function(value, index, values) {
                            return "Condition ID " + value;
                        }
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
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
        // label
        var label = myBarChart.data.labels[firstPoint.index];
        // value
        var value = myBarChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        console.log(label + ": " + value);
    }
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
                backgroundColor: ['#22f194', '#e0f122', '#f19722', '#f13022', '#c90d0d', '#858585'],
                hoverBackgroundColor: ['#5eb58e', '#adb45f', '#b58f5e', '#ba605a', '#8d4949', '#666666'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
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
            legend: {
                display: true,
                position: 'bottom',
                maxHeight: 50
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
        // label
        var label = myPieChart.data.labels[firstPoint.index];
        ;// value
        var value = myPieChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        console.log(label + ": " + value);

        // now highlight related bars 
        // first get assets lables that has clicked condition
        let relatedAssets = Assetfeatures.map(function(item) {
            if (item.properties.condition_description === label) {
                return item.properties.asset_name;
            }
        }).filter(function(item) {
            return item !== undefined;
        });

        // then use the labels to find data index in bar chart
        let datasetIndex = relatedAssets.map(function(asset_name){
            return findDatasetIndex(myBarChart,asset_name);
        })
        
        // highlight bars of these assets index
        highlightBar(datasetIndex);
    }
}

// find the dataset index according to a given label
function findDatasetIndex(chart, label) {
    for (let i = 0; i < chart.data.labels.length; i++) {
        if (chart.data.labels[i] === label) {
            return i;
        }
    }
}

// change color of barChart based on the x index (label)
// adapted from tutorial in https://www.youtube.com/watch?v=IatLn8Od5W4
function highlightBar(datasetIndex) {
    // clear all highlight bar
    if (myBarChart.getActiveElements().length > 0) {
        myBarChart.setActiveElements([]);
    }
    // convert asset_name array to setActiveElements readable highlight points
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
