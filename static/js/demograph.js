d3.selectAll("#athletesDataset").on("change", athleteChanged);
var select = document.getElementById("athletesDataset");

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
                

        };
        console.log(`result`,result)
        // clear the metadata out
        d3.select("#demographics").html("");
        // use Object.entries to get the value key pairs
        Object.entries(result).forEach(([key, value]) =>{
            d3.select("#demographics")
                .append("h4").text(`${key}: ${value}`);
        })
        
    });
}


function initialize(){ 
 
    //drop down selector
    var selectAthlete = d3.select("#athletesDataset");
    d3.json("/api/v1.0/athlete/demographic").then((data) => {
        let athleteName = data; //array of name
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
     });
}


function athleteChanged()
{
    // d3.json("/api/v1.0/athlete/demographic").then((data) => {
        let dropdown = d3.select("#athletesDataset");
        let dataset = dropdown.property("value");
        console.log(dataset)
        buildMetaData(dataset);
    // }
}
initialize();
//d3.json('/api/v1.0/athlete').then(function (response){
//    console.log(response)
//})
