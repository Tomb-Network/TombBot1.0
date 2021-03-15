const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("So you really think you can **add roles** to someone without proper permissions!? (**PERMISSION NEEDED:** *Manage Roles*)");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("I wasn't able to find that user. ¯\_(ツ)_/¯");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Maybe adding a role name will help. :)");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("I wasn't able to find that role. ¯\_(ツ)_/¯");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`You have been given the role ${gRole.name}`)
  }catch(e){
    message.channel.send(`<@${rMember.id}> has been given the role ${gRole.name}. Their DMs are locked, so the message has been redirected here.`)
  }

  let addroleEmbed = new Discord.MessageEmbed()
  .setDescription("~Role Added~")
  .setColor("#04ff00")
  .addField("User Role was Given To", `${rMember} with ID ${rMember.id}`)
  .addField("Role Given", `${gRole}`)
  .addField("Role Added By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Role Added in Channel", message.channel)
  .addField("Time that Role was Added", message.createdAt);

  let addroleChannel = message.guild.channels.find(addroleChannel => addroleChannel.name === "logs")
  if(!addroleChannel) return message.channel.send("Couldn't find channel '#logs'.");

addroleChannel.send(addroleEmbed);

}

module.exports.help = {
  name: "addrole"
}
