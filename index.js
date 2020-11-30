require('dotenv').config();

//Import npms
const Discord = require('discord.js');
const glob = require('glob');

//Important things
const client = new Discord.Client();
client.color = '41afac'
client.prefix = ';'
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.login(process.env.token);

//Istalling command and event handler
const cmdFiles = glob.sync('./commands/**/*.js');
for (const file of cmdFiles) {
    const command = require(file);
    client.commands.set(command.name, command)
};

const eventFiles = glob.sync("./events/**/*.js");
for (const file of eventFiles) {
    const event = require(file);
    const eventName = /\/events.(.*).js/.exec(file)[1];
    client.on(eventName, event.bind(null, client));
}