const play = require('../commands/music/play');

module.exports = (client) = {

    constructor(client) {
        this.client = client;
    },

    getMentions() {
        const client = this.client;

        return {
            member(mention, guild) {
                if (!mention) return;
                const matches = mention.match(/<@!?(\d{17,19})>/);
                const memberID = matches ? matches[1] : mention;
                return guild.members.cache.get(memberID);
            },
            async user(mention) {
                if (!mention) return;
                const matches = mention.match(/<@!?(\d{17,19})>/);
                const userID = matches ? matches[1] : mention;
                return await client.users.fetch(userID).catch(() => null);
            },
            channel(mention, guild) {
                if (!mention) return;
                const matches = mention.match(/<#(\d{17,19})>/);
                const channelID = matches ? matches[1] : mention;
                return guild.channels.cache.get(channelID);
            },
            role(mention, guild) {
                if (!mention) return;
                const matches = mention.match(/<@&(\d{17,19})>/);
                const roleID = matches ? matches[1] : mention;
                return guild.roles.cache.get(roleID);
            },
        };
    },

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    trimArray(arr, number) {
        if (arr.length > number) {
            const len = arr.length - number;
            arr = arr.slice(0, number);
            arr.push(`${len} more...`);
        }

        return arr;
    },

    removeDuplicates(arr) {
        return [...new Set(arr)];
    },

    get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`;
    },

    async xp(message) {
        if (!message.guild) return
        if (message.author.bot) return
        const db = require('quick.db')
        const { prefix } = require('../events/message')
        if (message.content.startsWith(prefix)) return
        const randomNumber = Math.floor(Math.random() * 10) + 15
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
        db.add(`guild_${message.guild.id}_xptotal_${message.guild.id}`, randomNumber)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500
        if (xpNeeded < xp) {
            var newLevel = await db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            message.channel.send(`${message.author}, You have leveled up to level **${newLevel}**`)
        }
    },
}