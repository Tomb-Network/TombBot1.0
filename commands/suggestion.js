const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let suggestionEmbed = new Discord.MessageEmbed()
  .setDescription("~New Suggestion~")
  .setColor("#a4ea2c")
  .addField("Suggestion", message)
  .addField("Suggested By", `<@${message.author.id}>`)
  .addField("Suggestion in Channel", message.channel)
  .addField("Time of Suggestion", message.createdAt);

  let suggestionChannel = message.guild.channels.find(`name`, "submitted-suggestions");
  if(!suggestionChannel) return message.channel.send("Couldn't find channel '#submitted-suggestions'.");

suggestionChannel.send(suggestionEmbed);

  return message.reply("thanks for your suggestion. our devs will be sure to work on that soon")

}

module.exports.help = {
  name: "suggestion"
}
