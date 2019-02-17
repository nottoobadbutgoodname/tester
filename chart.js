window.onload = function() {
  var margin = {top: 20, right: 20, bottom: 30, left: 50}, width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;
  var parseTime = d3.timeParse("%d-%b-%y");
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);
  var valueline = d3.line().x(function(d) { return x(d.date); }).y(function(d) { return y(d.close); });

  var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function(d) {
    d.date = parseTime(d.date);
    d.close = +d.close;
    console.log(d.date, d.close);
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);
  svg.append("path").data([data]).attr("class", "line").attr("d", valueline);
  svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
  svg.append("g").call(d3.axisLeft(y));
}
