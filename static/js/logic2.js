d3.selectAll("#athletesDataset").on("change", athleteChanged);
var select = document.getElementById("athletesDataset");
​
​
// function that populates the meta data
function buildMetaData(sample)
{
    
// use d3.json inorder to get the data    
    d3.json("/api/v1.0/athlete/demographic").then((data) => {
        // grab all of the metadata
        let metaData = data;
        console.log(`metadata`,metaData);
        let result;
        console.log(`reset result`, result)
        
        
        console.log(sample)
            
            
        for (var i = 0; i < metaData.length; i++)
        {
            // console.log(metaData[i].name)
            // console.log(sample)
            //console.log(`does this match`, metaData[i].name `==`, sample)
            if(metaData[i].name == sample)
            {
                result = metaData[i];
                break;
            }
                
​
        };
        console.log(`result`,result)
​
        // clear the metadata out
        d3.select("#demographics").html("");
​
        // use Object.entries to get the value key pairs
        Object.entries(result).forEach(([key, value]) =>{
            d3.select("#demographics")
                .append("h4").text(`${key}: ${value}`);
        })
        
    });
}
​
​
// function that builds the bar chart
function buildBarChart(sample)
{
    url = "/api/v1.0/country/total_medals/" + sample
    // use d3.json inorder to get the data
    d3.json(url).then((data) => {
        // grab all of the sample data
        let sampleData = data;
        console.log(`APICALL`,sampleData);
        let country_labels = [];
        let medal_values = [];
        for(var i = 0; i < sampleData.length; i++)
        {
            console.log(sampleData[i].total_medals);
            country_labels.push(sampleData[i].total_medals)
            medal_values.push(sampleData[i].country)
        }
        /*
        let result = sampleData.filter(sampleResults => sampleResults.id == sample);
        //console.log(result)
        //access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);
        */
        //let otu_ids = resultData.otu_ids;
        console.log(`country`, country_labels);
        console.log(`medal`, medal_values);
        //console.log(sample_values);
        let yticks = medal_values.slice(0, 10);
        let xValues = country_labels.slice(0, 10);
        //let textLabels = country_labels.slice(0, 10);
        //console.log(textLabels);
        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            //text: textLabels.reverse(),
            type: "bar",
            orientation: "h",
            transforms: {
                type: "sort",
                target: "y",
                order: "descending"
            }
        }
        let layout = {
            title: "Medal Count per Country"
        };
        Plotly.newPlot("bar", [barChart], layout);
    });
}
// initialize dashboard
function initialize(){
    //drop down selector
    var selectYear = d3.select("#selDataset");
    d3.json("/api/v1.0/years").then((data) => {
        let eventNames = data; //array of events
        //console.log(eventNames);
        //use a for each to create options
        eventNames.forEach((events) => {
            selectYear.append("option")
                .text(events)
                .property("value", events);
         });
         let firstSample = eventNames[0];
         console.log(firstSample);
         buildBarChart(firstSample);
​
        });    
    //drop down selector
    var selectAthlete = d3.select("#athletesDataset");
    d3.json("/api/v1.0/athlete/demographic").then((data1) => {
        let athleteName = data1; //array of name
        console.log(athleteName);
        //use a for each to create options
        athleteName.forEach((name) => {
            //console.log(name);
            selectAthlete.append("option")
                .text(name.name)
                .property("value", name.name);
         });
         let athleteSample = athleteName[0].name;
         console.log(athleteSample);
         
         buildMetaData(athleteSample)         
​
     });
}
// function that updates the dashboard
function optionChanged(item)
{
    // call the update to the metadata
    //buildMetaData(item);
    buildBarChart(item);
    //buildBubbleChart(item);
}
​
​
function athleteChanged()
{
    // d3.json("/api/v1.0/athlete/demographic").then((data) => {
        let dropdown = d3.select("#athletesDataset");
        let dataset = dropdown.property("value");
        console.log(dataset)
        buildMetaData(dataset);
    // }
}
​
initialize();
//d3.json('/api/v1.0/athlete').then(function (response){
//    console.log(response)
//})