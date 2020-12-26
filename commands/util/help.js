const { MessageEmbed } = require('discord.js')
const { removeDuplicates } = require('../../database/functions')

module.exports = {
    name: "help",
    aliases: ['h'],
    description: "Let you see this",
    category: "🔰 Util",
    usage: `${process.env.prefix}help [command]`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client) {

        const embed = new MessageEmbed() // Making the embed
            .setColor('BLUE');

        const command = client.commands.get(args[1]); // Making command arging

        var _aliases = '\`No Aliases.\`'

        if (args[1] && command) { // If the command exist
            embed.setAuthor(`${command.name}`, client.user.displayAvatarURL());
            embed.setThumbnail(client.user.displayAvatarURL())
            embed.setFooter('<> is strict | [] is optional');
            if (command.aliases) _aliases = command.aliases.map(alias => `\`${alias}\``).join(' ')

            embed.setDescription(`
            **❯ Aliases:** ${_aliases}
            **❯ Description:** \`${command.description || "No Description."}\`
            **❯ Category:** \`${command.category}\`
            **❯ Usage:** \`${command.usage || 'No Usage Info.'}\`
            **❯ Cooldown:** \`${`${command.cooldown} second(s)` || "No Cooldown."}\`
            **❯ NSFW:** \`${command.nsfw}\``)
        } else {
            const categories = removeDuplicates(client.commands.map(c => c.category));
            embed.setDescription(`For additional info on a command, use ${client.user} or \`${process.env.prefix}\` <command>`);
            embed.setFooter('<> is strict | [] is optional');
            embed.setThumbnail(client.user.displayAvatarURL())

            for (const category of categories) {
                embed.addField(`❯  ${category}`, client.commands.filter(c => c.category === category).map(c => `\`${c.name}\``).join(' '));
            }
        }

        message.channel.send({ embed: embed }); // Send the embed.

    }
};