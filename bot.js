require('dotenv').config(); // To get the credentials

console.log("Starting Bot...");

const Discord = require('discord.js');
const client = new Discord.Client();
const guild = new Discord.Guild(client);

const conf = require('./bot-config.json'); //Configuration file

var sqlite3 = require('sqlite3').verbose(); // Database
var db = new sqlite3.Database(process.env.DB_LOCATION); //(':memory:');

client.login(process.env.APY_KEY);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    
    if (msg.content == "ping") {
        msg.reply('Pong!');
    }

    if (!msg.content.startsWith(conf.command.prefix)) { // If no command entered, stop the analysis
        return
    }
    let user = msg.author;
    // console.log(user);

    switch(true) {
        case msg.content.startsWith(conf.command.prefix + "help"):
            msg.reply(conf.help);
            break;
        case msg.content.startsWith(conf.command.prefix + conf.command.startS): // Start s
            let type = msg.content.substr(conf.command.prefix.length + conf.command.startS.length + 1); // If special subject selected, it will go here
            startS(user.id, type); // Store data on DB
            msg.reply(conf.phrase.startS + " " + type); // reply user on discord
            break;
        case msg.content.startsWith(conf.command.prefix + conf.command.endS): // End s
            stopS(user.id); // Store data on DB
            msg.reply(conf.phrase.endS); // reply user on discord
            break;
        case msg.content.startsWith(conf.command.prefix + "getData"):
            let extra = msg.content.substr(conf.command.prefix.length + "getData".length + 1).split(" ");
            let modifiers = {unit: /m/, asig: /.*/};

            if (extra.length == 1 && extra[0] != "") { // Special parameters
                modifiers.unit = RegExp(extra[0]);
            }
            else { //Asig given
                modifiers.unit = RegExp(extra[0]);
                extra.shift();
                modifiers.asig = RegExp(extra.join(" "));
            }

            // console.log("\n\n\n" + user.id);
            // console.log(modifiers);

            break;

        // Testing
        case msg.content.startsWith(conf.command.prefix + "t") && user == conf.author: // for testing
            msg.reply("debug command detected");
            if (/getData/.test(msg.content)){
                // getData(db);
                db.each("SELECT * FROM data;", function(err, row){
                    if (err) {
                        console.log(err);
                    }
                    else{
                        console.log(row.user + ": " + row.time);
                    }
                });
            }
            if (/exe/.test(msg.content)) {
                msg.reply("Executing command, see terminal");
                try {
                    eval(msg.content.substr(7));
                } catch (error) {
                    console.log(error)
                }
            }
            break;
    }
});

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS data (time BLOB PRIMARY KEY, user TEXT, extra BLOB);");
    db.run("INSERT INTO data (time, user, extra) VALUES (CURRENT_TIMESTAMP, 'System', 'start');"); //Log on DB that nodejs is on
    console.log("DataBase started");
});

/* SETTERS */
function startS(user, extra = null){
    let dataExtra = {type: "start", asig: ""};
    try {
        if (extra != null){
            dataExtra.asig = extra;
        }

        add2DB(user, JSON.stringify(dataExtra));
    } catch (error) {
        console.log("*****\tERROR at startS\t*****\n" + error);
    }
}
function stopS(user){
    add2DB(user, {type: "end"});
}
function add2DB(user, dataExtra) {
    db.run("INSERT INTO data (time, user, extra) VALUES (CURRENT_TIMESTAMP, '" + user + "', '" + dataExtra + "')", (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("data stored correctly");
        } 
    });
}

function getTotalTime(user, data, asig, unit) {
    // console.log(user);
    user.send(data);
}


async function getTimeData(user, asig=/.*/, unit=/m/) {
    db.all("SELECT * FROM data;", (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        getTotalTime(user, rows, unit, asig);
    });
}



// End code:
process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    console.log("\n**** Bot closing: ****");
    console.log(options);
    console.log(exitCode);
    db.run("INSERT INTO data (time, user, extra) VALUES (CURRENT_TIMESTAMP, 'System', 'end');", (result, err) => {process.exit()});
}

//do something when app is closing
// process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));