"use strict";

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito',
'-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';


// add barchart from given labels and data
// code adapted from template examples
function addBarChart() {
    // get barchart canvas
    var ctx = document.getElementById("myBarChart");
    // lables for bar
    let labels=[];
    // data array for bar
    let data=[];

    for (let i = 0; i < Assetfeatures.length; i++) {
        let asset_name = Assetfeatures[i].properties.asset_name;
        // add asset name in x-axis
        labels.push(asset_name);
        let condition_description = Assetfeatures[i].properties.condition_description;
        // add condition id in y-axis
        data.push(getConditionValue(condition_description));
    }




    
    var myBarChart = new Chart(ctx,{
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Condition id",
                backgroundColor: "#4e73df",
                hoverBackgroundColor: "#2e59d9",
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
                        max: conditions.length-1,
                        maxTicksLimit: conditions.length,
                        padding: 10,
                        // add condition id 
                        callback: function(value, index, values) {
                            return "Condition id "+value;
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
    });// end of chart

    

}