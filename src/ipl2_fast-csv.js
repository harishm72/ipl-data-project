var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream("/home/harish7/Desktop/dataProject-harish/data/deliveries.csv")                   

let strike = {};
let balls = {};
 csv
 .fromStream(stream,{headers:true})
    .on("data", function(deliveries){
        if(!strike.hasOwnProperty(deliveries['batsman']))
         strike[deliveries['batsman']] = [parseInt(deliveries['batsman_runs'], 10) , 1];
     else strike[deliveries['batsman']] = [parseInt(deliveries['batsman_runs'], 10) + parseInt(strike[deliveries['batsman']][0], 10) , (parseInt(strike[deliveries['batsman']][1], 10) + 1)];
    })
    .on("end", function(){
        console.log(calculateStrikeRate(strike));
    });

// stream.pipe(csvStream);
function calculateStrikeRate(obj){

    let res = {};
    for(let key in obj)
    {
        res[key] = Math.round((obj[key][0]/obj[key][1])*100);
    }
    return res;
}