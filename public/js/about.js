var About = function(svg, svgWidth, svgHeight) {
  this.svg = svg
  this.svgWidth = svgWidth
  this.svgHeight = svgHeight
  this.height = 400
  this.width = 400

}

About.prototype.display = function(isDisplayed) {
  d3.select(".about")
      .style("display", function() {
        if (isDisplayed)
          return "block"
        else
          return "none"
      })
}

About.prototype.render = function(isDisplayed) {
  this.about = this.svg
      .append("svg:g")
      .attr("height", this.height)
      .attr("width", this.width)
      .attr("class", "about")
      .attr("transform", "translate(" + ((this.svgWidth / 2) - (this.width / 2)) + ", " +
            ((this.svgHeight / 2) - (this.height / 2)) + ")")
      .style("display", function() {
        if (isDisplayed)
          return "block"
        else
          return "none"
      })

  this.about
      .append("image")
      .attr("xlink:href", "images/about.png")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("x", 0)
      .attr("y", 0)
      .attr("class", "about")

  this.about
      .append("circle")
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .attr("r", this.width / 2 + 30)
      .attr("class", "aboutCircle")
}
