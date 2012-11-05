var Beaker = function(svg, svgWidth, svgHeight, beakerData) {
  this.svg = svg
  this.svgWidth = svgWidth
  this.svgHeight = svgHeight
  this.height = 400
  this.width = 400
  this.beaker = undefined
  this.data = beakerData


  this.pack = d3
      .layout
      .pack()
      .size([this.height, this.width])
      .value(function(d) {
        return d.size
      })


}

Beaker.prototype.init = function() {
  this.beaker = this.svg
      .append("svg:g")
      .attr("height", this.height)
      .attr("width", this.width)
      .attr("transform", "translate(" + ((this.svgWidth / 2) - (this.width / 2)) + ", " +
            ((this.svgHeight / 2) - (this.height / 2)) + ")")


}

Beaker.prototype.render = function() {
  var lab = this.beaker
      .data(this.data)
      .selectAll(".lab")
      .data(this.pack.nodes)
      .enter()
      .append("g")
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      })

  lab.filter(function(d) { return !d.children; }).append("g")
      .attr("transform", function(d) {
        return "translate(0, " + -d.r + ")"
      })
      .each(function(d) {
        if (d.children)
          return
        var options = {
          title: d.name,
          trigger: "hover",
          content: "yay",
          placement: "top"
        }
        $(this).popover(options)
      })
      .attr("id", function(d) {
        return d.name.replace(/ /g, "")
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
      .on("mouseover", function(d) {
        if (!d.children)
          $("#" + d.name.replace(/ /g,"")).trigger("mouseover")
      })
      .on("mouseout", function(d) {
        if (!d.children)
          $("#" + d.name.replace(/ /g,"")).trigger("mouseout")
      })
}
