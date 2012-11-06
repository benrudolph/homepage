var Me = function() {
  this.header = "Ben Rudolph"
  this.categories = [{ row: 0, column: 0, category: "", image: "images/me.png" },
                     { row: 0, column: 1, category: "About"},
                     { row: 0, column: 2, category: "Labs"},
                     { row: 1, column: 1, category: "Interests"},
                     { row: 1, column: 2, category: "Resume"}]

  this.radius = 75
  this.radiusMain = 150
  this.height = $(document).height() > 600 ? $(document).height() : 600
  this.width = $(document).width() > 700 ? $(document).width() : 700
  this.padding = 30
  this.homeWidth = 60
  this.homeHeight = 30
  this.homeStroke = 2

  this.y = d3
      .scale
      .ordinal()
      .rangePoints([(this.height / 2) - (2 * this.radius) - this.padding,
           (this.height / 2) + (2 * this.radius) + this.padding], 1)
      .domain([0, 1])

  this.x = d3
      .scale
      .ordinal()
      .rangePoints([(this.width / 2) - (3 * this.radius) - this.padding,
            (this.width / 2) + (3 * this.radius) + this.padding], 1)
      .domain([0, 1, 2])


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
        score: 82 },
      { interest: "python",
        score: 52 },
      { interest: "ruby",
        score: 74 }
    ],
    activities: [
      { interest: "gymnastics",
        score: 100 },
      { interest: "biking",
        score: 34 },
      { interest: "slacklining",
        score: 82 },
      { interest: "diving",
        score: 76 },
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
      size: 90,
      image: "images/parallelcoords.png"
    },
    {
      name: "International Refugee Flows",
      link: "http://blooming-brook-1209.herokuapp.com/",
      size: 80,
      image: "images/refugeeflows.png"
    },
    {
      name: "Dogger",
      link: "http://www.youtube.com/watch?v=BLXYJ1S82nI",
      size: 67,
      image: "images/dogger.png"

    }],
    name: "Labs"
  }]

  this.beaker = new Beaker(this.svg, this.width, this.height, this.beakerData)

  this.resume = new Resume(this.svg, this.width, this.height)

  this.about = new About(this.svg, this.width, this.height)

}

Me.prototype.render = function() {

  this.svg
      .append("circle")
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .attr("r", this.radiusMain)
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

Me.prototype.renderHomeButton = function() {

  this.svg
      .append("rect")
      .attr("x", -this.homeStroke)
      .attr("y", -this.homeStroke)
      .attr("ry", this.homeStroke)
      .attr("rx", this.homeStroke)
      .attr("width", this.homeWidth)
      .attr("height", this.homeHeight)
      .attr("id", "homeBtn")
      .on("click", this.onHomeClick.bind(this))

  this.svg
      .append("text")
      .attr("x", this.homeWidth / 2 - this.homeStroke)
      .attr("y", this.homeHeight / 2 - this.homeStroke)
      .attr("dy", ".35em") // vertical-align: middle
      .attr("text-anchor", "middle")
      .attr("id", "homeText")
      .text("Home")

}

Me.prototype.split = function() {
  d3.select("#headerCircle")
      .on("mouseover", function() { })
      .transition()
      .duration(1000)
      .attr("r", 0)

  d3.select("#headerText").remove()
  this.renderHome()
}

Me.prototype.renderHome = function(_animate) {
  var animate = _animate === undefined ? true : false
  var circles = this.svg
      .selectAll(".category")
      .data(this.categories)

  var images = this.svg
      .selectAll(".image")
      .data(this.categories.filter(function(d) { return d.image }))

  circles
      .enter()
      .append("circle")
      .attr("class", function(d) {
        var clazz = "circle"
        if (d.image)
          clazz += " imageCircle"
        else
          clazz += " textCircle"
        return clazz
      })
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .attr("r", this.radius)
      .attr("fill", "steelblue")
      .on("click", function(d) {
        if (d.category === "Interests")
          this.renderInterests()
        else if (d.category === "Labs")
          this.renderLabs()
        else if (d.category === "Resume")
          this.renderResume()
        else if (d.category === "About")
          this.renderAbout()
      }.bind(this))

  images
      .enter()
      .append("image")
      .attr("xlink:href", function(d) {
        return d.image
      })
      .attr("width", 2 * this.radius)
      .attr("height", 2 * this.radius)
      .attr("x", (this.width / 2) - this.radius)
      .attr("y", (this.height / 2) - this.radius)


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

  var duration = animate ? 1000 : 0

  circles.transition()
      .duration(duration)
      .attr("cx", function(d) {
        return this.x(d.column)
      }.bind(this))
      .attr("cy", function(d) {
        return this.y(d.row)
      }.bind(this))

  images.transition()
      .duration(duration)
      .attr("x", function(d) {
        return this.x(d.column) - this.radius
      }.bind(this))
      .attr("y", function(d) {
        return this.y(d.row) - this.radius
      }.bind(this))

  text.transition()
      .duration(duration)
      .attr("x", function(d) {
        return this.x(d.column)
      }.bind(this))
      .attr("y", function(d) {
        return this.y(d.row)
      }.bind(this))

}

Me.prototype.onHomeClick = function() {
  this.clear()
  this.renderHome(false)
}

Me.prototype.clear = function() {
  $("svg g:first").empty()
}

Me.prototype.renderInterests = function() {
  this.clear()
  this.renderHomeButton()
  this.interestGraph.init()
  this.interestGraph.render()
}

Me.prototype.renderResume = function() {
  this.clear()
  this.renderHomeButton()
  this.resume.init()
  this.resume.render()
}

Me.prototype.renderLabs = function(){
  this.clear()
  this.renderHomeButton()
  this.beaker.init()
  this.beaker.render()
}

Me.prototype.renderAbout = function(){
  this.clear()
  this.renderHomeButton()
  this.about.init()
  this.about.render()
}

Me.prototype.showHome = function() {
  d3.select("#homeBtn").style("display", "block")
  d3.select("#homeText").style("display", "block")
}

Me.prototype.hideHome = function() {
  d3.select("#homeBtn").style("display", "none")
  d3.select("#homeText").style("display", "none")
}
