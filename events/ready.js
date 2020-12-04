const { createStream } = require('table')
const mongoose = require('mongoose')

module.exports = (client) => {

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