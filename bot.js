require('dotenv').config(); // To get the credentials

console.log("Beep Beep!");

const Discord = require('discord.js');
const client = new Discord.Client();
const guild = new Discord.Guild(client);

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
    }
});
