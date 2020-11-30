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
    }
}