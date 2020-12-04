const { calculator } = require('discord-bukket')

module.exports = {
    name: "calc",
    description: "You can calculate something.",
    category: "🔰 Util",
    usage: `;calc <num1> <sum> <num2>`,
    cooldown: 2,
    nsfw: false,
    async execute(message, args, client) {

        num1 = args[1], sum = args[2], num2 = args[3]

        result = calculator(num1, sum, num2)

        message.channel.send(result)

    }
};