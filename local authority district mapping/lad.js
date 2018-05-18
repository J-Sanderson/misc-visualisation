//geoJSON with thanks from https://github.com/martinjc/UK-GeoJSON

var w = 900;
var h = 1000;

var svg = d3
  .select("#chart")
  .attr("width", w)
  .attr("height", h);

var projection = d3
  .geoAzimuthalEqualArea()
  .center([-2.2, 58.1])
  .scale(5800)
  .rotate([0, 0]);

var path = d3.geoPath(projection);

var tip = d3.tip().attr("class", "d3-tip").html(function(d){
  return d.properties.LAD13NM;
}).direction("ne");
svg.call(tip);

d3.json(
  "https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/gb/lad.json",
  function(error, data) {
    if (error) throw error;


    svg
      .selectAll("path")
      .data(data.features)
      .enter()
      .insert("path")
      .attr("class", "admin")
      .attr("d", path)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
    
    svg
      .append("text")
      .text("Projection: Azimuthal Equal Area")
      .attr("class", "footer")
      .attr("transform", "translate(" + 
           (w - 300) +
           "," +
           (h - 40) +
           ")");
    
    svg
      .append("text")
      .text("Source: https://github.com/martinjc/UK-GeoJSON")
      .attr("class", "footer")
      .attr("transform", "translate(" + 
           (w - 300) +
           "," +
           (h - 20) +
           ")");
    
  }
);