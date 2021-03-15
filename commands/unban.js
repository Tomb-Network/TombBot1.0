const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let userID = args[0]
      message.guild.fetchBans().then(bans=> {
      if(bans.size == 0) return 
      let bUser = bans.find(b => b.user.id == userID)
	  if(!bUser) return message.reply("That person is not banned.");
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("So you really think you can **unban** someone without proper permissions!? (**PERMISSION NEEDED:** *Ban Members*)");

    let banEmbed = new Discord.MessageEmbed()
    banEmbed.setDescription("~UNBAN~")
    banEmbed.setColor("#00ff00")
    banEmbed.addField("Un-Banned ID", userID)
    banEmbed.addField("Un-Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    banEmbed.addField("Un-Banned In Channel", message.channel)
    banEmbed.addField("Time of Un-Ban", message.createdAt);

    let banChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
    if(!banChannel) return message.channel.send("Couldn't find channel '#logs'.")

  message.guild.members.unban(bUser.user);
  message.delete().catch(O_o=>{});
  banChannel.send(banEmbed);
  message.reply("Successfully unbanned id " + userID).then(message => {message.delete({timeout:30000})});;
	})
}

module.exports.help = {
  name: "unban"
}
