const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
  .setDescription("Bot Information")
  .setColor("#ff9900")
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username)
  .addField("Created On", bot.user.createdAt)
  .addField(`Bot Owner`, `Aidan#2575`);

return message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo"
}
