const { color } = require('discord-bukket')

module.exports = {
    name: 'color',
    description: "Get an random color.",
    category: "🔰 Util",
    usage: `;color`,
    cooldown: 2,
    nsfw: false,
    async execute(message, args, client) {

        color(message)

    }
};