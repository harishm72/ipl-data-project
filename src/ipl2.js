var deliveries = require("../data/deliveries.json");

let strike = {}
for(let key in deliveries)
{  
    if(!strike.hasOwnProperty(deliveries[key]['batsman']))
        strike[deliveries[key]['batsman']] = [parseInt(deliveries[key]['batsman_runs'], 10), 1];
    else strike[deliveries[key]['batsman']] = [(strike[deliveries[key]['batsman']][0] + parseInt(deliveries[key]['batsman_runs'])), (strike[deliveries[key]['batsman']][1]+1)];

}

let strikeRate = {};
for(let key in strike)
    strikeRate[key] = ((strike[key][0]/strike[key][1])*100);

    //console.log(strikeRate)
var sortedStrike = [];
for (var runs in strikeRate) {
    sortedStrike.push([runs, strikeRate[runs]]);
}
sortedStrike.sort(function(a, b) {
    return b[1] - a[1];
});

sortedStrike = sortedStrike.splice(0,30)
let StrikeDescending = {}
// Convert the sorted array into object
for(let key in sortedStrike)
    StrikeDescending[sortedStrike[key][0]] = sortedStrike[key][1];

//    console.log(strike);
 console.log(StrikeDescending);
