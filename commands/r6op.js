const Discord = require("discord.js");
const api = "https://api2.r6stats.com/public-api/stats/";
const fetch = require('node-fetch');

//import { playtime } from '../utilities'

module.exports.run = async (bot, message, args) => {

let operatorname = args[2];
let platform = args[1];
let name = args[0];

if (!name || !platform || !operatorname)
	return message.channel.send("The Correct Format is `!r6op <username> <platform> <op name>`");

 message.reply("Fetching Stats, this may take a while.").then(message => {message.delete({timeout:30000})});

 (async () => {
	 const body = {a: 1};

	 const response = await fetch(api + name + "/" + platform + "/operators", {
		 method: 'get',
		 headers: { 'Authorization': 'Bearer ' + process.env.R6API_KEY }
	 });
	 const json = await response.json();

	let op = json.operators.find(o => o.name === operatorname);

	// console.log(op);

	if (operatorname === "Aruni"){
		return message.reply("Aruni's stats are currently unavailable at this time.");
	}	

playtime = op.playtime
var hours = Math.floor(playtime / 3600);
var minutes = Math.floor(playtime % 3600 / 60);
var formatPlaytime = hours + 'h ' + minutes + 'm';

let topopEmbed = new Discord.MessageEmbed()
	topopEmbed.setAuthor(json.username + `'s Stats for ${op.name}`, json.avatar_url_256)
	topopEmbed.setTitle("View full stats for " + json.username + ".")
	topopEmbed.setURL("https://r6stats.com/stats/" + json.ubisoft_id)
	topopEmbed.setThumbnail(op.badge_image)
	topopEmbed.setColor("#00FFFF")
	topopEmbed.addField("About", `Name: ${op.name}` + '\n' + `CTU: ${op.ctu}` + '\n' + `Role: ${op.role}` + '\n' + `Playtime: ${formatPlaytime}`, true)	
	topopEmbed.addField('\u200b', '\u200b')
	topopEmbed.addField("Stats", `Kills: ${op.kills}` + '\n' + `Deaths: ${op.deaths}` + '\n' + `K/D: ${op.kd}` + '\n' + `Headshots: ${op.headshots}` + '\n' + `DBNOs: ${op.dbnos}` + '\n' + `Melee Kills: ${op.melee_kills}` + '\n\n' + `Wins: ${op.wins}` + '\n' + `Losses ${op.losses}` + '\n' + `W/L: ${op.wl}`, true)
	topopEmbed.addField("Ability Stats", op.abilities[0].ability + ': ' + op.abilities[0].value, true)
	topopEmbed.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
	topopEmbed.setTimestamp()
  message.reply(`Here is the ${op.name} stats for ` + json.username);
  message.channel.send(topopEmbed);
})();

}

module.exports.help = {
  name: "r6op"
}
