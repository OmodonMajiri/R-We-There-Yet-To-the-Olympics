
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
     });
}
initialize();


// update dashboard 

// function populatets meta-data 

// build the graph 



