const Discord = require("discord.js");
const api = "https://halo.api.stdlib.com/mcc@0.0.11/stats/?gamertag=";
const fetch = require('node-fetch');

//import { playtime } from '../utilities'

module.exports.run = async (bot, message, args) => {

var arguments = args.toString();

arguments = arguments.split(',').join(" ");

if (!arguments)
	return message.channel.send("The Correct Format is `!halo <username>`");

 message.reply("Fetching Stats, this may take a while.").then(message => {message.delete({timeout:15000})});

 (async () => {
	 const body = {a: 1};

	 const response = await fetch(api + arguments, {
		 method: 'get',
	 });
	 const json = await response.json();

	 //console.log(json);
	 
 let kdrounded = json.killDeathRatio.toFixed(4);
 let kpgrounded = json.killsPerGame.toFixed(2);
 let dpgrounded = json.deathsPerGame.toFixed(2);
 let wrcalc = json.winRatio * 100
 let wrpercent =  wrcalc.toFixed(2);

 let statsEmbed = new Discord.MessageEmbed()
	statsEmbed.setTitle(json.gamertag + "'s Halo: MCC Stats")
	//statsEmbed.setURL("https://tracker.gg/halo-mcc/profile/" + json.gamertag)
	statsEmbed.setThumbnail(json.emblem)
	statsEmbed.setColor("#00FFFF")
	statsEmbed.addField("About", "Clan Tag: " + json.clantag + '\n' + "Playtime: " + json.playtime + '\n' + "Games Played: " + json.gamesPlayed, true)	
	statsEmbed.addField('\u200b', '\u200b')
	statsEmbed.addField("Kills & Deaths", "Kills: " + json.kills + '\n' + "Deaths: " + json.deaths + '\n' + "K/D: " + kdrounded + '\n' + "Kills per Game: " + kpgrounded + '\n' + "Deaths per Game: " + dpgrounded, true)
	statsEmbed.addField("Wins & Losses", "Wins: " + json.wins + '\n' + "Losses: " + json.losses + '\n' + "Win Percentage: " + wrpercent + "%", true)
	statsEmbed.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
	statsEmbed.setTimestamp()
  message.reply("Here is the stats for " + json.gamertag);
  message.channel.send(statsEmbed);
})();

}

module.exports.help = {
  name: "halo"
}
