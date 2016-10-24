$(document).ready(function () {

    d3.selection.prototype.moveToFront = function() {  
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };
    d3.selection.prototype.moveToBack = function() {  
        return this.each(function() { 
            var firstChild = this.parentNode.firstChild; 
            if (firstChild) { 
                this.parentNode.insertBefore(this, firstChild); 
            } 
        });
    };

  var data = d3.range(1000).map(d3.randomBates(10));

  var formatCount = d3.format(",.0f");

  var margin = {top: 10, right: 30, bottom: 30, left: 30},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scaleLinear()
      .rangeRound([0, width]);

  var bins = d3.histogram()
      .domain(x.domain())
      .thresholds(x.ticks(20))
      (data);

  var y = d3.scaleLinear()
      .domain([0, d3.max(bins, function(d) { return d.length; })])
      .range([height, 0]);

  $('#f .col-wrapper').css('background-color', '#00c481');
  var svg = d3.select("#f .col-wrapper").append("svg")
      .attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr("width", '100%')
      .attr("height",'100%')
      .append("g")
        //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
  var viewer = svg.append('text')
    .attr('id','#viewer')
    .attr('font-size', '100px')
    .attr('text-anchor', 'middle')
    .attr('opacity', '0')
    .attr('x', width/2)
    .attr('y', '0px');

  var bar = svg.selectAll(".bar")
      .data(bins)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

  bar.append("rect")
      .attr("x", 5)
      .attr("width", x(bins[0].x1) - x(bins[0].x0) - 5)
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('rx', '5px')
      .attr('ry', '5px')
      .attr('stroke-width', '2px')
      .attr("height", function(d) { return height - y(d.length); })
      .on('mouseover', function (e) {
        viewer.text(formatCount(e.length))
          .transition()
          .delay(250)
          .duration(500)
          .attr('opacity', '1')

        var _par = d3.select(this)
          .transition()
          .duration(500)
          .attr('fill', '#ffab06')
      })
      .on('mouseout', function(e) {
        viewer
          .transition()
          .duration(500)
          .attr('opacity', '0')
        var _par = d3.select(this)
          .transition()
          .duration(500)
          .attr('fill', 'white')
      })
      .on('click', function (e) {
        console.log(this);
      });

  bar.append("text")
      .attr("dy", ".75em")
      .attr("y", 6)
      .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
      .attr("text-anchor", "middle")
      .text(function(d) { return formatCount(d.length); });

  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
 
  
  bar.on('click', function (e) {
    console.log(e);
  });



});
