const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("So you really think you can **warn** someone without proper permissions!? (**PERMISSION NEEDED:** *Manage Roles*)");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Could not find that User.");
  // if(wUser.hasPermission("ADMINISTRATOR")) return message.reply("You can't Warn Admins!");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.MessageEmbed()
  .setDescription("~Warns~")
  .setAuthor(message.author.username)
  .setColor("#a00e1a")
  .addField("Warned User", wUser.tag)
  .addField("Warned in Channel", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(`name`, "#logs");
  if(!warnchannel) return message.reply("Couldn't find channel '#logs'.");

  warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 2){
      let muterole = message.guild.roles.find(`name`, "muted");
      if(!muterole) return message.reply("Couldn't find muted role!");

      let mutetime = "5m";
      await(wUser.addRole(muteroleid));
      message.channel.send(`${wUser.tag} has been Muted Temporarily for 5 Minutes!`);

      setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.reply(`They are Now UnMuted!`)
      }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 3){
      let muterole = message.guild.roles.find(`name`, "muted");
      if(!muterole) return message.reply("Couldn't find Muted role!");

      let mutetime = "1h";
      await(wUser.addRole(muteroleid));
      message.channel.send(`${wUser.tag} has been Muted Temporarily for 1 Hour!`);

      setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.reply(`They are Now UnMuted!`)
      }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 4){
      let banrole = message.guild.roles.find(`name`, "TEMP BANNED");
      if(!banrole) return message.reply("Couldn't find Temp Banned Role!")

      let bantime = "1d";
      await(wUser.addRole(banroleid));
      message.channel.send(`${bUser.tag} has been Temporarily Banned!`);

      setTimeout(function(){
        wUser.removeRole(banrole.id)
        message.reply(`They are now UnBanned`)
      }, ms(bantime))
    }

    if(warns[wUser.id].warns == 5){
      message.guild.member(wUser).ban(reason);
      message.reply(`<@${wUser.id}> has been Permanently Banned!`)
    }
}

module.exports.help = {
  name: "warn"
}
