const discord = require("discord.js");
const blacklistUserModel = require('../database/models/blacklistUser')
const blacklistGuildModel = require('../database/models/blacklistGuild')
const guildPrefixFind = require('../database/models/guildPrefix')

module.exports = async (client, message) => {

    let prefixs = process.env.prefix

    let blacklistedUser = await blacklistUserModel.findOne({ userID: message.author.id })
    if (blacklistedUser) return
    let blacklistedGuild = await blacklistGuildModel.findOne({ guildID: message.guild.id })
    if (blacklistedGuild) return
    let guildPrefix = await guildPrefixFind.findOne({ guildID: message.guild.id })
    if (guildPrefix) prefixs = guildPrefix.prefix


    const mentionRegex = RegExp(`^<@!${client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!${client.user.id}> `);

    const prefix = message.content.match(mentionRegexPrefix) ?
        message.content.match(mentionRegexPrefix)[0] : prefixs;

    if (message.content.match(mentionRegex)) message.channel.send(`My prefix is \`${prefix}\` and ${client.user}.`);

    if (message.author.bot) return;

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(' ');

    const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()));

    if (!command) return

    // cooldown
    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new discord.Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(
                `❌  ${message.author}, please wait \`${timeLeft.toFixed(
                    1
                )}\` more second ${timeLeft == 1 ? "s" : ""} before reusing the \`${command.name
                }\` command.`
            );
        }
    }

    if (client.commands.find((cmd) => cmd.nsfw === true && !message.channel.nsfw)) {
        return message.channel.send(`This command can only be used in a nsfw channel.`)
    }

    // init cooldown
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    command.execute(message, args, client)
} 