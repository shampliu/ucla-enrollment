var svg = d3.select(".pie").append("svg")
    .datum(data)
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.

d3.json("test2.json", function(error, data) {
	if (error) {  //If error is not null, something went wrong.
    console.log(error);  //Log the error.
  } else {      //If no error, the file loaded correctly. Yay!
    console.log(data);   //Log the data.
  }

	console.log(data["results"]);
});

