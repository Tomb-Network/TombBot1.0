const Discord = require("discord.js");
const api = "https://api2.r6stats.com/public-api/stats/";
const fetch = require('node-fetch');

//import { playtime } from '../utilities'

module.exports.run = async (bot, message, args) => {

let platform = args[1];
let name = args[0];

if (!name || !platform)
	return message.channel.send("The Correct Format is `!r6ranked <username> <platform>`");

message.reply("Fetching Stats, this may take a while.").then(message => {message.delete({timeout:30000})});
//message.delete({timeout:30000});
//message.reply("Operation Shadow Legacy ranked stats are currently unavailable. They will be up soon! For now you can use `!r6` , `!r6rankedsteel` and `!r6rankedvoid` .").then(message => {message.delete({timeout:30000})});

 (async () => {
	 const body = {a: 1};

	 const response = await fetch(api + name + "/" + platform + "/seasonal", {
		 method: 'get',
		 headers: { 'Authorization': 'Bearer ' + process.env.R6API_KEY }
	 });
	 const json = await response.json();
	 
	 var gamesPlayed = Math.floor(json.seasons.phantom_sight.regions.ncsa[0].wins + json.seasons.phantom_sight.regions.ncsa[0].losses);
	 var kd = json.seasons.phantom_sight.regions.ncsa[0].kills / json.seasons.phantom_sight.regions.ncsa[0].deaths;
	 var wl = json.seasons.phantom_sight.regions.ncsa[0].wins / json.seasons.phantom_sight.regions.ncsa[0].losses;
	 var kdrounded = kd.toFixed(4);
	 var wlrounded = wl.toFixed(4);
	 var mmrNeeded = Math.floor(json.seasons.phantom_sight.regions.ncsa[0].next_rank_mmr - json.seasons.phantom_sight.regions.ncsa[0].mmr);
	 
	 let isrank = json.seasons.phantom_sight.regions.ncsa[0];
	 
	 if (isrank){
		 let rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717845532516810812/unranked.png";
	 if (isrank.rank_text === "Copper V"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839913864921219/copper-5.png";
	 }else if (isrank.rank_text === "Copper IV"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839912849768518/copper-4.png";
	 }else if (isrank.rank_text === "Copper III"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717840004348641420/copper-3.png";
	 }else if (isrank.rank_text === "Copper II"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717840000439549952/copper-2.png";
	 }else if (isrank.rank_text === "Copper I"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839995741798490/copper-1.png";
	 }else if (isrank.rank_text === "Bronze V"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839986048761947/bronze-5.png";
	 }else if (isrank.rank_text === "Bronze IV"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839981757857862/bronze-4.png";
	 }else if (isrank.rank_text === "Bronze III"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839977303638061/bronze-3.png";
	 }else if (isrank.rank_text === "Bronze II"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839972115415131/bronze-2.png";
	 }else if (isrank.rank_text === "Bronze I"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839967912722452/bronze-1.png";
	 }else if (isrank.rank_text === "Silver V"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717841732829446265/silver-5.png";
	 }else if (isrank.rank_text === "Silver IV"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717841731483205732/silver-4.png";
	 }else if (isrank.rank_text === "Silver III"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839957619900426/silver-3.png";
	 }else if (isrank.rank_text === "Silver II"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717841736625422449/silver-2.png";
	 }else if (isrank.rank_text === "Silver I"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839925659041912/silver-1.png";
	 }else if (isrank.rank_text === "Gold III"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839920290332744/gold-3.png";
	 }else if (isrank.rank_text === "Gold II"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839919397077002/gold-2.png";
	 }else if (isrank.rank_text === "Gold I"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839918134591608/gold-1.png";
	 }else if (isrank.rank_text === "Platinum III"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839926217146419/platinum-3.png";
	 }else if (isrank.rank_text === "Platinum II"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839923176276029/platinum-2.png";
	 }else if (isrank.rank_text === "Platinum I"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839921624121404/platinum-1.png";
	 }else if (isrank.rank_text === "Diamond"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839917031358564/diamond.png";
	 }else if (isrank.rank_text === "Champions"){
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839990733668372/champion.png";
	 }
	 else {
		  rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717845532516810812/unranked.png";
	 }
	 
 let rankstatsEmbed = new Discord.MessageEmbed()
  rankstatsEmbed.setAuthor(json.username + "'s R6 Phantom Sight Ranked Stats", json.avatar_url_256)
  rankstatsEmbed.setThumbnail(rankImage)
  rankstatsEmbed.setTitle("View full stats for " + json.username + ".")
  rankstatsEmbed.setURL("https://beta.r6stats.com/stats/" + json.ubisoft_id)
  rankstatsEmbed.setColor("#00FFFF")
  rankstatsEmbed.addField("Ranked Game Stats", "Kills: " + json.seasons.phantom_sight.regions.ncsa[0].kills + '\n' + "Deaths: " + json.seasons.phantom_sight.regions.ncsa[0].deaths + '\n' + "K/D: " + kdrounded + '\n' + "Wins: " + json.seasons.phantom_sight.regions.ncsa[0].wins + '\n' + "Losses: " + json.seasons.phantom_sight.regions.ncsa[0].losses + '\n' + "W/L: " + wlrounded + '\n' + "Games Played: " + gamesPlayed + '\n' + "Games Abandoned: " + json.seasons.phantom_sight.regions.ncsa[0].abandons, true)
  rankstatsEmbed.addField("Rank", "Final Rank: " + json.seasons.phantom_sight.regions.ncsa[0].rank_text + '\n' + "Highest Rank: " + json.seasons.phantom_sight.regions.ncsa[0].max_rank_text + '\n' + "Final MMR: " + json.seasons.phantom_sight.regions.ncsa[0].mmr + '\n' + "Last MMR Change: " + json.seasons.phantom_sight.regions.ncsa[0].last_match_mmr_change + '\n' + "MMR required for next Rank: " + json.seasons.phantom_sight.regions.ncsa[0].next_rank_mmr + '\n' + "MMR amount needed for next Rank: " + mmrNeeded, true)
  rankstatsEmbed.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
  rankstatsEmbed.setTimestamp()
  message.reply("Here is the Operation Phantom Sight ranked stats for " + json.username);
  message.channel.send(rankstatsEmbed);
  }})();

}

module.exports.help = {
  name: "r6rankedphantom"
}
