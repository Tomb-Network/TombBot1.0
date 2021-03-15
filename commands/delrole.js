const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("So you really think you can **delete roles** from someone without proper permissions!? (**PERMISSION NEEDED:** *Manage Roles*)");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("I wasn't able to find that user. ¯\_(ツ)_/¯");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Maybe adding a role name will help. :)");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("I wasn't able to find that role. ¯\_(ツ)_/¯");

  if(!rMember.roles.has(gRole.id)) return message.reply("They do not have that role.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`Your role ${gRole.name} has been revoked!`)
  }catch(e){
    message.channel.send(`<@${rMember.id}>'s role ${gRole.name} has been revoked!. Their DMs are locked, so the message has been redirected here.`)
  }

  let revokeroleEmbed = new Discord.MessageEmbed()
  .setDescription("~Role Revoked~")
  .setColor("#226d20")
  .addField("User Role was Revoked From", `${rMember} with ID ${rMember.id}`)
  .addField("Role Revoked", `${gRole}`)
  .addField("Role Revoked By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Role Revoked in Channel", message.channel)
  .addField("Time that Role was Revoked", message.createdAt);

  let revokeroleChannel = message.guild.channels.find(`name`, "logs");
  if(!revokeroleChannel) return message.channel.send("Couldn't find channel '#logs'.");

revokeroleChannel.send(revokeroleEmbed);

}

module.exports.help = {
  name: "delrole"
}
