var Me = function() {
  this.header = "Ben Rudolph"
  this.categories = [{ row: 0, column: 0, category: "", image: "images/me.png" },
                     { row: 0, column: 1, category: "About"},
                     { row: 0, column: 2, category: "Projects"},
                     { row: 1, column: 1, category: "Interests"},
                     { row: 1, column: 2, category: "Resume"}]


  this.links = [{ type: "linkedin", url: "http://www.linkedin.com/in/brudolph", image: "images/linkedin.png" },
                { type: "wordpress", url: "http://www.pennyhacks.com", image: "images/wordpress.png" },
                { type: "github", url: "http://www.github.com/benrudolph", image: "images/github.png" }]

  this.radius = 75
  this.radiusMain = 150
  this.height = $(document).height() - 5 > 600 ? $(document).height() - 5 : 600
  this.width = $(document).width() - 5 > 700 ? $(document).width() - 5 : 700
  this.padding = 30
  this.homeWidth = 60
  this.homeHeight = 30
  this.homeStroke = 2

  this.radiusLink = 17.5
  this.yLink = this.height - (3 * this.radiusLink)
  this.xLink = d3
      .scale
      .ordinal()
      .rangePoints([(this.width / 2) - ((this.links.length / 2) * 1.5 * this.radiusLink) - (this.radiusLink / 4),
                    (this.width / 2) + ((this.links.length / 2) * 1.5 * this.radiusLink) + (this.radiusLink / 4)])
      .domain(["linkedin", "wordpress", "github"])

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


  this.svgContainer = d3
      .select("#content")
      .append("svg")
      .attr("class", "svg")
      .attr("height", this.height)
      .attr("width", this.width)

  this.svg = this.svgContainer
      .append("svg:g")
      .attr("class", "home")

  this.introCircle = this.svgContainer
      .append("svg:g")
      .attr("class", "introCircle")

  this.interestData = {
    languages: [
      { interest: "C++",
        score: 32 },
      { interest: "javascript",
        score: 82 },
      { interest: "python",
        score: 52 },
      { interest: "ruby",
        score: 74 }
    ],
    frameworks: [
      { interest: "ruby on rails",
        score: 46 },
      { interest: "node.js",
        score: 83 },
      { interest: "django",
        score: 72 },
    ],
    libraries: [
      { interest: "d3.js",
        score: 100 },
      { interest: "three.js",
        score: 100 },
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

  this.interestGraph = new InterestGraph(this.svgContainer, this.width, this.height, this.interestData)
  this.interestGraph.render(false)

  this.beakerData = [{
    children: [{
      name: "Africa Refugee Visualization",
      link: "http://vast-gorge-6646.herokuapp.com/",
      size: 100,
      description: "This is a visualization of refugee camp populations in Africa. It allows you to select groups of camps on the scatter plots and then immediately see where those camps are located allowing for some interesting conclusions. Also by clicking a marker you can see the exact age breakdown for that particular camp.",
      image: "images/africarefugees.png"
    },
    {
      name: "8th Grade Visualization",
      link: "http://mysterious-spire-4062.herokuapp.com/",
      size: 90,
      description: "I worked on this with a partner, Reno Bowen, in my Data Visualization class. We basically took an exhuastive study of 8th graders and found the most interesting patterns and made an interactive visualization. We used Tableau for prototyping and d3.js for the actual implementation.",
      image: "images/parallelcoords.png"
    },
    {
      name: "Support CRES",
      link: "http://supportcres.org",
      size: 61,
      description: "This is a website for a school for the deaf in Cameroon, Africa. My sister, Lisa, volunteered at the school for 3 months and is currently raising money and awareness about the school. The website explains CRES' mission and life at the school.",
      image: "images/cres.png"
    },
    {
      name: "Hacker News Predict",
      link: "/report.pdf",
      size: 90,
      description: "I built this machine learning system for my Applied Machine Learning class. It basically attempts to predict which articles that are submitted to Hacker News will make the front page. Turned out to be a very hard problem as you can imagine. Read the paper if you want a more detailed analysis.",
      image: "images/hnpredict.png"
    },
    {
      name: "International Refugee Flows",
      link: "http://blooming-brook-1209.herokuapp.com/",
      size: 80,
      description: "I made this from data supplied by the UN. It basically maps out for each country where its refugee population originates. The contrast between different regions leads to insights about some of the different problems refugees face when fleeing to a different country.",
      image: "images/refugeeflows.png"
    },
    {
      name: "Dogger",
      link: "http://www.youtube.com/watch?v=BLXYJ1S82nI",
      size: 67,
      description: "This was my very first android app, and satisfied my desire to finally make a mobile game. While the concept is pretty dull (it's Frogger except with a dog), I still learned a lot in the process. I used Beginning Android Games by Mario Zechner as a reference.",
      image: "images/dogger.png"

    }],
    name: "Labs"
  }]

  this.beaker = new Beaker(this.svgContainer, this.width, this.height, this.beakerData)
  this.beaker.render(false)

  this.resume = new Resume(this.svgContainer, this.width, this.height)
  this.resume.render(false)

  this.about = new About(this.svgContainer, this.width, this.height)
  this.about.render(false)

}

Me.prototype.render = function() {

  this.introCircle
      .append("circle")
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .attr("r", this.radiusMain)
      .attr("id", "headerCircle")
      .attr("class", "circle")
      .on("mouseover", this.split.bind(this))

  this.introCircle
      .append("text")
      .attr("class", "circleText")
      .attr("id", "headerText")
      .attr("x", this.width / 2)
      .attr("y", this.height / 2)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em") // vertical-align: middle
      .text(this.header)

  // Render invisible home to load images first
  this.renderHome(false, false)

}

Me.prototype.renderHomeButton = function(isDisplayed) {
  var homeBtnContainer = this.svgContainer
      .append("svg:g")
      .attr("class", "homeBtnContainer")
      .style("display", function() {
        if (isDisplayed)
          return "block"
        else
          return "none"
      })

  homeBtnContainer
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", this.homeWidth)
      .attr("id", "homeBtn")
      .on("click", this.onHomeClick.bind(this))

  homeBtnContainer
      .append("image")
      .attr("xlink:href", "images/home.svg")
      .attr("x", 5)
      .attr("y", 5)
      .attr("width", 32)
      .attr("height", 32)
      .attr("id", "homeText")

}

Me.prototype.split = function() {
  d3.select("#headerCircle")
      .on("mouseover", function() { })
      .transition()
      .duration(1000)
      .attr("r", 0)

  d3.select("#headerText").remove()

  // Empty so we can redraw with animation
  $("svg .home").empty()
  this.renderHome(true, true)
}

Me.prototype.renderHome = function(animate, isDisplayed) {

  if (isDisplayed)
    this.svg.style("display", "block")
  else
    this.svg.style("display", "none")


  var circles = this.svg
      .selectAll(".category")
      .data(this.categories)

  var images = this.svg
      .selectAll(".image")
      .data(this.categories.filter(function(d) { return d.image }))

  var links = this.svg
      .selectAll(".link")
      .data(this.links)

  links
      .enter()
      .append("image")
      .attr("class", function(d) {
        return "link " + d.type
      })
      .attr("xlink:href", function(d) {
        return d.image
      })
      .attr("width", 2 * this.radiusLink)
      .attr("height", 2 * this.radiusLink)
      .attr("x", function(d) {
        return this.xLink(d.type) - this.radiusLink
      }.bind(this))
      .attr("y", this.yLink - this.radiusLink)
      .on("click", function(d) {
        window.open(d.url, "_blank")
      })

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
        this.svg.style("display", "none")
        if (d.category === "Interests")
          this.renderInterests()
        else if (d.category === "Projects")
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

  this.renderHomeButton(false)
}

Me.prototype.onHomeClick = function() {
  this.clear()
  this.svg.style("display", "block")
}

Me.prototype.clear = function() {
  this.hideHomeBtn()
  this.interestGraph.display(false)
  this.beaker.display(false)
  this.resume.display(false)
  this.about.display(false)

}

Me.prototype.renderInterests = function() {
  this.clear()
  this.showHomeBtn()
  this.interestGraph.display(true)
}

Me.prototype.renderResume = function() {
  this.clear()
  this.showHomeBtn()
  this.resume.display(true)
}

Me.prototype.renderLabs = function(){
  this.clear()
  this.showHomeBtn()
  this.beaker.display(true)
}

Me.prototype.renderAbout = function(){
  this.clear()
  this.showHomeBtn()
  this.about.display(true)
}

Me.prototype.showHomeBtn = function() {
  d3.select(".homeBtnContainer").style("display", "block")
}

Me.prototype.hideHomeBtn = function() {
  d3.select(".homeBtnContainer").style("display", "none")
}
