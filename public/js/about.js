var About = function(svg, svgWidth, svgHeight) {
  this.svg = svg
  this.svgWidth = svgWidth
  this.svgHeight = svgHeight
  this.height = 400
  this.width = 400

}

About.prototype.init = function() {
  this.about = this.svg
      .append("svg:g")
      .attr("height", this.height)
      .attr("width", this.width)
      .attr("transform", "translate(" + ((this.svgWidth / 2) - (this.width / 2)) + ", " +
            ((this.svgHeight / 2) - (this.height / 2)) + ")")
}

About.prototype.render = function() {
      $("#about").css({ top: (this.svgHeight / 2) - (this.height / 2) + 25 + "px",
                        left: (this.svgWidth / 2) - (360 / 2) + "px",
                        display: "block" })
      $("#about").html("I'm a hard working Stanford student who enjoys programming, learning, gymnastics, analyzing data, rock climbing, slacklining, and biking. I'm majoring in Computer Science -- technically my focus is Information Track (whatever that means), but I just took the classes I found interesting and that was the track that I happened to complete. I'm 22 years old and planning on graduating in 2013, and then I have no idea what I'm going to do. My ultimate goal in life (as of now) is to help those in extreme need through the use of technology.<br /><br /> I grew up in Naperville, Illinois, a suburb of Chicago. Throughout my 18 years there, I built up character walking through the snow one mile uphill (both ways) to get to school. If you have any questions or want to collaborate, don't hesitate to email me at rudolphben at gmail dot com.")

  this.about
      .append("circle")
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .attr("r", this.width / 2 + 50)
      .attr("class", "aboutCircle")
}
