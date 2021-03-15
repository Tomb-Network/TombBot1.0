const Discord = require("discord.js");
const request = require('node-fetch');
const stratr = "https://squadstrats.com/api/?type=";

module.exports.run = async (bot, message, args) => {

message.delete({timeout:180000});

let side = args[0];
let type = args[1];

if (!type || !side)
	return message.channel.send("The Correct Format is `!strat <attack/defend> <bomb/secure/hostage>`").then(message => {message.delete({timeout:15000})});;

(async () => {
	
	let stratbody = "not fetched"
	
	const response = await request(stratr + type + "&team=" + side)
		.then(res => res.text())
		.then(body => stratbody = body);
	


 let stratEmbed = new Discord.MessageEmbed()
  stratEmbed.setDescription("**Tomb R6 Strat Roulette**")
  stratEmbed.setColor("#2E4146")
  stratEmbed.addField("Strat", stratbody)
  stratEmbed.setFooter(`Requested by: ` + message.author.username, message.author.avatarURL)
  stratEmbed.setTimestamp()
  
 return message.channel.send(stratEmbed).then(message => {message.delete({timeout:180000})});
})();

}


module.exports.help = {
  name: "strat"
}
