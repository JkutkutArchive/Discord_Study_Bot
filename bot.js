require('dotenv').config(); // To get the credentials

console.log("Beep Beep!");

const Discord = require('discord.js');
const client = new Discord.Client();
const guild = new Discord.Guild(client);

client.login(process.env.APY_KEY);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Roles
    // Check if roles were already created
    // console.log(guild.roles.cache);
    // guild.roles.create({
    //     data: {
    //             name: 'Muted',
    //             color: 'BLUE',
    //         },
    //     reason: 'people with this role can not talk'
    // });
    // console.log(guild.roles.fletch('Muted'));
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
    else if (msg.content === 'join') {
        msg.member.voice.channel.join();
    }
    else if (msg.content === 'bye') {
        msg.member.voice.channel.leave();
    }

    else if (msg.content === 'm') {
        msg.member.voice.setMute(true);
        console.log("toggled");
    }


    // Your invokation here, for example your switch/case hook for some command (i.e. '!muteall')
    // Check if user is in a voice channel:
    if (msg.content === 'silence'){
        if (msg.member.voice.channel) {
            let channel = msg.guild.channels.cache.get(msg.member.voice.channel.id);
            for (const [memberID, member] of channel.members) {
                // I added the following if statement to mute everyone but the invoker:
                // if (member != message.member)
            
                // This single line however, nested inside the for loop, should mute everyone in the channel:
                member.voice.setMute(true);
                // console.log(member.voice);
            }
        } else {
            msg.reply('You need to join a voice channel first!');
        }
    }
});
