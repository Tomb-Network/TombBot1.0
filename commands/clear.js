exports.run = (client, message, args, tools) => {

	if (isNaN(args[0])) return message,channel.send('**Please input a valid amount of messages to delete.**');
	
	if (args[0] > 100) return message.channel.send('**Please input a number less than 100.**');
	message.delete();
	message.channel.bulkDelete(args[0]).then( messages => message.channel.send(`**${message.author.username} successfully cleared \`${messages.size}/${args[0]}\` messages!**`).then( message => message.delete({ timeout: 10000}))).catch( error => message.channel.send(`**ERROR:** ${error.message}`));
	
	
}

module.exports.help = {
    name: `clear`
};
