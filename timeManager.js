require('dotenv').config(); // To get the credentials

var sqlite3 = require('sqlite3').verbose(); // Database
var db = new sqlite3.Database("./DB/dataBase2.db"); //(':memory:');
// var db = new sqlite3.Database(process.env.DB_LOCATION); //(':memory:');

user = "*";
// user = "695589173914239057";
getTotalTime(user, debugData(), null, null);



function getTotalTime(user, data, unit, asig) {
    for (let r of data) {
        if (r.user == "System"){ // Keep track of the system status
            console.log("*** System detected ***");
            if (r.extra == "start"){
                console.log("\tstarted");
            }
            else{
                console.log("\tended");
            }
        }
        else if (user == "*" || r.user == user){ // If this is the user we want
            console.log(r);
            
            let extra;
            try {
                extra = JSON.parse(r.extra);
            } catch (error) {
                extra = {};
            }

            if (extra.type == "start") {
                console.log("\t\t" + r.user + " started");
            }
            else if(extra.type == "end"){
                console.log("\t\t" + r.user + " ended");
            }
        }
    }
}

/**
 * Gets the data from the database about the NodejsApp and the user selected.
 * @param {string} user - A string with the id of the user we want. If "*" given as the id, all users are selected.
 * @param {*} asig - topic of the study
 * @param {*} unit
 * @param {*} process
 */
async function getTimeData(user, asig=/.*/, unit=/m/, process) {
    let query = `SELECT * FROM data WHERE user = '${user}' OR user = 'System';`;
    if (user == "*") { // If we want all the players
        query = "SELECT * FROM data";
    }

    db.all(query, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        getTotalTime(user, rows, unit, asig);
    });
}






function debugData(){
    return [
        {
            time: '2020-12-15 00:00:00',
            user: 'System',
            extra: 'start'
        },
        {
            time: '2020-12-15 00:00:00',
            user: '695589173914239057',
            extra: '{"type": "start", "asig": ""}'
        },
        {
            time: '2020-12-15 00:25:00',
            user: '695589173914239057',
            extra: '{"type": "end"}'
        },












        {
            time: '2021-1-1 00:00:00',
            user: 'System',
            extra: 'end'
        },
    ];
}