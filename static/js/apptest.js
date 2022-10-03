
// initialize dashboard 
function initialize()
{
    //drop down selector 
    var select = d3.select("#selDataset"); 

    d3.json("/api/v1.0/athlete").then((data) => {
        let eventNames = data.games //array of events 
        console.log(eventNames);
       
        //use a for each to create options 
        eventNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                //.property("value", sample);

         });
     }); 
}

initialize();


// update dashboard 

// function populatets meta-data 

// build the graph 



