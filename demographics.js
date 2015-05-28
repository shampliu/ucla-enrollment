$(document).ready( function(){
var w = 650;
var h = 400;
var r = 150;
var ir = 75;
var textOffset = 24;
var tweenDuration = 1050;

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

///////////////////////////////////////////////////////////
// GENERATE FAKE DATA /////////////////////////////////////
///////////////////////////////////////////////////////////

var data;

var dataStructure = [
   {
      "data": [
      {
        "itemLabel":"American Indian or Alaskan Native",
        "itemValue":110
      },
      {
        "itemLabel":"Asian or Pacific Islander",
        "itemValue":8082
      },
      {
        "itemLabel": "Black Non-Hispanic",
        "itemValue": 916
      },
      {
        "itemLabel":"Foreign",
        "itemValue":2704
      },
      {
        "itemLabel":"Hispanic",
        "itemValue":4222
      },
      {
        "itemLabel":"Unstated, Unknown, Other",
        "itemValue":691
      },
      {
        "itemLabel":"White Non-Hispanic",
        "itemValue":691
      },
    ],
    "label":"2014"
  },
  {
     "data": [
      {
        "itemLabel":"American Indian or Alaskan Native",
        "itemValue":116
      },
      {
        "itemLabel":"Asian or Pacific Islander",
        "itemValue":7951
      },
      {
        "itemLabel": "Black Non-Hispanic",
        "itemValue":848
      },
      {
        "itemLabel":"Foreign",
        "itemValue":2384
      },
      {
        "itemLabel":"Hispanic",
        "itemValue":3864
      },
      {
        "itemLabel":"Unstated, Unknown, Other",
        "itemValue":722
      },
      {
        "itemLabel":"White Non-Hispanic",
        "itemValue":5781
      },
    ],
     "label":"2013"
   },
   {
     "data": [
      {
        "itemLabel":"American Indian or Alaskan Native",
        "itemValue":107
      },
      {
        "itemLabel":"Asian or Pacific Islander",
        "itemValue":7777
      },
      {
        "itemLabel": "Black Non-Hispanic",
        "itemValue":817
      },
      {
        "itemLabel":"Foreign",
        "itemValue":1945
      },
      {
        "itemLabel":"Hispanic",
        "itemValue":3563
      },
      {
        "itemLabel":"Unstated, Unknown, Other",
        "itemValue":639
      },
      {
        "itemLabel":"White Non-Hispanic",
        "itemValue":5764
      },
    ],
    "label":"2012"
  },
  {
     "data": [
      {
        "itemLabel":"American Indian or Alaskan Native",
        "itemValue":92
      },
      {
        "itemLabel":"Asian or Pacific Islander",
        "itemValue":7798
      },
      {
        "itemLabel": "Black Non-Hispanic",
        "itemValue":838
      },
      {
        "itemLabel":"Foreign",
        "itemValue":1101
      },
      {
        "itemLabel":"Hispanic",
        "itemValue":3284
      },
      {
        "itemLabel":"Unstated, Unknown, Other",
        "itemValue":633
      },
      {
        "itemLabel":"White Non-Hispanic",
        "itemValue":6066
      },
    ],
    "label":"2011"
  },
  {
     "data": [
      {
        "itemLabel":"American Indian or Alaskan Native",
        "itemValue":77
      },
      {
        "itemLabel":"Asian or Pacific Islander",
        "itemValue":7537
      },
      {
        "itemLabel": "Black Non-Hispanic",
        "itemValue":814
      },
      {
        "itemLabel":"Foreign",
        "itemValue":612
      },
      {
        "itemLabel":"Hispanic",
        "itemValue":2909
      },
      {
        "itemLabel":"Unstated, Unknown, Other",
        "itemValue":654
      },
      {
        "itemLabel":"White Non-Hispanic",
        "itemValue":5912
      },
    ],
    "label":"2010"
  },
  {
     "data": [
      {
        "itemLabel":"American Indian or Alaskan Native",
        "itemValue":69
      },
      {
        "itemLabel":"Asian or Pacific Islander",
        "itemValue":7934
      },
      {
        "itemLabel": "Black Non-Hispanic",
        "itemValue":737
      },
      {
        "itemLabel":"Foreign",
        "itemValue":420
      },
      {
        "itemLabel":"Hispanic",
        "itemValue":2873
      },
      {
        "itemLabel":"Unstated, Unknown, Other",
        "itemValue":688
      },
      {
        "itemLabel":"White Non-Hispanic",
        "itemValue":6157
      },
    ],
    "label":"2009"
  },
  {
     "data": [
      {
        "itemLabel":"American Indian or Alaskan Native",
        "itemValue":56
      },
      {
        "itemLabel":"Asian or Pacific Islander",
        "itemValue":7897
      },
      {
        "itemLabel": "Black Non-Hispanic",
        "itemValue":668
      },
      {
        "itemLabel":"Foreign",
        "itemValue":395
      },
      {
        "itemLabel":"Hispanic",
        "itemValue":2728
      },
      {
        "itemLabel":"Unstated, Unknown, Other",
        "itemValue":740
      },
      {
        "itemLabel":"White Non-Hispanic",
        "itemValue":6226
      },
    ],
    "label":"2008"
  },
  {
     "data": [
      {
        "itemLabel":"American Indian or Alaskan Native",
        "itemValue":59
      },
      {
        "itemLabel":"Asian or Pacific Islander",
        "itemValue":7756
      },
      {
        "itemLabel": "Black Non-Hispanic",
        "itemValue":592
      },
      {
        "itemLabel":"Foreign",
        "itemValue":415
      },
      {
        "itemLabel":"Hispanic",
        "itemValue":2560
      },
      {
        "itemLabel":"Unstated, Unknown, Other",
        "itemValue":727
      },
      {
        "itemLabel":"White Non-Hispanic",
        "itemValue":5957
      },
    ],
    "label":"2007"
  },
  {
     "data": [
      {
        "itemLabel":"American Indian or Alaskan Native",
        "itemValue":64
      },
      {
        "itemLabel":"Asian or Pacific Islander",
        "itemValue":7694
      },
      {
        "itemLabel": "Black Non-Hispanic",
        "itemValue":520
      },
      {
        "itemLabel":"Foreign",
        "itemValue":382
      },
      {
        "itemLabel":"Hispanic",
        "itemValue":2551
      },
      {
        "itemLabel":"Unstated, Unknown, Other",
        "itemValue":767
      },
      {
        "itemLabel":"White Non-Hispanic",
        "itemValue":5894
      },
    ],
    "label":"2006"
  },
  {
     "data": [
      {
        "itemLabel":"American Indian or Alaskan Native",
        "itemValue":64
      },
      {
        "itemLabel":"Asian or Pacific Islander",
        "itemValue":7331
      },
      {
        "itemLabel": "Black Non-Hispanic",
        "itemValue":573
      },
      {
        "itemLabel":"Foreign",
        "itemValue":290
      },
      {
        "itemLabel":"Hispanic",
        "itemValue":2529
      },
      {
        "itemLabel":"Unstated, Unknown, Other",
        "itemValue":870
      },
      {
        "itemLabel":"White Non-Hispanic",
        "itemValue":5656
      },
    ],
    "label":"2005"
  },

];

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

//PLACEHOLDER GRAY CIRCLE
// var paths = arc_group.append("svg:circle")
//     .attr("fill", "#EFEFEF")
//     .attr("r", r);

///////////////////////////////////////////////////////////
// CENTER TEXT ////////////////////////////////////////////
///////////////////////////////////////////////////////////

//WHITE CIRCLE BEHIND LABELS
var whiteCircle = center_group.append("svg:circle")
  .attr("fill", "white")
  .attr("r", ir);

///////////////////////////////////////////////////////////
// STREAKER CONNECTION ////////////////////////////////////
///////////////////////////////////////////////////////////

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
        .attrTween("d", pieTween);
    paths
      .transition()
        .duration(tweenDuration)
        .attrTween("d", pieTween);
    paths.exit()
      .transition()
        .duration(tweenDuration)
        .attrTween("d", removePieTween)
      .remove();

    //DRAW TICK MARK LINES FOR LABELS
    lines = label_group.selectAll("line").data(filteredPieData);
    lines.enter().append("svg:line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", -r-3)
      .attr("y2", -r-15)
      .attr("stroke", "gray")
      .attr("transform", function(d) {
        return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
      });
    lines.transition()
      .duration(tweenDuration)
      .attr("transform", function(d) {
        return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
      });
    lines.exit().remove();

    //DRAW LABELS WITH PERCENTAGE VALUES
    valueLabels = label_group.selectAll("text.value").data(filteredPieData)
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 5;
        } else {
          return -7;
        }
      })
      .attr("text-anchor", function(d){
        if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
          return "beginning";
        } else {
          return "end";
        }
      })
      .text(function(d){
        var percentage = (d.value/sliceProportion)*100;
        return percentage.toFixed(1) + "%";
      });

    valueLabels.enter().append("svg:text")
      .attr("class", "value")
      .attr("transform", function(d) {
        return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
      })
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 5;
        } else {
          return -7;
        }
      })
      .attr("text-anchor", function(d){
        if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
          return "beginning";
        } else {
          return "end";
        }
      }).text(function(d){
        var percentage = (d.value/sliceProportion)*100;
        return percentage.toFixed(1) + "%";
      });

    valueLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

    valueLabels.exit().remove();



    //DRAW LABELS WITH ENTITY NAMES
    nameLabels = label_group.selectAll("text.units").data(filteredPieData)
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 17;
        } else {
          return 5;
        }
      })
      .attr("text-anchor", function(d){
        if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
          return "beginning";
        } else {
          return "end";
        }
      }).text(function(d){
        return d.name;
      });

    nameLabels.enter().append("svg:text")
      .attr("class", "units")
      .attr("transform", function(d) {
        return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
      })
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 17;
        } else {
          return 5;
        }
      })
      .attr("text-anchor", function(d){
        if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
          return "beginning";
        } else {
          return "end";
        }
      }).text(function(d){
        return d.name;
      });

    nameLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

    nameLabels.exit().remove();
    
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
    max: 9,
    step: 1,
    slide: function( event, ui ) {
        update(ui.value);
        console.log(ui.value);
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