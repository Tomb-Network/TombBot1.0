const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Coundn't find that user...");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.MessageEmbed()
    .setDescription("INCOMING REPORT")
    .setColor("#9900ff")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("In Channel", message.channel)
    .addField("Reason", reason)
    .addField("Time of Report", message.createdAt);

    let reportschannel = message.guild.channels.find(`name`, "problems");
    if (!reportschannel) return message.channel.send("Couldn't find channel '#problems'.");

  message.delete().catch(O_o=>{});
  message.reply(`Thank you for your reporting *${rUser}*.`)
  reportschannel.send(reportEmbed);
}

module.exports.help = {
  name: "report"
}
