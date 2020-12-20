const { createStream } = require('table')
const mongoose = require('mongoose')

module.exports = async (client) => {

    let statuses = [`${client.guilds.cache.size} guilds.`, `${client.users.cache.size} users.`, `${client.prefix} for help`, 'Dm me for help']

    let i = 0;
    // Every 15 seconds, update the status
    setInterval(() => {
        // Get the status
        let status = statuses[i];
        // If it's undefined, it means we reached the end of the array
        if (!status) {
            // Restart at the first status
            status = statuses[0];
            i = 0;
        }
        client.user.setActivity(status);
        i++;
    }, 15000);

    mongoose.connect(
        process.env.mongoURL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

    let config,
        stream;

    config = {
        columnDefault: {
            width: 27
        },
        columnCount: 1
    };

    stream = createStream(config);

    stream.write([`${client.user.username} (${client.user.id})`]);

}