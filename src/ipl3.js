let matches = require("../data/matches.json");
let deliveries = require("../data/deliveries.json");

let finalId = {};

// gets match_ids of final matches -- the last matches in that season
for(let key in matches)
     finalId[matches[key]['season']] =  matches[key]['id'];
// since we need only ids reassign 'finalId' variable to an array that has only 
finalId = Object.values(finalId);
console.log(finalId)

let mostRuns = {};
for(let key in deliveries)
{
    if(finalId.includes(Number(deliveries[key]['match_id'])))
    {
        if(Number(deliveries[key]['over']) <= 6)
        {
            if(mostRuns.hasOwnProperty(deliveries[key]['batting_team']))
                mostRuns[deliveries[key]['batting_team']] += Number(deliveries[key]['total_runs']);
            else mostRuns[deliveries[key]['batting_team']] = Number(deliveries[key]['total_runs'])
            }
    }
}

let sorted = [];
for (var team in mostRuns) {
    sorted.push([team, mostRuns[team]]);
}
sorted.sort(function(a, b) {
    return b[1] - a[1];
});

let result = {}
for(let key in sorted)
    result[sorted[key][0]] = sorted[key][1];
return result;
console.log(mostRuns)