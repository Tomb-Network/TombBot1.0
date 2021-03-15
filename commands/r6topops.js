const Discord = require("discord.js");
const api = "https://api2.r6stats.com/public-api/stats/";
const fetch = require('node-fetch');

//import { playtime } from '../utilities'

module.exports.run = async (bot, message, args) => {

let platform = args[1];
let name = args[0];

if (!name || !platform)
	return message.channel.send("The Correct Format is `!r6 <username> <platform>`");

 message.reply("Fetching Stats, this may take a while.").then(message => {message.delete({timeout:30000})});

 (async () => {
	 const body = {a: 1};

	 const response = await fetch(api + name + "/" + platform + "/operators", {
		 method: 'get',
		 headers: { 'Authorization': 'Bearer ' + process.env.R6API_KEY }
	 });
	 const json = await response.json();

	const operators = json.operators

	operators.sort((a, b) => b.playtime - a.playtime)

	 //console.log(operators);

playtime = operators[0].playtime
var hours = Math.floor(playtime / 3600);
var minutes = Math.floor(playtime % 3600 / 60);
var formatPlaytime = hours + 'h ' + minutes + 'm';

playtime1 = operators[1].playtime
var hours = Math.floor(playtime1 / 3600);
var minutes = Math.floor(playtime1 % 3600 / 60);
var formatPlaytime1 = hours + 'h ' + minutes + 'm';


 let topopEmbed = new Discord.MessageEmbed()
	topopEmbed.setAuthor(json.username + "'s R6 Top Operator #1", json.avatar_url_256)
	topopEmbed.setTitle("View full stats for " + json.username + ".")
	topopEmbed.setURL("https://r6stats.com/stats/" + json.ubisoft_id)
	topopEmbed.setThumbnail(operators[0].badge_image)
	topopEmbed.setColor("#00FFFF")
	topopEmbed.addField("About", `Name: ${operators[0].name}` + '\n' + `CTU: ${operators[0].ctu}` + '\n' + `Role: ${operators[0].role}` + '\n' + `Playtime: ${formatPlaytime}`, true)	
	topopEmbed.addField('\u200b', '\u200b')
	topopEmbed.addField("Stats", `Kills: ${operators[0].kills}` + '\n' + `Deaths: ${operators[0].deaths}` + '\n' + `K/D: ${operators[0].kd}` + '\n' + `Headshots: ${operators[0].headshots}` + '\n' + `DBNOs: ${operators[0].dbnos}` + '\n' + `Melee Kills: ${operators[0].melee_kills}` + '\n\n' + `Wins: ${operators[0].wins}` + '\n' + `Losses ${operators[0].losses}` + '\n' + `W/L: ${operators[0].wl}`, true)
	topopEmbed.addField("Ability Stats", operators[0].abilities[0].ability + ': ' + operators[0].abilities[0].value, true)
	topopEmbed.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
	topopEmbed.setTimestamp()
	
	
 let topopEmbed2 = new Discord.MessageEmbed()
	topopEmbed2.setAuthor(json.username + "'s R6 Top Operator #2", json.avatar_url_256)
	topopEmbed2.setTitle("View full stats for " + json.username + ".")
	topopEmbed2.setURL("https://r6stats.com/stats/" + json.ubisoft_id)
	topopEmbed2.setThumbnail(operators[1].badge_image)
	topopEmbed2.setColor("#00FFFF")
	topopEmbed2.addField("About", `Name: ${operators[1].name}` + '\n' + `CTU: ${operators[1].ctu}` + '\n' + `Role: ${operators[1].role}` + '\n' + `Playtime: ${formatPlaytime1}`, true)	
	topopEmbed2.addField('\u200b', '\u200b')
	topopEmbed2.addField("Stats", `Kills: ${operators[1].kills}` + '\n' + `Deaths: ${operators[1].deaths}` + '\n' + `K/D: ${operators[1].kd}` + '\n' + `Headshots: ${operators[1].headshots}` + '\n' + `DBNOs: ${operators[1].dbnos}` + '\n' + `Melee Kills: ${operators[1].melee_kills}` + '\n\n' + `Wins: ${operators[1].wins}` + '\n' + `Losses ${operators[1].losses}` + '\n' + `W/L: ${operators[1].wl}`, true)
	topopEmbed2.addField("Ability Stats", operators[1].abilities[0].ability + ': ' + operators[1].abilities[0].value, true)
	topopEmbed2.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
	topopEmbed2.setTimestamp()
  message.reply("Here is the top operator stats (via playtime) for " + json.username);
  message.channel.send(topopEmbed);
  message.channel.send(topopEmbed2);
})();

}

module.exports.help = {
  name: "r6topops"
}
