const moment = require("moment")
require("moment-duration-format")

exports.run = (client, message, args) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
	message.channel.send(`TOMB BOT has been online for:`);
    message.channel.send(duration)
}

module.exports.help = {
    name: `up`
};