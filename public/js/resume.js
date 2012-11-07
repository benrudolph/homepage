var Resume = function(svg, svgWidth, svgHeight) {
  this.svg = svg
  this.svgHeight = svgHeight
  this.svgWidth = svgWidth
  this.height = 600
  this.width = 1000
}

Resume.prototype.init = function() {
  this.page = this.svg
      .append("svg:g")
      .attr("height", this.height)
      .attr("width", this.width)
      .attr("class", "resumeContainer")
      .attr("transform", "translate(" + ((this.svgWidth / 2) - (this.width / 2)) + ", " +
            ((this.svgHeight / 2) - (this.height / 2)) + ")")
}

Resume.prototype.render = function() {
  this.page
      .append("image")
      .attr("xlink:href", "images/resume.png")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("x", 0)
      .attr("y", 0)
      .attr("class", "resume")

  this.page
      .append("image")
      .attr("xlink:href", "images/download.svg")
      .attr("width", 30)
      .attr("height", 30)
      .attr("x", this.width - 250)
      .attr("y", 0)
      .attr("class", "download")
      .on("click", function() {
        window.open("/resume.pdf", "_blank")
      })

}
