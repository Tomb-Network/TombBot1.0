const Discord = require("discord.js");
const ms = require("ms")

module.exports.run = async (bot, message, args) => {

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("No user specified!");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("This user cannot be muted!");
  let muterole = message.guild.roles.cache.find(r => r.name === "MUTED");
  //create role start
  if(!muterole){
    try{
      muterole = await message.guild.roles.create({
        data: {
		  name: "MUTED",
          color: "#ff0000",
	    },
		reason: "Mute Role Created",
      })
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muterole, { SEND_MESSAGES: false, ADD_REACTIONS: false});
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //create role end
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.roles.add(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.roles.remove(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));

  let muteEmbed = new Discord.MessageEmbed()
  muteEmbed.setDescription("~Mute~")
  muteEmbed.setColor("#e56b00")
  muteEmbed.addField("User Muted", `${tomute} with ID ${tomute.id}`)
  muteEmbed.addField("Muted By", `<@${message.author.id}> with ID ${message.author.id}`)
  muteEmbed.addField("Muted In Channel", message.channel)
  muteEmbed.addField("Time of Mute", message.createdAt);

  let muteChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
  if(!muteChannel) return message.channel.send("Couldn't find channel '#logs'.");

  muteChannel.send(muteEmbed);

//module end
}

module.exports.help = {
  name: "mute"
}
