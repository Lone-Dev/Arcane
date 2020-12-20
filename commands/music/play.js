const ytdl = require('ytdl-core');

module.exports = {
    name: "play",
    description: "Play music",
    category: "🎵 Music",
    usage: `${process.env.prefix}play <url>`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client, ops) {

        if (!message.member.voice.channel) return message.channel.send(`Join a voice channel.`);
        if (message.guild.me.voice.channel) return message.channel.send(`Im already connected to an channel.`);

        if (!args[1]) return message.chanenl.send(`Enter a name or url.`);

        var validate = await ytdl.validateURL(args[1]);
        if (!validate) return message.channel.send(`Invalid url.`);

        var info = await ytdl.getInfo(args[1]);

        var options = { seek: 2, volume: 1 };

        var channelJoin = message.member.voice.channel.join().then((voiceChannel) => {

            const stream = ytdl(args[1], { filter: 'audioonly' });

            var dispatcher = voiceChannel.play(stream, options);

        }).catch(err => console.log(err))

        message.channel.send(`Playing **${info.title}**`)
    }
}