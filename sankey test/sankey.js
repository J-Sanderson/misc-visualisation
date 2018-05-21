var graph = {
"nodes":[
  {"node":0,"name":"Node0"},
  {"node":1,"name":"Node1"},
  {"node":2,"name":"Node2"},
  {"node":3,"name":"Node3"},
  {"node":4,"name":"Node4"},
  {"node":5,"name":"Node5"},
  {"node":6,"name":"Node6"},
  {"node":7,"name":"Node7"},
  {"node":8,"name":"Node8"},
  {"node":9,"name":"Node9"},
  {"node":10,"name":"Node10"},
  {"node":11,"name":"Node11"},
  {"node":12,"name":"Node12"}
],
"links":[
  {"source":0,"target":1,"value":235},
  {"source":0,"target":2,"value":2342},
  {"source":0,"target":3,"value":7894},
  {"source":0,"target":4,"value":2434},
  {"source":0,"target":5,"value":643},
  {"source":0,"target":6,"value":478},
  {"source":3,"target":7,"value":682},
  {"source":3,"target":8,"value":2574},
  {"source":3,"target":9,"value":851},
  {"source":3,"target":10,"value":2576},
  {"source":3,"target":11,"value":2576},
  {"source":12,"target":3,"value":1365}
]};

var units = "Items";

var width = 1000;
var height = 700;
var margin = {
  "top": 10,
  "bottom": 10,
  "left": 10,
  "right": 10
};

var formatNumber = d3.format(",.0f");
var format = function(d) {
  return formatNumber(d) + " " + units;
};

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<p><strong>" +
      d.name +
      "</strong><br>" +
      format(d.value);
  }).direction("ne");

var svg = d3.select("#chart")
  .attr("width", width)
  .attr("height", height)
  .append("g");
svg.call(tip);

var sankey = d3.sankey()
  .size([width - margin.left - margin.right,
         height - margin.top - margin.bottom])
  .nodeWidth(36)
  .nodePadding(40);

var path = sankey.link();

sankey
  .nodes(graph.nodes)
  .links(graph.links)
  .layout(32);

var link = svg.append("g").selectAll(".link")
  .data(graph.links)
  .enter().append("path")
  .attr("class", "link")
  .attr("d", path)
  .style("stroke-width", function(d) {
    return Math.max(1, d.dy);
  })
  .sort(function(a, b) {
    return b.dy - a.dy;
  });

link.append("title")
  .text(function(d) {
    return d.source.name + " ? " + 
    d.target.name + "\n" + format(d.value);
  });

var node = svg.append("g").selectAll(".node")
  .data(graph.nodes)
  .enter().append("g")
  .attr("class", "node")
  .attr("transform", function(d) { 
    return "translate(" + d.x + "," + d.y + ")";
  })
  .call(d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", function() { 
      this.parentNode.appendChild(this);
    })
    .on("drag", dragmove));

node.append("rect")
  .attr("height", function(d) {
    return d.dy;
  })
  .attr("width", sankey.nodeWidth())
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide)

node.append("text")
  .attr("x", -6)
  .attr("y", function(d) { return d.dy / 2; })
  .attr("dy", ".35em")
  .attr("text-anchor", "end")
  .attr("transform", null)
  .text(function(d) {
    return d.name;
  })
  .filter(function(d) {
    return d.x < width / 2;
  })
  .attr("x", 6 + sankey.nodeWidth())
  .attr("text-anchor", "start");

function dragmove(d) {
  d3.select(this).attr("transform", 
    "translate(" + (
      d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
      )
      + "," + (
      d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
      ) + ")");
  sankey.relayout();
  link.attr("d", path);
}