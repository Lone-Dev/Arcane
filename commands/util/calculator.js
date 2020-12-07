const { calculator } = require('discord-bukket')

module.exports = {
    name: "calc",
    description: "You can calculate something.",
    category: "🔰 Util",
    usage: `;calc <num1> <sum> <num2>`,
    cooldown: 2,
    nsfw: false,
    async execute(message, args, client) {

        result = calculator(args[1], args[2], args[3])

        message.channel.send(result)

    }
};