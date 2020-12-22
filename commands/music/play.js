const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: "play",
    description: "Play music",
    category: "🎵 Music",
    usage: `${process.env.prefix}play <url>`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client, options) {

        if (!message.member.voice.channel) return message.channel.send(`Join a voice channel.`);

        const validate = await ytdl.validateURL(args[1]);
        if (!validate) return message.channel.send(`Invalid url.`);

        const info = await ytdl.getInfo(args[1]);

        const data = options.active.get(message.guild.id) || {};

        if (!data.connection) data.connection = await message.member.voice.channel.join();

        if (!data.queue) data.queue = [];

        data.guildID = message.guild.id;



        data.queue.push({

            title: info.videoDetails.title,
            songDuration: info.videoDetails.lengthSeconds,
            requester: message.author.username,
            url: args[1],
            _videoURL: info.videoDetails.video_url,
            channel: message.channel.id,
            thumbnail: info.videoDetails.thumbnails[3].url,
            authorName: info.videoDetails.author.name,

        })

        if (!data.dispatcher) {
            Play(client, options, data, message)
        } else {

            message.delete()
            message.channel.send(new MessageEmbed()
                .setAuthor(`Added to queue`, message.author.displayAvatarURL(), info.videoDetails.author.external_channel_url)
                .setTitle(info.videoDetails.title)
                .addField(`Channel`, info.videoDetails.author.name, true)
                .addField(`Song Duration`, info.videoDetails.lengthSeconds, true)
                .addField(`Requested By`, message.author.username, true)
                .setThumbnail(info.videoDetails.thumbnails[3].url)
                .setURL(info.videoDetails.video_url)
            )
        }

        options.active.set(message.guild.id, data)

    }
}

async function Play(client, ops, data) {


    const embed = new MessageEmbed()
        .setAuthor(`Now playing`)
        .setTitle(`${data.queue[0].title}`)
        .addField(`Channel`, data.queue[0].authorName, true)
        .addField(`Song Duration`, data.queue[0].songDuration, true)
        .addField(`Requested By`, data.queue[0].requester, true)
        .setImage(data.queue[0].thumbnail)
        .setURL(data.queue[0]._videoURL)


    const embedDeleting = await client.channels.cache.get(data.queue[0].channel).send(embed)


    var options = { seek: 2, volume: 1, bitrate: 128000 };

    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter: 'audioonly' }), options)

    data.connection.voice.setSelfDeaf(true)

    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('finish', function () {
        embedDeleting.delete()
        Finish(client, ops, this);
    })

}

async function Finish(client, ops, dispatcher) {

    var fetchedData = ops.active.get(dispatcher.guildID)

    fetchedData.queue.shift();

    if (fetchedData.queue.length > 0) {

        ops.active.set(dispatcher.guildID, fetchedData);

        Play(client, ops, fetchedData);

    } else {


        ops.active.delete(dispatcher.guildID);

        var voiceChannel = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;

        if (voiceChannel) {
            voiceChannel.leave()
        }

    }

}