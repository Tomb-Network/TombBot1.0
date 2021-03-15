const math = require('mathjs');
const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {
	
	if (!args[0]) return message.channel.send('Please input a calculation.');
	
	let resp;
	try {
		resp = math.eval(args.join(' '));
	} catch (e) {
		return message.channel.send('Sorry, you need to input a valid calculcation.');
	}
	
	const embed = new Discord.MessageEmbed()
		.setColor('0xffffff')
		.setTitle('Math Calculation')
		.addField('Input', `\`\`\`js\n${args.join('')}\`\`\``)
		.addField('Output', `\`\`\`js\n${resp}\`\`\``)
		.setFooter(`Requested By ${message.author.username}`, message.author.avatarURL)
		.setTimestamp()
	
	message.channel.send(embed);
	
}

module.exports.help = {
  name: "calc"
}