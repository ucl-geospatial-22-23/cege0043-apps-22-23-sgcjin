"use strict";
function closeAssetData(){
 let mapCollapse = document.getElementById('mapWrapper');
 let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
 toggle: false, show:false
 });
 bsMapCollapse.show();
 let adwCollapse = document.getElementById('assetDataWrapperWrapper');
 let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
 toggle: false, show:true
 });
 bsAdwCollapse.hide();
}
function loadGraph(){
 let mapCollapse = document.getElementById('mapWrapper');
 let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
 toggle: false, show:false
 });
 bsMapCollapse.hide();
 let adwCollapse = document.getElementById('assetDataWrapperWrapper');
 let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
 toggle: false, show:true
 });
 bsAdwCollapse.show();
 
// code to create the graph goes here – see below
let widtha = document.getElementById("assetDataWrapper").clientWidth;
 let heighta = document.getElementById("assetDataWrapper").offsetHeight;

 
 // Add the close button and an SVG element for the graph
 document.getElementById("assetDataWrapper").innerHTML=`<div class="h-100 w-100">
 <button type="button" class="btn-close float-end" arialabel="Close" onclick="closeAssetData()"></button>
 <svg fill="blue" width="`+widtha+`" height="`+heighta+`" id="svg1">
 </svg>
 </div>`;
 createGraph();
}

// create the graph
function createGraph() {
     // create an SVG container for the graph
     // g is a grouping element
     let marginTop = 30;
     let marginBottom = 60;
     let marginLeft = 50;
     let marginRight=20;

let dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// download the data and create the graph
d3.json(dataURL).then(data => {
  data = data.features;


  // loop through the data and get the length of the x axis titles
  let xLen = 0;
  data.forEach(feature =>{
      if (xLen < feature.properties.title.length) {
        xLen = feature.properties.title.length;
      }

        });

  // adjust the space available for the x-axis titles, depending on the length of the text
  if (xLen > 100) {
    marginBottom = Math.round(xLen/3,0);
  }
  else {
    marginBottom = xLen + 20;  // the 20 allows for the close button 
  } //rough approximation for now

 let svg     = d3.select("#svg1"),
      margin  = {top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft},
      width   = svg.attr("width") - marginLeft - marginRight,
      height  = svg.attr("height") - marginTop - marginBottom,
      x       = d3.scaleBand().rangeRound([0, width]).padding(0.2),
      y       = d3.scaleLinear().rangeRound([height, 0]),
      g       = svg.append("g")
                   .attr("transform", `translate(${margin.left},${margin.top})`);



 x.domain(data.map(d => d.properties.title));
 y.domain([0, d3.max(data, d => d.properties.mag)]);



// adapted from: https://bl.ocks.org/mbostock/7555321 10th March 2021/
 g.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll(".tick text")
      .call(wrap,x.bandwidth());


  g.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(y).ticks(10).tickSize(8));

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.properties.title))
      .attr("y", d => y(d.properties.mag))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.properties.mag));

})
.catch(err => {
   svg.append("text")         
        .attr("y", 20)
        .attr("text-anchor", "left")  
        .style("font-size", "10px") 
        .style("font-weight", "bold")  
        .text(`Couldn't open the data file: "${err}".`);
});

}
// separate function to wrap the legend entries
// in particular if the place name where the earthquake happened is long
function wrap(text, width) {
  text.each(function() {
    let text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
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