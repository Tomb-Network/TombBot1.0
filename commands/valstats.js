const Discord = require("discord.js");
const fetch = require('node-fetch');
const api = ("https://api.henrikdev.xyz/valorant/v1");
 
module.exports.run = async (bot, message, args) => {
 
if (!args[0])
	return message.channel.send("The Correct Format is `!valstats <ign#tagline>`");
 
var ignString = args[0].split('#')[0]
var taglineString = args[0].substring(args[0].indexOf("#") + 1);


 message.reply("Fetching Stats, this may take a while.").then(message => {message.delete({timeout:30000})});

if (!args[1]){
 (async () => {
	 const body = {a: 1};

	 const response = await fetch(api + '/profile/' + ignString + '/' + taglineString, {
		 method: 'get',
	 })
	 const json = await response.json();

	 //console.log(json);

if (json.status === "404"){
	return message.reply("User not found. Either the name and or tagline are incorrect");
}else if (json.status === "451"){
	return message.reply("This user's account is private. If you own the account, please go to this link and sign in to make your account public. <https://tracker.gg/valorant>");
}else if (json.status === "429"){
	return message.reply("We have reached our rate limit, please try again in a few minutes.");
}

var valignString = json.user.split('#')[0]
var valtaglineString = json.user.substring(args[0].indexOf('#') + 1);

	let statsEmbed = new Discord.MessageEmbed()
	statsEmbed.setTitle(json.user + "'s Valorant Stats")
	statsEmbed.setURL("http://tracker.gg/valorant/profile/riot/" + ignString + "%23" + taglineString + "/overview")
	statsEmbed.setThumbnail("https://i.imgur.com/BOf71Pg.png")
	statsEmbed.setColor("#00FFFF")
	statsEmbed.addField("About", "Game Name: " + valignString + '\n' + "Tag Line: " + valtaglineString + '\n' + "Playtime: " + json.stats.playtime.playtimepatched, true)	
	statsEmbed.addField('\u200b', '\u200b')
	statsEmbed.addField("General", "Kills: " + json.stats.kills + '\n' + "Assists: " + json.stats.assists + '\n' + "Deaths: " + json.stats.deaths + '\n' + "K/D: " + json.stats.kdratio + '\n' + "Headshots: " + json.stats.headshots + '\n' + "Matches Played: " + json.stats.matches + '\n' + "Wins: " + json.stats.wins, true)
	statsEmbed.addField("Other Stats", "Headshot Percentage: " + json.stats.headshotpercentage + '%\n' + "Win Percentage: " + json.stats.winpercentage + '%\n' + "First Bloods: " + json.stats.firstbloods + '\n' + "Aces : " + json.stats.aces + '\n' + "Clutches: " + json.stats.clutches + '\n' + "Flawless Rounds: " + json.stats.flawless, true)
	statsEmbed.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
	statsEmbed.setTimestamp()
	message.reply("Here is the Valorant stats for " + json.user);
	message.channel.send(statsEmbed);
})();

}else if (args[1] === "matches"){

	(async () => {
	 const body = {a: 1};

	 const response = await fetch(api + '/matches/' + ignString + '/' + taglineString, {
		 method: 'get',
	 })
	 const json = await response.json();

	 //console.log(json);

if (json.status === "404"){
	return message.reply("User not found. Either the name and or tagline are incorrect");
}else if (json.status === "451"){
	return message.reply("This user's account is private. If you own the account, please go to this link and sign in to make your account public. <https://tracker.gg/valorant>");
}else if (json.status === "429"){
	return message.reply("We have reached our rate limit, please try again in a few minutes.");
}

var valignString = json.user.split('#')[0]
var valtaglineString = json.user.substring(args[0].indexOf('#') + 1);
var winorloss1;
var winorloss2;
var winorloss3;
var winorloss4;
var winorloss5;
var winorloss6;
var winorloss7;
var winorloss8;
var winorloss9;
var winorloss10;

if (json.matches[0].metadata.playerhaswon === false){
	var winorloss1 = "Loss"
}else if (json.matches[0].metadata.playerhaswon === true){
	var winorloss1 = "Win"
}else if (json.matches[1].metadata.playerhaswon === false){
	var winorloss2 = "Loss"
}else if (json.matches[1].metadata.playerhaswon === true){
	var winorloss2 = "Win"
}else if (json.matches[2].metadata.playerhaswon === false){
	var winorloss3 = "Loss"
}else if (json.matches[2].metadata.playerhaswon === true){
	var winorloss3 = "Win"
}else if (json.matches[3].metadata.playerhaswon === false){
	var winorloss4 = "Loss"
}else if (json.matches[3].metadata.playerhaswon === true){
	var winorloss4 = "Win"
}else if (json.matches[4].metadata.playerhaswon === false){
	var winorloss5 = "Loss"
}else if (json.matches[4].metadata.playerhaswon === true){
	var winorloss5 = "Win"
}else if (json.matches[5].metadata.playerhaswon === false){
	var winorloss6 = "Loss"
}else if (json.matches[5].metadata.playerhaswon === true){
	var winorloss6 = "Win"
}else if (json.matches[6].metadata.playerhaswon === false){
	var winorloss7 = "Loss"
}else if (json.matches[6].metadata.playerhaswon === true){
	var winorloss7 = "Win"
}else if (json.matches[7].metadata.playerhaswon === false){
	var winorloss8 = "Loss"
}else if (json.matches[7].metadata.playerhaswon === true){
	var winorloss8 = "Win"
}else if (json.matches[8].metadata.playerhaswon === false){
	var winorloss9 = "Loss"
}else if (json.matches[8].metadata.playerhaswon === true){
	var winorloss9 = "Win"
}else if (json.matches[9].metadata.playerhaswon === false){
	var winorloss10 = "Loss"
}else if (json.matches[9].metadata.playerhaswon === true){
	var winorloss10 = "Win"
}

var convertDate1 = json.matches[0].metadata.timestamp.split("T")[0]
var convertTime1 = json.matches[0].metadata.timestamp.substring(json.matches[0].metadata.timestamp.indexOf("T") + 1).split(".")[0];
var convertDate2 = json.matches[1].metadata.timestamp.split("T")[0]
var convertTime2 = json.matches[1].metadata.timestamp.substring(json.matches[1].metadata.timestamp.indexOf("T") + 1).split(".")[0];
var convertDate3 = json.matches[2].metadata.timestamp.split("T")[0]
var convertTime3 = json.matches[2].metadata.timestamp.substring(json.matches[2].metadata.timestamp.indexOf("T") + 1).split(".")[0];
var convertDate4 = json.matches[3].metadata.timestamp.split("T")[0]
var convertTime4 = json.matches[3].metadata.timestamp.substring(json.matches[3].metadata.timestamp.indexOf("T") + 1).split(".")[0];
var convertDate5 = json.matches[4].metadata.timestamp.split("T")[0]
var convertTime5 = json.matches[4].metadata.timestamp.substring(json.matches[4].metadata.timestamp.indexOf("T") + 1).split(".")[0];
var convertDate6 = json.matches[5].metadata.timestamp.split("T")[0]
var convertTime6 = json.matches[5].metadata.timestamp.substring(json.matches[5].metadata.timestamp.indexOf("T") + 1).split(".")[0];
var convertDate7 = json.matches[6].metadata.timestamp.split("T")[0]
var convertTime7 = json.matches[6].metadata.timestamp.substring(json.matches[6].metadata.timestamp.indexOf("T") + 1).split(".")[0];
var convertDate8 = json.matches[7].metadata.timestamp.split("T")[0]
var convertTime8 = json.matches[7].metadata.timestamp.substring(json.matches[7].metadata.timestamp.indexOf("T") + 1).split(".")[0];
var convertDate9 = json.matches[8].metadata.timestamp.split("T")[0]
var convertTime9 = json.matches[8].metadata.timestamp.substring(json.matches[8].metadata.timestamp.indexOf("T") + 1).split(".")[0];
var convertDate10 = json.matches[9].metadata.timestamp.split("T")[0]
var convertTime10 = json.matches[9].metadata.timestamp.substring(json.matches[9].metadata.timestamp.indexOf("T") + 1).split(".")[0];


	let statsEmbed = new Discord.MessageEmbed()
	statsEmbed.setTitle(json.user + "'s Last 10 Valorant Matches")
	statsEmbed.setURL("http://tracker.gg/valorant/profile/riot/" + ignString + "%23" + taglineString + "/overview")
	statsEmbed.setThumbnail("https://i.imgur.com/BOf71Pg.png")
	statsEmbed.setColor("#00FFFF")
	statsEmbed.addField("Match 1: " + json.matches[0].metadata.map, "Date: " + convertDate1 + " Time: " + convertTime1 + '\n' + "Agent: " + json.matches[0].metadata.agentplayed + '\n' + "Mode: " + json.matches[0].metadata.modename + '\n' + "Match Result: " + winorloss1 + " (" + json.matches[0].game.roundswon + "-" + json.matches[0].game.roundslost + "/" + json.matches[0].game.roundsplayed + ")\n" + "Time Length: " + json.matches[0].game.playtime.patched + '\n' + "K/D/A: " + json.matches[0].game.kda.kda + '\n' + "K/D: " + json.matches[0].game.kda.kd + '\n' + "Headshots: " + json.matches[0].game.headshots + '\n' + "Headshot Percentage: " + json.matches[0].game.headshotspercentage + "%\n" + "Damage made: " + json.matches[0].game.damagemade + '\n' + "Damage received: " + json.matches[0].game.damagereceived + '\n' + "Econ rating: " + json.matches[0].game.econrating, true)	
	statsEmbed.addField("Match 2: " + json.matches[1].metadata.map, "Date: " + convertDate2 + " Time: " + convertTime2 + '\n' + "Agent: " + json.matches[1].metadata.agentplayed + '\n' + "Mode: " + json.matches[1].metadata.modename + '\n' + "Match Result: " + winorloss1 + " (" + json.matches[1].game.roundswon + "-" + json.matches[1].game.roundslost + "/" + json.matches[1].game.roundsplayed + ")\n" + "Time Length: " + json.matches[1].game.playtime.patched + '\n' + "K/D/A: " + json.matches[1].game.kda.kda + '\n' + "K/D: " + json.matches[1].game.kda.kd + '\n' + "Headshots: " + json.matches[1].game.headshots + '\n' + "Headshot Percentage: " + json.matches[1].game.headshotspercentage + "%\n" + "Damage made: " + json.matches[1].game.damagemade + '\n' + "Damage received: " + json.matches[1].game.damagereceived + '\n' + "Econ rating: " + json.matches[1].game.econrating, true)
	statsEmbed.addField("Match 3: " + json.matches[2].metadata.map, "Date: " + convertDate3 + " Time: " + convertTime3 + '\n' + "Agent: " + json.matches[2].metadata.agentplayed + '\n' + "Mode: " + json.matches[2].metadata.modename + '\n' + "Match Result: " + winorloss1 + " (" + json.matches[2].game.roundswon + "-" + json.matches[2].game.roundslost + "/" + json.matches[2].game.roundsplayed + ")\n" + "Time Length: " + json.matches[2].game.playtime.patched + '\n' + "K/D/A: " + json.matches[2].game.kda.kda + '\n' + "K/D: " + json.matches[2].game.kda.kd + '\n' + "Headshots: " + json.matches[2].game.headshots + '\n' + "Headshot Percentage: " + json.matches[2].game.headshotspercentage + "%\n" + "Damage made: " + json.matches[2].game.damagemade + '\n' + "Damage received: " + json.matches[2].game.damagereceived + '\n' + "Econ rating: " + json.matches[2].game.econrating, true)
	statsEmbed.addField("Match 4: " + json.matches[3].metadata.map, "Date: " + convertDate4 + " Time: " + convertTime4 + '\n' + "Agent: " + json.matches[3].metadata.agentplayed + '\n' + "Mode: " + json.matches[3].metadata.modename + '\n' + "Match Result: " + winorloss1 + " (" + json.matches[3].game.roundswon + "-" + json.matches[3].game.roundslost + "/" + json.matches[3].game.roundsplayed + ")\n" + "Time Length: " + json.matches[3].game.playtime.patched + '\n' + "K/D/A: " + json.matches[3].game.kda.kda + '\n' + "K/D: " + json.matches[3].game.kda.kd + '\n' + "Headshots: " + json.matches[3].game.headshots + '\n' + "Headshot Percentage: " + json.matches[3].game.headshotspercentage + "%\n" + "Damage made: " + json.matches[3].game.damagemade + '\n' + "Damage received: " + json.matches[3].game.damagereceived + '\n' + "Econ rating: " + json.matches[3].game.econrating, true)
	statsEmbed.addField("Match 5: " + json.matches[4].metadata.map, "Date: " + convertDate5 + " Time: " + convertTime5 + '\n' + "Agent: " + json.matches[4].metadata.agentplayed + '\n' + "Mode: " + json.matches[4].metadata.modename + '\n' + "Match Result: " + winorloss1 + " (" + json.matches[4].game.roundswon + "-" + json.matches[4].game.roundslost + "/" + json.matches[4].game.roundsplayed + ")\n" + "Time Length: " + json.matches[4].game.playtime.patched + '\n' + "K/D/A: " + json.matches[4].game.kda.kda + '\n' + "K/D: " + json.matches[4].game.kda.kd + '\n' + "Headshots: " + json.matches[4].game.headshots + '\n' + "Headshot Percentage: " + json.matches[4].game.headshotspercentage + "%\n" + "Damage made: " + json.matches[4].game.damagemade + '\n' + "Damage received: " + json.matches[4].game.damagereceived + '\n' + "Econ rating: " + json.matches[4].game.econrating, true)
	statsEmbed.setFooter("1/2 Requested By: " + message.author.username, message.author.avatarURL())
	statsEmbed.setTimestamp()
	
	let statsEmbed1 = new Discord.MessageEmbed()
	statsEmbed1.setTitle(json.user + "'s Last 10 Valorant Matches")
	statsEmbed1.setURL("http://tracker.gg/valorant/profile/riot/" + ignString + "%23" + taglineString + "/overview")
	statsEmbed1.setThumbnail("https://i.imgur.com/BOf71Pg.png")
	statsEmbed1.setColor("#00FFFF")
	statsEmbed1.addField("Match 6: " + json.matches[5].metadata.map, "Date: " + convertDate6 + " Time: " + convertTime6 + '\n' + "Agent: " + json.matches[5].metadata.agentplayed + '\n' + "Mode: " + json.matches[5].metadata.modename + '\n' + "Match Result: " + winorloss1 + " (" + json.matches[5].game.roundswon + "-" + json.matches[5].game.roundslost + "/" + json.matches[5].game.roundsplayed + ")\n" + "Time Length: " + json.matches[5].game.playtime.patched + '\n' + "K/D/A: " + json.matches[5].game.kda.kda + '\n' + "K/D: " + json.matches[5].game.kda.kd + '\n' + "Headshots: " + json.matches[5].game.headshots + '\n' + "Headshot Percentage: " + json.matches[5].game.headshotspercentage + "%\n" + "Damage made: " + json.matches[5].game.damagemade + '\n' + "Damage received: " + json.matches[5].game.damagereceived + '\n' + "Econ rating: " + json.matches[5].game.econrating, true)
	statsEmbed1.addField("Match 7: " + json.matches[6].metadata.map, "Date: " + convertDate7 + " Time: " + convertTime7 + '\n' + "Agent: " + json.matches[6].metadata.agentplayed + '\n' + "Mode: " + json.matches[6].metadata.modename + '\n' + "Match Result: " + winorloss1 + " (" + json.matches[6].game.roundswon + "-" + json.matches[6].game.roundslost + "/" + json.matches[6].game.roundsplayed + ")\n" + "Time Length: " + json.matches[6].game.playtime.patched + '\n' + "K/D/A: " + json.matches[6].game.kda.kda + '\n' + "K/D: " + json.matches[6].game.kda.kd + '\n' + "Headshots: " + json.matches[6].game.headshots + '\n' + "Headshot Percentage: " + json.matches[6].game.headshotspercentage + "%\n" + "Damage made: " + json.matches[6].game.damagemade + '\n' + "Damage received: " + json.matches[6].game.damagereceived + '\n' + "Econ rating: " + json.matches[6].game.econrating, true)
	statsEmbed1.addField("Match 8: " + json.matches[7].metadata.map, "Date: " + convertDate8 + " Time: " + convertTime8 + '\n' + "Agent: " + json.matches[7].metadata.agentplayed + '\n' + "Mode: " + json.matches[7].metadata.modename + '\n' + "Match Result: " + winorloss1 + " (" + json.matches[7].game.roundswon + "-" + json.matches[7].game.roundslost + "/" + json.matches[7].game.roundsplayed + ")\n" + "Time Length: " + json.matches[7].game.playtime.patched + '\n' + "K/D/A: " + json.matches[7].game.kda.kda + '\n' + "K/D: " + json.matches[7].game.kda.kd + '\n' + "Headshots: " + json.matches[7].game.headshots + '\n' + "Headshot Percentage: " + json.matches[7].game.headshotspercentage + "%\n" + "Damage made: " + json.matches[7].game.damagemade + '\n' + "Damage received: " + json.matches[7].game.damagereceived + '\n' + "Econ rating: " + json.matches[7].game.econrating, true)
	statsEmbed1.addField("Match 9: " + json.matches[8].metadata.map, "Date: " + convertDate9 + " Time: " + convertTime9 + '\n' + "Agent: " + json.matches[8].metadata.agentplayed + '\n' + "Mode: " + json.matches[8].metadata.modename + '\n' + "Match Result: " + winorloss1 + " (" + json.matches[8].game.roundswon + "-" + json.matches[8].game.roundslost + "/" + json.matches[8].game.roundsplayed + ")\n" + "Time Length: " + json.matches[8].game.playtime.patched + '\n' + "K/D/A: " + json.matches[8].game.kda.kda + '\n' + "K/D: " + json.matches[8].game.kda.kd + '\n' + "Headshots: " + json.matches[8].game.headshots + '\n' + "Headshot Percentage: " + json.matches[8].game.headshotspercentage + "%\n" + "Damage made: " + json.matches[8].game.damagemade + '\n' + "Damage received: " + json.matches[8].game.damagereceived + '\n' + "Econ rating: " + json.matches[8].game.econrating, true)
	statsEmbed1.addField("Match 10: " + json.matches[9].metadata.map, "Date: " + convertDate10 + " Time: " + convertTime10 + '\n' + "Agent: " + json.matches[9].metadata.agentplayed + '\n' + "Mode: " + json.matches[9].metadata.modename + '\n' + "Match Result: " + winorloss1 + " (" + json.matches[9].game.roundswon + "-" + json.matches[9].game.roundslost + "/" + json.matches[9].game.roundsplayed + ")\n" + "Time Length: " + json.matches[9].game.playtime.patched + '\n' + "K/D/A: " + json.matches[9].game.kda.kda + '\n' + "K/D: " + json.matches[9].game.kda.kd + '\n' + "Headshots: " + json.matches[9].game.headshots + '\n' + "Headshot Percentage: " + json.matches[9].game.headshotspercentage + "%\n" + "Damage made: " + json.matches[9].game.damagemade + '\n' + "Damage received: " + json.matches[9].game.damagereceived + '\n' + "Econ rating: " + json.matches[9].game.econrating, true)
	statsEmbed1.setFooter("2/2 Requested By: " + message.author.username, message.author.avatarURL())
	statsEmbed1.setTimestamp()
	message.reply("Here are the last 10 Valorant matches for " + json.user);
	message.channel.send(statsEmbed);
	message.channel.send(statsEmbed1);
	
})();
	
}


}

module.exports.help = {
  name: "valstats"
}