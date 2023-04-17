"use strict";

function closeAssetData() {
    let mapCollapse = document.getElementById('mapWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse,{
        toggle: false,
        show: false
    });
    bsMapCollapse.show();
    let adwCollapse = document.getElementById('assetDataWrapperWrapper');
    let bsAdwCollapse = new bootstrap.Collapse(adwCollapse,{
        toggle: false,
        show: true
    });
    bsAdwCollapse.hide();
}

function processWindowResize() {
    closeAssetData();
}

function loadGraph() {
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
 <svg fill="blue" width="` + widtha + `" height="` + heighta + `" id="svg1">
 </svg>
 </div>`;
    createGraph();
}

// create the graph
function createGraph() {
    // create an SVG container for the graph    
    let marginTop = 30;
    let marginBottom = 60;
    let marginLeft = 50;
    let marginRight = 20;
    let dataURL = baseURL + "/api/geojson/dailyParticipationRates";

    // download the data and create the graph
    d3.json(dataURL).then(data=>{
        data = data[0].array_to_json;

        // adapted grouped chart from: https://d3-graph-gallery.com/graph/barplot_grouped_basicWide.html
        // The code is combined with earthquake graph in practicals

        // groups:  days: from monday to Sunday
        let groups = [];
        // set sub group keys: submitted reports, not working reports
        let subgroups = ["reports_submitted", "reports_not_working"];
        // labels for legends
        let LABELS = ["Submitted Reports", "Reports with 'Not Working' Condition"];

        // loop through the data and get the length of the x axis titles
        let xLen = 0;
        data.forEach(feature=>{
            let xstring = feature.day
            if (xLen < xstring.length) {
                xLen = xstring.length;
            }
            groups.push(feature.day);
            // add days
        }
        );

        // adjust the space available for the x-axis titles, depending on the length of the text
        if (xLen > 100) {
            marginBottom = Math.round(xLen / 3, 0);
        } else {
            marginBottom = xLen + 80;
            // 80 allows showing x axis
        }
        //rough approximation for now

        let svg = d3.select("#svg1");
        let margin = {
            top: marginTop,
            right: marginRight,
            bottom: marginBottom,
            left: marginLeft
        }
          , width = svg.attr("width") - marginLeft - marginRight
          , height = svg.attr("height") - marginTop - marginBottom
          , x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
          , y = d3.scaleLinear().rangeRound([height, 0])// g is a grouping element
          , g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        // change the structure for x.domain and y.domain 
        x.domain(groups);
        y.domain([0, d3.max(data, d=>Math.max(d.reports_submitted, d.reports_not_working))]);

        // adapted from: https://bl.ocks.org/mbostock/7555321 10th March 2021/
        g.append("g").attr("class", "axis axis-x").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x)).selectAll(".tick text").call(wrap, x.bandwidth());

        g.append("g").attr("class", "axis axis-y").call(d3.axisLeft(y).ticks(10).tickSize(8));

        // Another scale for subgroup position?
        var xSubgroup = d3.scaleBand().domain(subgroups).range([0, x.bandwidth()]).padding([0.05])

        // color palette = one color per subgroup
        var color = d3.scaleOrdinal().domain(subgroups).range(['#377eb8', '#e41a1c'])

        // draw the legend
        // adapted from https://gist.github.com/hrecht/13ad131fd8a95b0838151c178f7ace00
        // legend spacing
        var legspacing = 25;
        var legend = g.selectAll(".legend").data(subgroups).enter().append("g")
        // legend color bar
        legend.append("rect").attr("fill", color).attr("width", 20).attr("height", 20).attr("y", function(d, i) {
            return i * legspacing;
        }).attr("x", 0);

        // set legend text
        legend.append("text").attr("class", "label").attr("y", function(d, i) {
            return i * legspacing + 14;
            // offset of 14 to align text with color bar
        }).attr("x", 30).attr("text-anchor", "start").text(function(d, i) {
            return LABELS[i];
        });

        // Enter in data 
        g.selectAll(".bar").data(data).enter().append("g").attr("transform", function(d) {
            return "translate(" + x(d.day) + ",0)";
        }).selectAll("rect").data(function(d) {
            return subgroups.map(function(key) {
                return {
                    key: key,
                    value: d[key]
                };
            });
        }).enter().append("rect").attr("x", function(d) {
            return xSubgroup(d.key);
        }).attr("y", function(d) {
            return y(d.value);
        }).attr("width", xSubgroup.bandwidth()).attr("height", function(d) {
            return height - y(d.value);
        }).attr("fill", function(d) {
            return color(d.key);
        });

    }
    ).catch(err=>{
        svg.append("text").attr("y", 20).attr("text-anchor", "left").style("font-size", "10px").style("font-weight", "bold").text(`Couldn't open the data file: "${err}".`);
    }
    );

}

// separate function to wrap the legend entries
// in particular if the place name where the earthquake happened is long
function wrap(text, width) {
    text.each(function() {
        let text = d3.select(this), words = text.text().split(/\s+/).reverse(), word, line = [], lineNumber = 0, lineHeight = 1.1, // ems
        y = text.attr("y"), dy = parseFloat(text.attr("dy")), tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}
