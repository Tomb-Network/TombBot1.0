const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("I wasn't able to find that user. ¯\_(ツ)_/¯");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("So you really think you can **kick** someone without proper permissions!? (**PERMISSION NEEDED:** *Manage Messages*)");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person cannot be kicked!");

    let kickEmbed = new Discord.MessageEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In Channel", message.channel)
    .addField("Reason", kReason)
    .addField("Time of Kick", message.createdAt);

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) return message.channel.send("Couldn't find channel '#logs'.");

  message.guild.member(kUser).kick(kReason);
  message.delete().catch(O_o=>{});
  kickChannel.send(kickEmbed);
}

module.exports.help = {
  name: "kick"
}
