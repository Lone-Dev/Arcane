const { color } = require('discord-bukket')
const { prefix } = require('../../config.json')

module.exports = {
    name: 'color',
    description: "Get an random color.",
    category: "🔰 Util",
    usage: `${prefix}color`,
    cooldown: 2,
    nsfw: false,
    async execute(message, args, client) {

        color(message)

    }
};