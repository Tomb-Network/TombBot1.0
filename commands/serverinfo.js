const Discord = require(`discord.js`);

module.exports.run = async (bot, message, args) => {
    const sicon = message.guild.iconURL;
    const serverembed = new Discord.MessageEmbed()
        .setDescription(`Server Information`)
        .setColor(`#9900ff`)
		.setAuthor(`Requested By: ${message.author.username}`, message.author.avatarURL)
        .setThumbnail(sicon)
		.setFooter(`Server Created`)
		.setTimestamp(message.guild.createdAt)
		.addField(`Server ID`, message.guild.id, true)
        .addField(`Server Name`, message.guild.name, true)
		.addField(`Owner`, message.guild.owner, true)
		.addField(`Server Region`, message.guild.region, true)
//		.addField(`Channel Count`, guild.textChannelCount, true)
        .addField(`Current Amount of Members`, message.guild.memberCount, true)
        .addField(`You Joined This Server On`, message.member.joinedAt, true);

    message.channel.send(`${message.guild.name}'s Server Info:`);
    message.channel.send(serverembed);
};

module.exports.help = {
    name: `serverinfo`
};
