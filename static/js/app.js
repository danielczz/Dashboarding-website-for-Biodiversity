function buildMetadata(sample) {
  // Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var Panel = d3.select("#sample-metadata");
    
    // Use `.html("") to clear any existing metadata
    Panel.html("");
    
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    url_Metadata = "/metadata/" + sample;    

    var Panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    Panel.html("");

    // url_Metadata = "/metadata/975";

    d3.json(url_Metadata).then((sample_Metadata) => {
      Object.entries(sample_Metadata).forEach(([key, value]) => {       
        //  Lets create a row per content in the sample_Metadata
        var row = Panel.append("h6");       
        //  Lets create the content that goes on the row (With non-breaking spaces)
        var content = key+':'+'\xa0'+value;       
        row.text(content);
      });
    });

}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    pie_plot = d3.json()
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });

  var data = [{
    values: [19, 26, 55, 88],
    labels: ["Spotify", "Soundcloud", "Pandora", "Itunes"],
    type: "pie"
  }];

  var layout = {
    height: 600,
    width: 800
  };

  Plotly.plot("pie", data, layout);








}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
