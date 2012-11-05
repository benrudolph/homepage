var Me = function() {
  this.header = "Ben Rudolph"
  this.categories = [{ row: 0, column: 0, category: "About"},
                     { row: 0, column: 1, category: "Labs"},
                     { row: 1, column: 0, category: "Interests"},
                     { row: 1, column: 1, category: "Resume"}]

  this.radius = 75
  this.height = $(document).height()
  this.width = $(document).width()
  this.padding = 30

  this.y = d3
      .scale
      .ordinal()
      .rangePoints([(this.height / 2) - (2 * this.radius) - this.padding,
           (this.height / 2) + (2 * this.radius) + this.padding], 1)
      .domain([0, 1])

  this.x = d3
      .scale
      .ordinal()
      .rangePoints([(this.width / 2) - (2 * this.radius) - this.padding,
            (this.width / 2) + (2 * this.radius) + this.padding], 1)
      .domain([0, 1])


  this.svg = d3
      .select("#content")
      .append("svg")
      .attr("class", "svg")
      .attr("height", this.height)
      .attr("width", this.width)
      .append("svg:g")

  this.interestData = {
    technology: [
      { interest: "d3.js",
        score: 100 },
      { interest: "javascript",
        score: 76 },
      { interest: "python",
        score: 52 },
      { interest: "ruby",
        score: 82 }
    ],
    activities: [
      { interest: "gymnastics",
        score: 100 },
      { interest: "biking",
        score: 62 }
    ]

  }

  this.interestGraph = new InterestGraph(this.svg, this.width, this.height, this.interestData)

  this.beakerData = [{
    children: [{
      name: "Africa Refugee Visualization",
      link: "http://vast-gorge-6646.herokuapp.com/",
      size: 100,
      image: "images/africarefugees.png"
    },
    {
      name: "8th Grade Visualization",
      link: "http://mysterious-spire-4062.herokuapp.com/",
      size: 100,
      image: "images/parallelcoords.png"
    },
    {
      name: "International Refugee Flows",
      link: "http://blooming-brook-1209.herokuapp.com/",
      size: 100,
      image: "images/refugeeflows.png"
    },
    {
      name: "Dogger",
      link: "http://www.youtube.com/watch?v=BLXYJ1S82nI",
      size: 100,
      image: "images/beaker.svg"

    }],
    name: "Labs"
  }]

  this.beaker = new Beaker(this.svg, this.width, this.height, this.beakerData)


}

Me.prototype.render = function() {

  this.svg
      .append("circle")
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .attr("r", this.radius)
      .attr("id", "headerCircle")
      .attr("class", "circle")
      .on("mouseover", this.split.bind(this))

  this.svg
      .append("text")
      .attr("class", "circleText")
      .attr("id", "headerText")
      .attr("x", this.width / 2)
      .attr("y", this.height / 2)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em") // vertical-align: middle
      .text(this.header)

}

Me.prototype.split = function() {
  d3.select("#headerCircle").remove()
  d3.select("#headerText").remove()
  var circles = this.svg
      .selectAll(".category")
      .data(this.categories)

  circles
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .attr("r", this.radius)
      .attr("fill", "steelblue")
      .on("click", function(d) {
        if (d.category === "Interests")
          this.renderInterests()
        else if (d.category === "Labs")
          this.renderLabs()
      }.bind(this))

  var text = this.svg
      .selectAll(".circleText")
      .data(this.categories)

  text.enter()
      .append("text")
      .attr("class", "circleText")
      .attr("text-anchor", "middle")
      .attr("x", this.width / 2)
      .attr("y", this.height / 2)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.category
      })

  circles.transition()
      .duration(1000)
      .attr("cx", function(d) {
        return this.x(d.column)
      }.bind(this))
      .attr("cy", function(d) {
        return this.y(d.row)
      }.bind(this))

  text.transition()
      .duration(1000)
      .attr("x", function(d) {
        return this.x(d.column)
      }.bind(this))
      .attr("y", function(d) {
        return this.y(d.row)
      }.bind(this))
}

Me.prototype.clear = function() {
  d3.selectAll(".circle").remove()
  d3.selectAll(".circleText").remove()
}

Me.prototype.renderInterests = function() {
  this.clear()
  this.interestGraph.init()
  this.interestGraph.render()
}

Me.prototype.renderLabs = function(){
  this.clear()
  this.beaker.init()
  this.beaker.render()
}
