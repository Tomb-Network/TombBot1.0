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

let status;

 (async () => {
	 const body = {a: 1};

	 const response = await fetch(api + name + "/" + platform + "/generic", {
		 method: 'get',
		 headers: {'Authorization': 'Bearer ' + process.env.R6API_KEY}
	 });
	 
	 status = response.status
	 
	 if (status === 404){
		return message.reply("User not found. Make sure the name is correct and you chose the right platform"); 
	 }else if (status === 500){
		return message.reply("User not found. Make sure the name is correct and you chose the right platform"); 
	 }
	 
	 const json = await response.json();

//	 console.log(json);
	 //console.log(status);

playtime = json.stats.general.playtime

var days = Math.floor(playtime / 60 / 60 / 24);
var hours = Math.floor(playtime / 60 / 60) - (days * 24);

var formatPlaytime = days + ' days, ' + hours + ' hours';

 let statsEmbed = new Discord.MessageEmbed()
	statsEmbed.setTitle(json.username + "'s R6 Stats")
	statsEmbed.setURL("https://r6stats.com/stats/" + json.ubisoft_id)
	statsEmbed.setThumbnail(json.avatar_url_256)
	statsEmbed.setColor("#00FFFF")
	statsEmbed.addField("About", "Platform: " + json.platform + '\n' + "Level: " + json.progression.level + '\n' + "Playtime: " + formatPlaytime + '\n' + "Total XP: " + json.progression.total_xp + '\n' + "Alpha Pack Probability: " + json.progression.lootbox_probability + "%", true)	
	statsEmbed.addField('\u200b', '\u200b')
	statsEmbed.addField("General", "Kills: " + json.stats.general.kills + '\n' + "Deaths: " + json.stats.general.deaths + '\n' + "Assists: " + json.stats.general.assists + '\n' + "K/D: " + json.stats.general.kd + '\n' + "Headshots: " + json.stats.general.headshots + '\n' + "Blind Kills: " + json.stats.general.blind_kills + '\n' + "Melee Kills: " + json.stats.general.melee_kills + '\n' + "Penetration Kills: " + json.stats.general.penetration_kills + '\n' + "Games Played: " + json.stats.general.games_played, true)
	statsEmbed.addField("Other", "Wins: " + json.stats.general.wins + '\n' + "Losses: " + json.stats.general.losses + '\n' + "W/L: " + json.stats.general.wl + '\n' + "Revives: " + json.stats.general.revives + '\n' + "Suicides: " + json.stats.general.suicides + '\n' + "Barricades Placed: " + json.stats.general.barricades_deployed + '\n' + "Walls Reinforced: " + json.stats.general.reinforcements_deployed + '\n' + "DBNOs: " + json.stats.general.dbnos, true)
	statsEmbed.addField("Ranked Overall", "Kills: " + json.stats.queue.ranked.kills + '\n' + "Deaths: " + json.stats.queue.ranked.deaths + '\n' + "K/D: " + json.stats.queue.ranked.kd + '\n' + "Wins: " + json.stats.queue.ranked.wins + '\n' + "Losses: " + json.stats.queue.ranked.losses + '\n' + "W/L: " + json.stats.queue.ranked.wl + '\n' + "Games Played: " + json.stats.queue.ranked.games_played, true)
	statsEmbed.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
	statsEmbed.setTimestamp()
  message.reply("Here is the stats for " + json.username);
  message.channel.send(statsEmbed);
})();

}

module.exports.help = {
  name: "r6"
}
