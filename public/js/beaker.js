var Beaker = function(svg, svgWidth, svgHeight, beakerData) {
  this.svg = svg
  this.svgWidth = svgWidth
  this.svgHeight = svgHeight
  this.height = 400
  this.width = 400

  this.beaker = this.svg
      .append("svg:g")
      .attr("height", this.height)
      .attr("width", this.width)
      .attr("transform", "translate(" + ((this.svgWidth / 2) - (this.width / 2)) + ", " +
            ((this.svgHeight / 2) - (this.height / 2)) + ")")


}

Beaker.prototype.render = function() {
  this.beaker
      .append("svg:image")
      .attr("xlink:href", "images/beaker.svg")
      .attr("width", 200)
      .attr("height", 200)
}
