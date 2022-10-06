// load new medal total over time chart for selected country
function countryOptionChange(country)
{
    url = '/api/v1.0/country/total_medals_years/' + country
    d3.json(url).then((data) => {
        // grab all of the sample data then create arrays of years and medals here
        let sampleData = data;
        countryName = sampleData[0].country
        //console.log(`APICALL`,sampleData);
        let years = [];
        let medals = [];
        for(var i = 0; i < sampleData.length; i++)
        {
            //console.log(sampleData[i].total_medals)
            medals.push(sampleData[i].total_medals)
            years.push(sampleData[i].year)
        }
        Highcharts.chart('container', {

            title: {
                text: 'Total Medals Won'
            },
        
            subtitle: {
                text: ''
            },
        
            yAxis: {
                title: {
                    text: 'Number Of Medals'
                }
            },
        
            xAxis: {
                
                categories: years,
        
                accessibility: {
                    rangeDescription: 'Range: 1896 to 2016'
                }
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    // pointStart: 1896
                }
            },
        
            series: [{
                name: countryName,
                data: medals
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
     });

}
url = '/api/v1.0/country/total_medals_years/' + 'Virgin Islands'
    d3.json(url).then((data) => {
        // create arrays of years and medals here
        console.log("COUNTRY TOTAL DATA")
        
        // grab all of the sample data
        let sampleData = data;
        countryName = sampleData[0].country
        //console.log(`APICALL`,sampleData);
        let years = [];
        let medals = [];
        for(var i = 0; i < sampleData.length; i++)
        {
            //console.log(sampleData[i].total_medals)
            medals.push(sampleData[i].total_medals)
            years.push(sampleData[i].year)
        }
        Highcharts.chart('container', {

            title: {
                text: 'Total Medals Won'
            },
        
            subtitle: {
                text: ''
            },
        
            yAxis: {
                title: {
                    text: 'Number Of Medals'
                }
            },
        
            xAxis: {
                
                categories: years,
        
                accessibility: {
                    rangeDescription: 'Range: 1896 to 2016'
                }
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    // pointStart: 1896
                }
            },
        
            series: [{
                name: countryName,
                data: medals
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
     });





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
    var select = d3.select("#selDataset");
    d3.json("/api/v1.0/years").then((data) => {
        let eventNames = data; //array of events
        //console.log(eventNames);
        //use a for each to create options
        eventNames.forEach((events) => {
            select.append("option")
                .text(events)
                .property("value", events);
         });
         let firstSample = eventNames[0];
         console.log(firstSample);
         buildBarChart(firstSample);
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
initialize();
//d3.json('/api/v1.0/athlete').then(function (response){
//    console.log(response)
//})