var Beaker = function(svg, svgWidth, svgHeight, beakerData) {
  this.svg = svg
  this.svgWidth = svgWidth
  this.svgHeight = svgHeight
  this.height = 400
  this.width = 400
  this.beaker = undefined
  this.data = beakerData
  this.infoSelector = "#labinfo"
  $(this.infoSelector).css({ left: (this.svgWidth / 2) + (this.width / 2) + "px",
                             top:  (this.svgHeight / 2) - (this.height / 2) + "px" })


  this.pack = d3
      .layout
      .pack()
      .size([this.height, this.width])
      .value(function(d) {
        return d.size
      })


}

Beaker.prototype.display = function(isDisplayed) {
  d3.select(".projects")
      .style("display", function() {
        if (isDisplayed)
          return "block"
        else
          return "none"
      })
}

Beaker.prototype.render = function(isDisplayed) {
  this.beaker = this.svg
      .append("svg:g")
      .attr("height", this.height)
      .attr("width", this.width)
      .attr("class", "projects")
      .attr("transform", "translate(" + ((this.svgWidth / 2) - (this.width / 2)) + ", " +
            ((this.svgHeight / 2) - (this.height / 2)) + ")")
      .style("display", function() {
        if (isDisplayed)
          return "block"
        else
          return "none"
      })

  var lab = this.beaker
      .data(this.data)
      .selectAll(".lab")
      .data(this.pack.nodes)
      .enter()
      .append("g")
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      })

  lab.filter(function(d) { return !d.children; }).append("image")
      .attr("xlink:href", function(d) {
        return d.image
      })
      .attr("width", function(d) {
        return 2 * d.r
      })
      .attr("height", function(d) {
        return 2 * d.r
      })
      .attr("x", function(d) {
        return -(d.r)
      })
      .attr("y", function(d) {
        return -(d.r)
      })
      .attr("class", "labTitle")

  lab.append("circle")
      .attr("r", function(d) {
        return d.r;
      })
      .attr("class", function(d) {
        var clazz = "labCircle"
        if (!d.children)
          clazz += " leaf"
        return clazz
      })
      .on("click", function(d) {
        window.open(d.link, '_blank');
      })
      .on("mouseover", this.displayInfo.bind(this))
      .on("mouseout", this.hideInfo.bind(this))
}

Beaker.prototype.displayInfo = function(d) {
  if (d.children)
    return
  $(this.infoSelector).css("display","block")
  $(this.infoSelector + " .name").text(d.name)
  $(this.infoSelector + " .description").text(d.description)

}

Beaker.prototype.hideInfo = function(d) {
  if (d.children)
    return
  $(this.infoSelector).css("display","none")

}
