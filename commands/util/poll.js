const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "poll",
    description: "Make an poll.",
    category: "🔰 Util",
    usage: `${process.env.prefix}poll [channel] "<poll>"`,
    cooldown: 6,
    nsfw: false,

    async execute(message, args, client) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(``)

        const channel = message.guild.channels.cache.get(args[1]) ||
            message.mentions.channels.first() || message.channel

        if (channel) {
            if (!args[1])
                return message.channel.send(
                    `Please use it like this: \`${process.env.prefix}poll "Poll1" "Poll2".\``
                );
            const polls = args.slice(1).join(" ");

            const regex = polls.match(/"[^"]+"|[\\S]+"[^"]+/g);

            if (regex.length > 9) {
                return message.channel.send(`You can only have 9 poll options`);
            }

            let str = "";

            let emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

            let i = 0;

            for (const poll of regex) {
                str = str + `${emojis[i]} \`${poll}\`\n\n`;
                i++;
            }

            const embed = new MessageEmbed()
                .setDescription(str.replace(/"/g, ""))

            const msg = await channel.send(embed);

            for (let i = 0; i < regex.length; i++) {
                msg.react(emojis[i]);
            }
        } else {

            if (!args[2])
                return message.channel.send(
                    `Please use it like this: \`${process.env.prefix}poll "Poll1" "Poll2".\``
                );
            const polls = args.slice(2).join(" ");

            const regex = polls.match(/"[^"]+"|[\\S]+"[^"]+/g);

            if (regex.length > 9) {
                return message.channel.send(`You can only have 9 poll options`);
            }

            let str = "";

            let emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

            let i = 0;

            for (const poll of regex) {
                str = str + `${emojis[i]} \`${poll}\`\n\n`;
                i++;
            }

            const embed = new MessageEmbed()
                .setDescription(str.replace(/"/g, ""))

            const msg = await channel.send(embed);

            for (let i = 0; i < regex.length; i++) {
                msg.react(emojis[i]);
            }
        }
    },
};
