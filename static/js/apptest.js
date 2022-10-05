
d3.json('/api/v1.0/athlete/demographic').then(function (response){
    //console.log(response)
})

// initialize dashboard
function initialize(){
    //drop down selector
    var select = d3.select("#athletesDataset");
    d3.json("/api/v1.0/athlete/demographic").then((data) => {
        let athleteName = data; //array of name
        //console.log(athleteName);
        //use a for each to create options
        athleteName.forEach((name) => {
            console.log(name);
            select.append("option")
                .text(name.name)
                .property("value", name.name);
         });
         let firstSample = athleteName[0];
         //console.log(firstSample);
   });
}



initialize();
