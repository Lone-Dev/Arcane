const { stats } = require('discord-bukket')

module.exports = {
    name: "stats",
    description: "View the stats of the bot.",
    category: "🔰 Util",
    usage: `stats`,
    cooldown: 2,
    nsfw: false,
    async execute(message, args, client) {

        stats(client, message)

    }
};