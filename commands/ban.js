const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!bUser) return message.channel.send("I wasn't able to find that user. ¯\_(ツ)_/¯");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("So you really think you can **ban** someone without proper permissions!? (**PERMISSION NEEDED:** *Ban Members*)");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person cannot be banned!");

    let banEmbed = new Discord.MessageEmbed()
    banEmbed.setDescription("~BAN~")
    banEmbed.setColor("#ad0000")
    banEmbed.addField("Banned User", `${bUser} with ID ${bUser.id}`)
    banEmbed.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    banEmbed.addField("Banned In Channel", message.channel)
    banEmbed.addField("Reason", bReason)
    banEmbed.addField("Time of Ban", message.createdAt);

    let banChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
    if(!banChannel) return message.channel.send("Couldn't find channel '#logs'.")

  message.reply("Successfully banned " + bUser).then(message => {message.delete({timeout:30000})});;
  message.guild.members.ban(bUser, { reason: "Banned by " + message.author.username + " with reason: " + bReason });
  message.delete().catch(O_o=>{});
  banChannel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}
