const Discord = require("discord.js");
const api = "https://public-api.tracker.gg/v2/csgo/standard/profile/steam/";
const fetch = require('node-fetch');

//import { playtime } from '../utilities'

module.exports.run = async (bot, message, args) => {

let name = args[0];

if (!name)
	return message.channel.send("The Correct Format is `!csgo <steam id/name>`");

 message.reply("Fetching Stats, this may take a while.").then(message => {message.delete({timeout:30000})});

let status;

 (async () => {
	 const body = {a: 1};

	 const response = await fetch(api + name, {
		 method: 'get',
		 headers: { 'TRN-Api-Key': process.env.TRACKERAPI_KEY }
	 })
	 status = response.status
	 
	 if (status === 451){
		return message.reply("This user's account is private. If you own the account, please set your game activity to public on Steam.")
	 }else if (status === 400){
		return message.reply("User not found. Please check you put the right Steam ID/Community URL")
	 }
	 
	 const json = await response.json();
	 

	 //console.log(json);
	 //console.log(status);

 let statsEmbed = new Discord.MessageEmbed()
	statsEmbed.setTitle(json.data.platformInfo.platformUserHandle + "'s CS:GO Stats")
	statsEmbed.setURL("https://tracker.gg/csgo/profile/steam/" + json.data.platformInfo.platformUserId)
	statsEmbed.setThumbnail(json.data.platformInfo.avatarUrl)
	statsEmbed.setColor("#00FFFF")
	statsEmbed.addField("About", "Platform: " + json.data.platformInfo.platformSlug + '\n' + "Playtime: " + json.data.segments[0].stats.timePlayed.displayValue + '\n' + "Score: " + json.data.segments[0].stats.score.displayValue, true)	
	statsEmbed.addField('\u200b', '\u200b')
	statsEmbed.addField("General", "Kills: " + json.data.segments[0].stats.kills.displayValue + '\n' + "Deaths: " + json.data.segments[0].stats.deaths.displayValue + '\n' + "K/D: " + json.data.segments[0].stats.kd.displayValue + '\n' + "Headshots: " + json.data.segments[0].stats.headshots.displayValue + '\n' + "Headshot Percentage: " + json.data.segments[0].stats.headshotPct.displayValue + '\n' + "Damaged Dealt: " + json.data.segments[0].stats.damage.displayValue + '\n' + "Shots Fired: " + json.data.segments[0].stats.shotsFired.displayValue + '\n' + "Shots Hit: " + json.data.segments[0].stats.shotsHit.displayValue + '\n' + "Shot Accuracy: " + json.data.segments[0].stats.shotsAccuracy.displayValue + '\n' + "Matches Played: " + json.data.segments[0].stats.matchesPlayed.displayValue, true)
	statsEmbed.addField("Other", "Wins: " + json.data.segments[0].stats.wins.displayValue + '\n' + "Ties: " + json.data.segments[0].stats.ties.displayValue + '\n' + "Losses: " + json.data.segments[0].stats.losses.displayValue + '\n' + "W/L: " + json.data.segments[0].stats.wlPercentage.displayValue + '\n' + "Rounds Played: " + json.data.segments[0].stats.roundsPlayed.displayValue + '\n' + "Rounds Won: " + json.data.segments[0].stats.roundsWon.displayValue + '\n' + "Bombs Planted: " + json.data.segments[0].stats.bombsPlanted.displayValue + '\n' + "Bombs Defused: " + json.data.segments[0].stats.bombsDefused.displayValue + '\n' + "MVP Placements: " + json.data.segments[0].stats.mvp.displayValue + '\n' + "Money Earned: $" + json.data.segments[0].stats.moneyEarned.displayValue, true)
	statsEmbed.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
	statsEmbed.setTimestamp()
  message.reply("Here is the stats for " + json.data.platformInfo.platformUserHandle);
  message.channel.send(statsEmbed);
})();

}

module.exports.help = {
  name: "csgo"
}
