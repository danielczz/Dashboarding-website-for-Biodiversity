function buildMetadata(sample) {
    // The following function that builds the metadata panel
    // Use d3 to select the panel with id of `#sample-metadata`
    url_Metadata = "/metadata/" + sample;    

    var Panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    Panel.html("");

    // Use `d3.json` to fetch the metadata for a sample
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

  // Pie Chart

  var datajson = d3.json("/samples/"+ sample);

  var newlist = [];

  datajson.then((data) => {
     
    var reference = data;

    for (i = 0; i < data.otu_ids.length; i++) { 
      newlist.push({
        otu_ids: data.otu_ids[i], 
        sample_values: data.sample_values[i], 
        otu_labels: data.otu_labels[i], 
      });
    };

    newlist.sort((a,b) => b.sample_values - a.sample_values);
    var piedata = Object.entries(newlist).slice(0,10).map(entry => entry[1]);

// Use sample_values as the values for the PIE chart
// Use otu_ids as the labels for the pie chart
// Use otu_labels as the hovertext for the chart

    var final_ids = [];
    var final_values = [];
    var final_labels = [];

    // console.log(final_ids);

    for (j=0; j<10; j++){
      final_ids.push(piedata[j].otu_ids);
      final_values.push(piedata[j].sample_values);
      final_labels.push(piedata[j].otu_labels);
    };

    var data = [{
      values: final_values,
      labels: final_ids,
      hovertext: final_labels,
      showlegend: false,
      hoverinfo: "label+text+value+percent",
      textinfo: "percent",
      type: "pie"
    }];
  
    var layout = {
      height: 350,
      width: 900,
      margin: {
        l: 10,
        r: 10,
        b: 10, 
        t: 10,
        pad: 5
      }
    };
  
    Plotly.plot("pie", data, layout);   
    console.log(reference.otu_ids);
    console.log(reference.sample_values);
    console.log(reference.otu_labels);

      // Bubble Chart
// Use reference.otu_ids for the x values
// Use reference.sample_values for the y values
// Use reference.sample_values for the marker size
// Use reference.otu_ids for the marker colors
// Use reference.otu_labels for the text values

  // @TODO: Build a Bubble Chart using the sample data      
  trace = {
    x: reference.otu_ids,
    y: reference.sample_values,
    mode: "markers",
    name: reference.otu_labels,
    text: reference.otu_labels,
    marker: {
      size: reference.sample_values,
      color: reference.otu_ids,
    }              
  };

    var data = [trace];

    var layout = {
      title: "Belly Button Bubble Plot",
      showlegend: false,
      xaxis: {title:"IDs",},
      yaxis: {title:"Sample Values"},
    }

    Plotly.newPlot("bubble", data, layout);

    return piedata;

  });

};


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

};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialize the dashboard
init();
