

//initialize demographics dashboard "athletesDataset"
function initialize(){
    //drop down selector
    var select = d3.select("#athletesDataset");
    d3.json("/api/v1.0/athlete/<sex>/demographic/<year>").then((data) => {
        let athleteName = data; //array of events
        //console.log(eventNames);
        //use a for each to create options
        athleteName.forEach((name) => {
            select.append("option")
                .text(name)
                .property("value", name);
         });
         let firstSample = athleteName[0];
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
     });
}
initialize();


// update dashboard 

// function populatets meta-data 

// build the graph 



