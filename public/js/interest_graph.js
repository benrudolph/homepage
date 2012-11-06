var InterestGraph = function(svg, svgWidth, svgHeight, interestData) {
  this.svg = svg
  this.svgWidth = svgWidth
  this.svgHeight = svgHeight
  this.height = 300
  this.width = 400
  this.legendWidth = 200


  this.barWidth = 20
  this.padding = 10

  this.data = d3.map(interestData)
  this.selectedCategory = "technical"
  this.selectedData = this.data.get(this.selectedCategory)

  this.domain = []

  this.categoryHeight = 30
  this.categoryWidth = 100
  this.categoryPadding = 5

  this.x = d3
      .scale
      .ordinal()
      .rangePoints([0,
          this.width], 1)

  this.y = d3
      .scale
      .linear()
      .domain([0, 100])
      .range([0, this.height])
}

InterestGraph.prototype.setDomain = function() {

  this.domain = []
  this.selectedData.forEach(function(d) {
    if (this.domain.indexOf(d.interest) === -1)
      this.domain.push(d.interest)
  }.bind(this))
  this.x
      .domain(this.domain)
}

InterestGraph.prototype.init = function() {
  this.barGraph = this.svg
      .append("svg:g")
      .attr("height", this.height)
      .attr("width", this.width)
      .attr("transform", "translate(" + ((this.svgWidth / 2) - (this.width / 2)) + ", " +
            ((this.svgHeight / 2) - (this.height / 2)) + ")")

  this.legend = this.svg
      .append("svg:g")
      .attr("class", "legend")
      .attr("height", this.height)
      .attr("width", this.legendWidth)
      .attr("transform", "translate(" + ((this.svgWidth / 2) + (this.width / 2)) + ", " +
            ((this.svgHeight / 2) - (this.height / 2)) + ")")

}

InterestGraph.prototype.render = function() {

  this.setDomain()

  var bars = this.barGraph
      .selectAll(".bar")
      .data(this.selectedData, function(d) {
        return d.interest
      })

  bars
      .enter()
      .append("rect")
      .attr("x", function(d) {
        return this.x(d.interest) - (this.barWidth / 2)
      }.bind(this))
      .attr("width", this.barWidth)
      .attr("y", this.height)
      .attr("height", 0)
      .attr("class", "bar")

  bars
      .transition()
      .duration(1000)
      .attr("y", function(d) {
        return this.height - this.y(d.score)
      }.bind(this))
      .attr("height", function(d) {
        return this.y(d.score)
      }.bind(this))

  bars
      .exit()
      .remove()

  var labels = this.barGraph
      .selectAll(".barLabel")
      .data(this.selectedData, function(d) {
        return d.interest
      })

  labels
      .enter()
      .append("text")
      .attr("x", function(d) {
        return this.x(d.interest)
      }.bind(this))
      .attr("y", this.height)
      .attr("text-anchor", "middle")
      .attr("class", "barLabel")
      .text(function(d) {
        return d.interest
      })

  labels
      .transition()
      .duration(1000)
      .attr("y", function(d) {
        return this.height - this.y(d.score) - 4
      }.bind(this))

  labels
      .exit()
      .remove()

  var xaxis = this.barGraph
      .append("line")
      .attr("class", "xaxis")
      .attr("x1", 0)
      .attr("x2", this.width)
      .attr("y1", this.height)
      .attr("y2", this.height)

  this.renderLegend()
}

InterestGraph.prototype.renderLegend = function() {
  var categories = this.legend
      .selectAll(".categoryText")
      .data(this.data.keys())

  categories
      .enter()
      .append("text")
      .attr("y", function(d, i) {
        return (this.categoryHeight * i) + (this.categoryHeight / 4)
      }.bind(this))
      .attr("x", this.legendWidth / 2)
      .attr("dy", ".75em")
      .attr("class", "categoryText")
      .attr("text-anchor", "middle")
      .text(String)

  var categoryContainers = this.legend
      .selectAll(".categoryContainer")
      .data(this.data.keys())

  categoryContainers
      .enter()
      .append("rect")
      .attr("class", function(d) {
        var clazz = "categoryContainer"
        if (d === this.selectedCategory)
          clazz += " selectedCategory"
        return clazz
      }.bind(this))
      .attr("y", function(d, i) {
        return this.categoryHeight * i
      }.bind(this))
      .attr("x", (this.legendWidth / 2) - (this.categoryWidth / 2))
      .attr("ry", 10)
      .attr("rx", 10)
      .attr("width", this.categoryWidth)
      .attr("height", this.categoryHeight - this.categoryPadding)
      .attr("category", function(d) {
        return d
      })
      .on("click", this.switchCategory.bind(this))

}

InterestGraph.prototype.switchCategory = function() {
  var target = d3.select(d3.event.target)
  var category = target.attr("category")

  if (category === this.selectedCategory)
    return

  d3.select(".selectedCategory").classed("selectedCategory", false)
  this.selectedCategory = category
  this.selectedData = this.data.get(this.selectedCategory)

  target.classed("selectedCategory", true)
  this.render()

}
