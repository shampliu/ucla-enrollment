$(document).ready( function(){
var w = 650;
var h = 400;
var r = 150;
var ir = 90;
var textOffset = 24;
var tweenDuration = 1050;

tooltip = d3.select("body")
  .append("div") 
  .attr("class", "tooltip");

var legendRectSize = 18;
var legendSpacing = 4;



//OBJECTS TO BE POPULATED WITH DATA LATER
var lines, valueLabels, nameLabels;
var pieData = [];    
var oldPieData = [];
var filteredPieData = [];

//D3 helper function to populate pie slice parameters from array data
var donut = d3.layout.pie().value(function(d){
  return d.itemValue;
});

//D3 helper function to create colors from an ordinal scale
var color = d3.scale.category20c();

//D3 helper function to draw arcs, populates parameter "d" in path object
var arc = d3.svg.arc()
  .startAngle(function(d){ return d.startAngle; })
  .endAngle(function(d){ return d.endAngle; })
  .innerRadius(ir)
  .outerRadius(r);

var arcOver = d3.svg.arc()
  .startAngle(function(d){ return d.startAngle; })
  .endAngle(function(d){ return d.endAngle; })
  .innerRadius(ir)
  .outerRadius(r + 5);


///////////////////////////////////////////////////////////
// GENERATE FAKE DATA /////////////////////////////////////
///////////////////////////////////////////////////////////

var data;


var dataStructure = []; 

d3.json("../demographics-correct.json", function(results) {
  dataStructure = results; 
  ///////////////////////////////////////////////////////////
// CREATE VIS & GROUPS ////////////////////////////////////
///////////////////////////////////////////////////////////

var vis = d3.select("#pie-chart").append("svg:svg")
  .attr("width", w)
  .attr("height", h);

//GROUP FOR ARCS/PATHS
var arc_group = vis.append("svg:g")
  .attr("class", "arc")
  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

//GROUP FOR LABELS
var label_group = vis.append("svg:g")
  .attr("class", "label_group")
  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

//GROUP FOR CENTER TEXT  
var center_group = vis.append("svg:g")
  .attr("class", "center_group")
  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

///////////////////////////////////////////////////////////
// CENTER TEXT ////////////////////////////////////////////
///////////////////////////////////////////////////////////

//WHITE CIRCLE BEHIND LABELS
var whiteCircle = center_group.append("svg:circle")
  .attr("fill", "white")
  .attr("r", ir);

// to run each time data is generated
function update(number) {

  data = dataStructure[number].data;

  oldPieData = filteredPieData;
  pieData = donut(data);

  var sliceProportion = 0; //size of this slice
  filteredPieData = pieData.filter(filterData);
  function filterData(element, index, array) {
    element.name = data[index].itemLabel;
    element.value = data[index].itemValue;
    sliceProportion += element.value;
    return (element.value > 0);
  }

    //DRAW ARC PATHS
    paths = arc_group.selectAll("path").data(filteredPieData);
    paths.enter().append("svg:path")
      .attr("stroke", "white")
      .attr("stroke-width", 0.5)
      .attr("fill", function(d, i) { return color(i); })
      .transition()
        .duration(tweenDuration)
        .attrTween("d", pieTween)
    paths
      .transition()
        .duration(tweenDuration)
        .attrTween("d", pieTween);
    paths.exit()
      .transition()
        .duration(tweenDuration)
        .attrTween("d", removePieTween)
      .remove();
    paths
      .on("mousemove",function(d, i){
        var percentage = (d.value/sliceProportion)*100;

        this.style.opacity = "0.6"; 

        this.style.cursor = "pointer"; 
        tooltip.style("display","none");
        tooltip
        // .html(d.data["itemLabel"] + "<br>" + d.data["itemValue"] + " | " + percentage.toFixed(1) + "%")
        //   .style("left", (d3.event.pageX+12) + "px")
        //   .style("top", (d3.event.pageY-10) + "px")
        //   .style("opacity", 1)
        //   .style("display","block")
        .html('<div class="left"><b>' + d.data["itemLabel"].toUpperCase() + "</b><br>Population: <b>" + d.data["itemValue"] + '</b></div><div class="right">' + percentage.toFixed(1) + "%" + "</div>")
          .style("left", (d3.event.pageX+12) + "px")
          .style("top", (d3.event.pageY-10) + "px")
          .style("opacity", 1)
          .style("display","block")
      })
      .on("mouseover", function(d) {
                    d3.select(this).transition()
                       .duration(300)
                       .attr("d", arcOver);
                   })
      .on("mouseout",function(){
        this.style.opacity = "1"; 
        tooltip.html("").style("display","none");
        d3.select(this).transition()
                       .duration(700)
                       .ease("bounce")
                       .attr("d", arc);
        });

                    


    //DRAW TICK MARK LINES FOR LABELS
    // lines = label_group.selectAll("line").data(filteredPieData);
    // lines.enter().append("svg:line")
    //   .attr("x1", 0)
    //   .attr("x2", 0)
    //   .attr("y1", -r-5)
    //   .attr("y2", -r-15)
    //   .attr("stroke", "gray")
    //   .attr("transform", function(d) {
    //     return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
    //   });
    // lines.transition()
    //   .duration(tweenDuration)
    //   .attr("transform", function(d) {
    //     return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
    //   });
    // lines.exit().remove();

    //DRAW LABELS WITH PERCENTAGE VALUES
    // valueLabels = label_group.selectAll("text.value").data(filteredPieData)
    //   .attr("dy", function(d){
    //     if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
    //       return 5;
    //     } else {
    //       return -7;
    //     }
    //   })
    //   .attr("text-anchor", function(d){
    //     if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
    //       return "beginning";
    //     } else {
    //       return "end";
    //     }
    //   })
    //   .text(function(d){
    //     var percentage = (d.value/sliceProportion)*100;
    //     return percentage.toFixed(1) + "%";
    //   });

    // valueLabels.enter().append("svg:text")
    //   .attr("class", "value")
    //   .attr("transform", function(d) {
    //     return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
    //   })
    //   .attr("dy", function(d){
    //     if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
    //       return 5;
    //     } else {
    //       return -7;
    //     }
    //   })
    //   .attr("text-anchor", function(d){
    //     if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
    //       return "beginning";
    //     } else {
    //       return "end";
    //     }
    //   }).text(function(d){
    //     var percentage = (d.value/sliceProportion)*100;
    //     return percentage.toFixed(1) + "%";
    //   });

    // valueLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

    // valueLabels.exit().remove();



    //DRAW LABELS WITH ENTITY NAMES
    // nameLabels = label_group.selectAll("text.units").data(filteredPieData)
    //   .attr("dy", function(d){
    //     if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
    //       return 17;
    //     } else {
    //       return 5;
    //     }
    //   })
    //   .attr("text-anchor", function(d){
    //     if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
    //       return "beginning";
    //     } else {
    //       return "end";
    //     }
    //   }).text(function(d){
    //     return d.name;
    //   });

    // nameLabels.enter().append("svg:text")
    //   .attr("class", "units")
    //   .attr("transform", function(d) {
    //     return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
    //   })
    //   .attr("dy", function(d){
    //     if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
    //       return 17;
    //     } else {
    //       return 5;
    //     }
    //   })
    //   .attr("text-anchor", function(d){
    //     if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
    //       return "beginning";
    //     } else {
    //       return "end";
    //     }
    //   }).text(function(d){
    //     return d.name;
    //   });

    // nameLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

    // nameLabels.exit().remove();

    ///////////////////////////////////////////////////////////
    // LEGEND /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    var legend = vis.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset =  height * color.domain().length / 2;
        // var horz = -2 * legendRectSize;
        var horz = 0;
        var vert = i * height - offset + 100;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      // .style('fill', function() {
      //   console.log(color);
      //   return color; 
      // })
      .style('fill', color)
      .style('stroke', color);

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) { 
        console.log(dataStructure[0].data[d]["itemLabel"]);
        return dataStructure[0].data[d]["itemLabel"];
      });
    
}

///////////////////////////////////////////////////////////
// FUNCTIONS //////////////////////////////////////////////
///////////////////////////////////////////////////////////

// Interpolate the arcs in data space.
function pieTween(d, i) {
  var s0;
  var e0;
  if(oldPieData[i]){
    s0 = oldPieData[i].startAngle;
    e0 = oldPieData[i].endAngle;
  } else if (!(oldPieData[i]) && oldPieData[i-1]) {
    s0 = oldPieData[i-1].endAngle;
    e0 = oldPieData[i-1].endAngle;
  } else if(!(oldPieData[i-1]) && oldPieData.length > 0){
    s0 = oldPieData[oldPieData.length-1].endAngle;
    e0 = oldPieData[oldPieData.length-1].endAngle;
  } else {
    s0 = 0;
    e0 = 0;
  }
  var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}

function removePieTween(d, i) {
  s0 = 2 * Math.PI;
  e0 = 2 * Math.PI;
  var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}

function textTween(d, i) {
  var a;
  if(oldPieData[i]){
    a = (oldPieData[i].startAngle + oldPieData[i].endAngle - Math.PI)/2;
  } else if (!(oldPieData[i]) && oldPieData[i-1]) {
    a = (oldPieData[i-1].startAngle + oldPieData[i-1].endAngle - Math.PI)/2;
  } else if(!(oldPieData[i-1]) && oldPieData.length > 0) {
    a = (oldPieData[oldPieData.length-1].startAngle + oldPieData[oldPieData.length-1].endAngle - Math.PI)/2;
  } else {
    a = 0;
  }
  var b = (d.startAngle + d.endAngle - Math.PI)/2;

  var fn = d3.interpolateNumber(a, b);
  return function(t) {
    var val = fn(t);
    return "translate(" + Math.cos(val) * (r+textOffset) + "," + Math.sin(val) * (r+textOffset) + ")";
  };
}

$( "#slider" ).slider({
    value: 0,
    min: 0,
    max: 10,
    step: 1,
    slide: function( event, ui ) {
      update(ui.value);
      // console.log(ui.value);
    }
})

.each(function() {

  //
  // Add labels to slider whose values 
  // are specified by min, max and whose
  // step is set to 1
  //

  // Get the options for this slider
  var opt = $(this).data().uiSlider.options;
  
  // Get the number of possible values
  var vals = opt.max - opt.min;
  
  // Space out values
  for (var i = 0; i <= vals; i++) {

  
    if(i%2 == 0){
    var el = $('<label>'+dataStructure[i].label+'</label>').css('left',(i/vals*100)+'%');
  
    $( "#slider" ).append(el);
    }
  }
  
});

update(0);
})
});




