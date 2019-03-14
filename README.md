# Dashboarding-website-for-Biodiversity
The main description goes here...

# JavaScript & DOM Methods

## Authors
* Daniel Cespedes - [LinkedIn](https://www.linkedin.com/in/selinzorob/) - [GitHub](https://github.com/danielczz)


![Landing page](static/images/landing.jpg)


## Project Outline
In this project we are going to create a webpage to share insights about about our main topic: **"UFO Sightings"**. To create the analysis we are going to load data provide from many different UFO sightings in different time-zones the globe. 

In order to provide a better analytical application the user could change the data provided through input fields for different dimensions within the data, such as:  _Date/time, City, State, Country and Shape._

Here is a link for the final webpage application:
[_UFO Sightings webpage_](https://danielczz.github.io/JavaScript-DOM-Methods/) 

### **Technology Landscape**

1. JavaScript, one of the core technologies of the World Wide Web.
[_JavaScript_](https://www.javascript.com/)

1. HTML - _Hypertext Markup Language_ is the standard markup language for creating web pages and web applications.
[_HTML_](https://www.w3.org/html/)

1. CSS - _Cascading Style Sheets_ is a style sheet language used for describing the presentation of a document written in a markup language like HTML.
[_CSS_](https://developer.mozilla.org/es/docs/Web/CSS)

1. D3.js - _Data Driven Document for JavaScript_ is a JavaScript library for producing dynamic, interactive data visualizations in web browsers.
[_D3.js_](https://d3js.org/)

1. DOM - _The Document Object Model_ is an application programming interface (API) for HTML and XML documents.
[_DOM_](https://www.w3.org/TR/DOM-Level-1/introduction.html)

## Data Analysis Framework

### **Data gathering**
- Data provided for the analysis on a JavaScript file called "data.js". 
- The dataset contains reports of UFO sightings over the last century. 
- It uses UFO-Sighting data freely available online here: [_UFO Sightings_](https://www.kaggle.com/NUFORC/ufo-sightings)
- This is a 2 records extraction from the data provided. Find the complete data available here: [_data.js_](static/js/data.js)

```JS
// Data preview
var data = [{
    datetime: "1/1/2010",
    city: "benton",
    state: "ar",
    country: "us",
    shape: "circle",
    durationMinutes: "5 mins.",
    comments: "4 bright green circles high in the sky going in circles then one bright green light at my front door."
  },
  {
    datetime: "1/1/2010",
    city: "bonita",
    state: "ca",
    country: "us",
    shape: "light",
    durationMinutes: "13 minutes",
    comments: "Three bright red lights witnessed floating stationary over San Diego New Years Day 2010"
  }
```

### **Data extraction and load**
This is a brief sample extraction of the JavaScript code. Find the complete code available here: [_app.js_](static/js/app.js)

```JS

// Declaration of HTML references 
// Select the submit and reset button
var submit = d3.select("#filter-btn");

submit.on("click", function() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Reference to select input elements on HTML
  var inputElementDatetime = d3.select("#datetime");
  var inputElementCity = d3.select("#city");
  var inputElementState = d3.select("#state");
  var inputElementCountry = d3.select("#country");
  var inputElementShape = d3.select("#shape");

  // Get values from inputElement value
  var inputValueDatetime = inputElementDatetime.property("value");
  var inputValueCity = inputElementCity.property("value");
  var inputValueState = inputElementState.property("value");
  var inputValueCountry = inputElementCountry.property("value");
  var inputValueShape = inputElementShape.property("value");

  // Filter data using input values
  // Getting value entry Lengths
  var entryLengthDatetime = inputValueDatetime.length;
  var entryLengthCity = inputValueCity.length;
  var entryLengthState = inputValueState.length;
  var entryLengthCountry = inputValueCountry.length;
  var entryLengthShape = inputValueShape.length;

});
```

### **Data analysis**
This is a brief sample extraction of the JavaScript code. Find the complete code available here: [_app.js_](static/js/app.js)

```JS 
...
  if (entryLengthDatetime > 0) {
    console.log(inputValueDatetime)
    var filteredData = data.filter(report => report.datetime === inputValueDatetime);
  }

  else if (entryLengthCity > 0) {
    var filteredData = data.filter(report => report.city === inputValueCity);
  }

  else if (entryLengthState > 0) {
    var filteredData = data.filter(report => report.state === inputValueState);
  }
  
  else if (entryLengthCountry > 0) {
    var filteredData = data.filter(report => report.country === inputValueCountry);
  }

  else if (entryLengthShape > 0) {
    var filteredData = data.filter(report => report.shape === inputValueShape);
  }
...
```
### **Data results**
This is a brief sample extraction of the JavaScript code. Find the complete code available here: [_app.js_](static/js/app.js)

```JS
...
    // Review values on console
    console.log(filteredData);

  // Get a reference to the table body 
  var tbody = d3.select("tbody");
  
  // Remove possible data populated before 
  d3.selectAll("tbody > *").remove();
  
  // Use filteredData to populate table using ForEach
  filteredData.forEach((UFOReport) => {
    var row = tbody.append("tr");
    Object.entries(UFOReport).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });
...
```
### **Data sharing**
Here is a link for the final webpage application:
[_UFO Sightings webpage_](https://danielczz.github.io/JavaScript-DOM-Methods/) 

Here you can find a screencapture of the final application:
![Screencapture](static/images/screen_captures/Level_1_screencapture.png)

Here you can find the assets files for the output: 
- Level 1: Enter a datetime:
[_datetime_](static/images/screen_captures/Level_1_screencapture.png)
- Level 2: Enter a city:
[_city_](static/images/screen_captures/Level_2_city.png)
- Level 2: Enter a state:
[_state_](static/images/screen_captures/Level_2_state.png)
- Level 2: Enter a country:
[_country_](static/images/screen_captures/Level_2_country.png)
- Level 2: Enter a shape:
[_shape_](static/images/screen_captures/Level_2_shape.png)

# Belly Button Biodiversity

![Bacteria by filterforge.com](Images/bacteria_by_filterforgedotcom.jpg)

In this assignment, you will build an interactive dashboard to explore the [Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/).

## Step 1 - Plotly.js

Use Plotly.js to build interactive charts for your dashboard.

* Create a PIE chart that uses data from your samples route (`/samples/<sample>`) to display the top 10 samples.

  * Use `sample_values` as the values for the PIE chart

  * Use `otu_ids` as the labels for the pie chart

  * Use `otu_labels` as the hovertext for the chart

  ![PIE Chart](Images/pie_chart.png)

* Create a Bubble Chart that uses data from your samples route (`/samples/<sample>`) to display each sample.

  * Use `otu_ids` for the x values

  * Use `sample_values` for the y values

  * Use `sample_values` for the marker size

  * Use `otu_ids` for the marker colors

  * Use `otu_labels` for the text values

  ![Bubble Chart](Images/bubble_chart.png)

* Display the sample metadata from the route `/metadata/<sample>`

  * Display each key/value pair from the metadata JSON object somewhere on the page

* Update all of the plots any time that a new sample is selected.

* You are welcome to create any layout that you would like for your dashboard. An example dashboard page might look something like the following.

![Example Dashboard Page](Images/dashboard_part1.png)
![Example Dashboard Page](Images/dashboard_part2.png)

## Step 2 - Heroku

Deploy your Flask app to Heroku.

* You can use the provided sqlite file for the database.

* Ask your Instructor and TAs for help!

- - -

## Advanced Challenge Assignment (Optional)

The following task is completely optional and is very advanced.

* Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the Weekly Washing Frequency obtained from the route `/wfreq/<sample>`

* You will need to modify the example gauge code to account for values ranging from 0 - 9.

* Update the chart whenever a new sample is selected

![Weekly Washing Frequency Gauge](Images/gauge.png)

- - -

## Flask API

Use Flask API starter code to serve the data needed for your plots.

* Test your routes by visiting each one in the browser.

- - -

## Hints

* Don't forget to `pip install -r requirements.txt` before you start your server.

* Use `console.log` inside of your JavaScript code to see what your data looks like at each step.

* Refer to the [Plotly.js Documentation](https://plot.ly/javascript/) when building the plots.

- - -

### Copyright

Data Boot Camp © 2018. All Rights Reserved.
