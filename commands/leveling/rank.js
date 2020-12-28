const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const db = require("quick.db")
module.exports = {
    name: "rank",
    description: "See your or someone else its rank",
    category: "📊 Leveling",
    usage: `[member]"`,
    cooldown: 6,
    nsfw: false,

    async execute(message, args, client) {

        var user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        var level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 0
        level = level.toString()
        let xp = db.get(`guild_${message.guild.id}_xp_${user.id}`) || 0
        let xpneeded = level * 500 + 500

        var every = db
            .all()
            .filter(i => i.ID.startsWith(db.get(`guild_${message.guild.id}_xptotal_`)))
            .sort((a, b) => b.data - a.data);
        var rank = await every.map(x => x.ID).indexOf(`guild_${message.guild.id}_xptotal_${user.id}`) + 1
        rank = rank.toString()

        console.log(rank)

        // v5 rank card
        const card = new canvacord.Rank()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setRank(parseInt(rank))
            .setRankColor("#00ccff")
            .setProgressBar("#00ccff")
            .setProgressBarTrack("#000000")
            .setLevel(parseInt(level))

            .setLevelColor("#00ccff")

            .setCurrentXP(parseInt(xp))
            .setBackground("IMAGE", `https://cdn.discordapp.com/attachments/776415082904813588/780454871915823104/rank4.png`)
            .setRequiredXP(parseInt(xpneeded))
            .setStatus(user.presence.status)
            .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }));

        const img = await card.build();

        return message.channel.send(new MessageAttachment(img, "rank.png"));


    },
};
