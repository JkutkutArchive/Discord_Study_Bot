require('dotenv').config(); // To get the credentials

console.log("Beep Beep!");

const Discord = require('discord.js');
// const { Database } = require('sqlite3');
const client = new Discord.Client();
const guild = new Discord.Guild(client);
var sqlite3 = require('sqlite3').verbose(); // Database
var db = new sqlite3.Database(process.env.DB_LOCATION); //(':memory:');

client.login(process.env.APY_KEY);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(msg.content);
    switch(true) {
        case "ping" == msg.content:
            msg.reply('Pong!');
            break;
        case /\/help/.test(msg.content):
            msg.reply("Ayuda:\n\t\t\t**/s**: empezar estudiar. \n\t\t\t**/ds**: dejar estudiar.");
            break;
        case /\/s/.test(msg.content):
            msg.reply("Now you are studing");
            break;
        case /\/ds/.test(msg.content):
            msg.reply("You've stop studing");
            break;
        case /\/t/.test(msg.content):
            msg.reply("debug command detected");
            if (/getData/.test(msg.content)){
                // getData(db);
                db.each("SELECT * FROM data;", function(err, row){
                    console.log(row.user + ": " + row.time);
                })
            }
            else if (/exe/.test(msg.content)) {
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
    db.run("INSERT INTO data (time, user, extra) VALUES (CURRENT_TIMESTAMP, 'System', 'start');");
    console.log("DataBase started");
});

function prueba(){
    console.log("msg prueba");
}