require('dotenv').config(); // To get the credentials

var sqlite3 = require('sqlite3').verbose(); // Database
var db = new sqlite3.Database(process.env.DB_LOCATION); //(':memory:');

user = "*";
getTimeData(user);

console.log(`SELECT * FROM data WHERE 'user' = '${user}' OR 'user' = 'System'`)

function getTotalTime(user, data, unit, asig) {
    for (let r of data) {
        console.log(r);
    }
}


async function getTimeData(user, asig=/.*/, unit=/m/) {
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