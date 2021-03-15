const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("SEND_MESSAGES")) return message.reply("You can't check your Warns. Oh wait. You can't send messages. DOI!")
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Could not find that User.");
  let warns = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> has ${warns} warnings.`);

}

module.exports.help = {
  name: "warns"
}
