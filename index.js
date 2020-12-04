require('dotenv').config();

//Import npms
const Discord = require('discord.js');
const glob = require('glob');
const Canvas = require('canvas')

const welcomeMessage = require('./database/models/welcomeMessage');

//Important things
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] });
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

// client.on('guildMemberAdd', async (member) => {

//     const defaultBackgroundColor = '#2b2929';
//     const defaultTextColor = '#FFFFFF';

//     welcomeMessage.findOne({ guildID: member.guild.id }, async (err, data432) => {

//         const channel = client.channels.cache.get('771449456797155368')

//         const canvas = Canvas.createCanvas(750, 300);
//         const ctx = canvas.getContext("2d");

//         const background = await Canvas.loadImage('./database/assets/img/welcomeCard.png');
//         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

//         const t = 5; // * X Offset of profile picture
//         const i = 180; // * Profile Picture Size
//         const v = 30; // * Margin between text and pfp/side of image
//         const z = 10; // * Space between server name and username
//         const x = 250; // * width of pfp area
//         const w = canvas.width;
//         const y = x + v;
//         const p = w - y;

//         const textWidth = p - 50;
//         const o = 40; // * Base font size for server name
//         const u = 100; // * Base font size for member name
//         const c = `Welcome to ${member.guild.name},`;
//         const d = `${member.user.username}!`;
//         const a = applyText(canvas, c, 'Poppins Regular', o, textWidth);
//         const b = applyText(canvas, d, 'Poppins Thin', u, textWidth);
//         const e = canvas.height;
//         const f = (e - a.size + b.size) / 2;
//         const g = e - f + b.size + z + 12;
//         const h = e - f - z / 2;
//         console.log(g)

//         ctx.textAlign = 'center';

//         ctx.font = a.font;
//         ctx.fillStyle = defaultTextColor;
//         ctx.fillText(c, y + textWidth / 2, h);

//         // Add an exclamation point here and below
//         ctx.font = b.font;
//         ctx.fillStyle = defaultTextColor;
//         ctx.fillText(d, y + textWidth / 2, g);
//         const width = 750; // * width of card
//         const height = 300; // * height of card
//         const j = canvas.height;
//         const k = (j - i) / 2;
//         const l = x - 20;
//         const m = (l - i) / 2;
//         const n = m - t;

//         const q = l / 2 - t;
//         const r = j / 2;
//         const s = i / 2;

//         ctx.fillStyle = defaultBackgroundColor;
//         ctx.strokeStyle = defaultBackgroundColor;

//         ctx.shadowOffsetX = 0;
//         ctx.shadowOffsetX = 0;

//         ctx.shadowColor = '#000';
//         ctx.shadowBlur = 8;

//         ctx.beginPath();
//         ctx.arc(q, r, s, 0, Math.PI * 2, true);
//         ctx.closePath();
//         ctx.fill();

//         ctx.shadowBlur = 0;

//         ctx.beginPath();
//         ctx.arc(q, r, s, 0, Math.PI * 2, true);
//         ctx.closePath();
//         ctx.clip();




//         const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png', size: 512 }));
//         ctx.drawImage(avatar, n, k, i, i);

//         const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png');

//         const embed = new Discord.MessageEmbed()
//             .setAuthor(member.user.tag, member.user.displayAvatarURL())
//             .setDescription(`:wave: Welcome ${member} to **${member.guild.name}**!`)
//             .attachFiles([attachment])
//             .setImage("attachment://welcome.png")
//             .setColor(client.color)

//         channel.send(embed)
//     })
// })

// function applyText(canvas, text, font, fontSize, width) {

//     const ctx = canvas.getContext('2d');

//     // Declare a base size of the font
//     let x = fontSize;

//     do {
//         // Assign the font to the context and decrement it so it can be measured again
//         ctx.font = `${(x -= 1)}pt "${font}"`;
//         // Compare pixel width of the text to the canvas minus the approximate avatar size
//     } while (ctx.measureText(text).width > width);

//     // Return the result to use in the actual canvas
//     return {
//         font: ctx.font,
//         size: x
//     };

// }