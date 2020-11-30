const { createStream } = require('table')

module.exports = (client) => {

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