// matches.csv  and deliveries.csv  file
let iplData = require("../data/matches.json");
let deliveries = require("../data/deliveries.json");
let fs = require('fs');
// 1. Luckiest team
let luckyTeams = (iplDataSet)=> {

let lucky = {}
//to get the toss wins for each team
for(let key in iplDataSet)
{
    if(lucky.hasOwnProperty(iplDataSet[key]['toss_winner']))
        lucky[iplDataSet[key]['toss_winner']] += 1;
    else lucky[iplDataSet[key]['toss_winner']] = 1;
}
// sort them in descending order and result is an Array 
var sortedLucky = [];
for (var wins in lucky) {
    sortedLucky.push([wins, lucky[wins]]);
}
sortedLucky.sort(function(a, b) {
    return b[1] - a[1];
});

let luckyDescending = {}
// Convert the sorted array into object
for(let key in sortedLucky)
    luckyDescending[sortedLucky[key][0]] = sortedLucky[key][1];
return luckyDescending;
};
// 2. Strike rate of batsman
let BatsmanStrikeRate = (deliveries, top) =>{

let strike = {}
for(let key in deliveries)
{  
    if(!strike.hasOwnProperty(deliveries[key]['batsman']))
        strike[deliveries[key]['batsman']] = [parseInt(deliveries[key]['batsman_runs'], 10), 1];
    else strike[deliveries[key]['batsman']] = [(strike[deliveries[key]['batsman']][0] + parseInt(deliveries[key]['batsman_runs'])), (strike[deliveries[key]['batsman']][1]+1)];
}
let strikeRate = {};
for(let key in strike)
    strikeRate[key] = ((strike[key][0]/strike[key][1])*100).toFixed(2);

    //console.log(strikeRate)
var sortedStrike = [];
for (var runs in strikeRate) {
    sortedStrike.push([runs, strikeRate[runs]]);
}
sortedStrike.sort(function(a, b) {
    return b[1] - a[1];
});

sortedStrike = sortedStrike.splice(0,top)
let StrikeDescending = {}
// Convert the sorted array into object
for(let key in sortedStrike)
    StrikeDescending[sortedStrike[key][0]] = sortedStrike[key][1];

return StrikeDescending;
};
// 3. performance of bowlers in the death overs(last 4 overs)
let BestDeathBowler = (deliveries) =>{

let deathBowl = {};
for(let key in deliveries)
{
    if(Number(deliveries[key]['over']) >= 17)
    {
        if(deathBowl.hasOwnProperty(deliveries[key]['bowler']))
            deathBowl[deliveries[key]['bowler']] += Number(deliveries[key]['total_runs'])
        else deathBowl[deliveries[key]['bowler']] = Number(deliveries[key]['total_runs'])
    }
}

let sorted = [];
for (var player in deathBowl) {
    sorted.push([player, deathBowl[player]]);
}
sorted.sort(function(a, b) {
    return a[1] - b[1];
});

sorted = sorted.splice(0, 10)
let result = {}

for(let key in sorted)
    result[sorted[key][0]] = sorted[key][1];


return result;
};
// 4. runs scored by teams in power play (first 6 overs) in final matches in all seasons
let mostRunsPP = (matches, deliveries) =>{
let finalId = {};

// gets match_ids of final matches -- the last matches in that season
for(let key in matches)
        finalId[matches[key]['season']] =  matches[key]['id'];
// since we need only ids reassign 'finalId' variable to an array that has only 
finalId = Object.values(finalId);

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
return result

};


// fs.writeFileSync("json/luckyTeams.json", JSON.stringify(luckyTeams(iplData)))
// fs.writeFileSync("json/strikeRate.json", JSON.stringify(BatsmanStrikeRate(deliveries, 10)))
// fs.writeFileSync("json/BestDeathBowler.json", JSON.stringify(BestDeathBowler(deliveries)))
// fs.writeFileSync("json/mostRunsPP.json", JSON.stringify(mostRunsPP(iplData, deliveries)))

// console.log(luckyTeams(iplData));
// console.log(BatsmanStrikeRate(deliveries, 10));
// console.log(BestDeathBowler(deliveries));
// console.log(mostRunsPP(iplData, deliveries));