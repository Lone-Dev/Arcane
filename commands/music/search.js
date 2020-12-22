const { MessageEmbed } = require('discord.js');
const search = require('yt-search')

module.exports = {
    name: "search",
    description: "Search songs",
    category: "🎵 Music",
    usage: `${process.env.prefix}search <song>`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client, options) {

        if (!message.member.voice.channel) return message.channel.send(`Join a voice channel.`);

        if (!args[1]) return message.channel.send(`Which song?`)

        search(args.slice(1).join(' '), async function (err, res) {

            if (err) console.log(err)

            var videos = res.videos.slice(0, 10);

            var response = '';

            for (var vid in videos) {
                response += `${parseInt(vid) + 1} [${videos[vid].title}](${videos[vid].url})\n`
            }

            response += `Choose between 0 - ${videos.length}`

            message.channel.send(new MessageEmbed()
                .setTitle(`Results for ${args.slice(1).join(' ')}`)
                .setDescription(response))

            const filter = music => !isNaN(music.content) && music.content < videos.length + 1 && music.content > 0;

            const collection = message.channel.createMessageCollector(filter);

            collection.videos = videos;

            collection.once("collect", function (music) {

                var playFile = require('./play.js')

                playFile.execute(message, [this.videos[parseInt(music.content)].url], client, options)

            })

        })

    }
}