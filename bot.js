require('dotenv').config(); // To get the credentials

console.log("Beep Beep!");

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
    // console.log(msg);

    if (msg.content == "ping") {
        msg.reply('Pong!');
    }

    if (!msg.content.startsWith(conf.command.prefix)) { // If no command entered, stop the analysis
        return
    }
    let user = msg.author.id;
    console.log(user);

    switch(true) {
        case msg.content.startsWith(conf.command.prefix + "help"):
            msg.reply(conf.help);
            break;
        case msg.content.startsWith(conf.command.prefix + conf.command.startS): // Start s
            msg.reply(conf.phrase.startS); // reply user on discord
            let type = msg.content.substr(3);
            startS(user, type); // Store data on DB
            break;
            case msg.content.startsWith(conf.command.prefix + conf.command.endS): // End s
            msg.reply(conf.phrase.endS); // reply user on discord
            stopS(user); // Store data on DB
            break;
        case msg.content.startsWith(conf.command.prefix + "t") && user == conf.author: // for testing
            msg.reply("debug command detected");
            if (/getData/.test(msg.content)){
                // getData(db);
                db.each("SELECT * FROM data;", function(err, row){
                    console.log(row.user + ": " + row.time);
                })
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

function startS(user, extra){
    let dataExtra = {type: "start"};
    try {
        if (extra.length != 0){
            extra = JSON.parse(extra);
            dataExtra.asig = extra;
        }

        add2DB(user, dataExtra);
    } catch (error) {
        console.log("*****\tERROR at startS\t*****\n" + error);
    }
}
function stopS(user){
    add2DB(user, {type: "end"});
}
function add2DB(user, dataExtra) {
    db.run("INSERT INTO data (time, user, extra) VALUES (CURRENT_TIMESTAMP, " + user + ", " + dataExtra + ")");
}