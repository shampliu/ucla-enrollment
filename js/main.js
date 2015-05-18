var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2 - 10;

var data = d3.range(10).map(Math.random).sort(d3.descending);

var color = d3.scale.category20();

var arc = d3.svg.arc()
    .outerRadius(radius);

var pie = d3.layout.pie();

var svg = d3.select(".pie").append("svg")
    .datum(data)
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var arcs = svg.selectAll("g.arc")
    .data(pie)
  .enter().append("g")
    .attr("class", "arc");

arcs.append("path")
    .attr("fill", function(d, i) { return color(i); })
  .transition()
    .ease("bounce")	
    .duration(2000)
    .attrTween("d", tweenPie)
  .transition()
    .ease("elastic")
    .delay(function(d, i) { return 2000 + i * 50; })
    .duration(750)
    .attrTween("d", tweenDonut);

function tweenPie(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

function tweenDonut(b) {
  b.innerRadius = radius * .6;
  var i = d3.interpolate({innerRadius: 0}, b);
  return function(t) { return arc(i(t)); };
}

$(function() {
	$.getJSON('enrollment-history.json', function(data) {
		// rawData = data;
		// dict = []
		// majors = _.sortBy(_.keys(rawData), function(key) { return key; });
		// sortedMajors = _.sortBy(majors, function(key) { return rawData[key]['Total Campus']});
		// for (i = 0; i < majors.length; i ++)
		// 	dict.push({id: majors[i], text: majors[i]});
		// dict = _.sortBy(dict, function(x) { return x.id; });
		// $("select#major-select").select2({data: dict});
		// $("select#major-select").on("select2:select", function(e) { majorChangeTo(e.params.data.id);});

		// x = d3.scale.ordinal().rangeRoundBands([0, width], .1).domain(keys);
		// y = d3.scale.linear().range([height, 0]);
		// colorScale = d3.scale.linear().range([45, 15]).domain([0, 1898]);

		// plotChartMajor('Aerospace Engineering');
	});
});