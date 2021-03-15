const Discord = require("discord.js");
const api = "https://fortnite-api.com/v1/stats/br/v2/?name=";
const fetch = require('node-fetch');

//import { playtime } from '../utilities'

module.exports.run = async (bot, message, args) => {

	let seasonal = "&timeWindow=" + args[2];
	let platform = args[1];
	let name = args[0];
	let seasonlife;

	if (!args[2]) {
		seasonlife = ""
	} else {
		seasonlife = seasonal;
    }
	if (!name || !platform)
		return message.channel.send("The Correct Format is `!fortnite <username> <epic/xbl/psn> [season/lifetime]`");

	message.reply("Fetching Stats, this may take a while.").then(message => { message.delete({ timeout: 30000 }) });

	(async () => {
		const body = { a: 1 };

		const response = await fetch(api + name + "&accountType=" + platform + seasonlife, {
			method: 'get',
			headers: { 'Authorization': 'Bearer 68d70066-a215-4e7c-85e7-63a5c1e67137' }
		});

		const json = await response.json();

		if (json.status === 404) {
			return message.reply("User not found. Make sure the name is correct and you chose the right platform");
		} else if (json.status === 500) {
			return message.reply("User not found. Make sure the name is correct and you chose the right platform");
		}

			 console.log(json);
		//console.log(status);

		//overall playtime
		let oplaytime = json.data.stats.all.overall.minutesPlayed;
		var ohours = Math.floor(oplaytime / 60);
		var ominutes = oplaytime % 60;
		var overallFormatPlaytime = ohours + ' hours, ' + ominutes + ' minutes';
		//solo playtime
		let splaytime = json.data.stats.all.solo.minutesPlayed;
		var shours = Math.floor(splaytime / 60);
		var sminutes = splaytime % 60;
		var soloFormatPlaytime = shours + ' hours, ' + sminutes + ' minutes';
		//duo playtime
		let dplaytime = json.data.stats.all.duo.minutesPlayed;
		var dhours = Math.floor(dplaytime / 60);
		var dminutes = dplaytime % 60;
		var duoFormatPlaytime = dhours + ' hours, ' + dminutes + ' minutes';
		//trio playtime
		let tplaytime = json.data.stats.all.trio.minutesPlayed;
		var thours = Math.floor(tplaytime / 60);
		var tminutes = tplaytime % 60;
		var trioFormatPlaytime = thours + ' hours, ' + tminutes + ' minutes';
		//squad playtime
		let qplaytime = json.data.stats.all.squad.minutesPlayed;
		var qhours = Math.floor(qplaytime / 60);
		var qminutes = qplaytime % 60;
		var squadFormatPlaytime = qhours + ' hours, ' + qminutes + ' minutes';
		//ltm playtime
		let lplaytime = json.data.stats.all.ltm.minutesPlayed;
		var lhours = Math.floor(lplaytime / 60);
		var lminutes = lplaytime % 60;
		var ltmFormatPlaytime = lhours + ' hours, ' + lminutes + ' minutes';

		//overall
		var overallLosses = Math.floor(json.data.stats.all.overall.matches - json.data.stats.all.overall.wins);
		var overallWinrate = Math.floor(json.data.stats.all.overall.wins / json.data.stats.all.overall.matches);
		var overallKD = json.data.stats.all.overall.kills / json.data.stats.all.overall.deaths
		var overallKDRound = overallKD.toFixed(4);
		//solo
		var soloLosses = Math.floor(json.data.stats.all.solo.matches - json.data.stats.all.solo.wins);
		var soloWinrate = Math.floor(json.data.stats.all.solo.wins / json.data.stats.all.solo.matches);
		var soloKD = json.data.stats.all.solo.kills / json.data.stats.all.solo.deaths
		var soloKDRound = soloKD.toFixed(4);
		//duo
		var duoLosses = Math.floor(json.data.stats.all.duo.matches - json.data.stats.all.duo.wins);
		var duoWinrate = Math.floor(json.data.stats.all.duo.wins / json.data.stats.all.duo.matches);
		var duoKD = json.data.stats.all.duo.kills / json.data.stats.all.duo.deaths
		var duoKDRound = duoKD.toFixed(4);
		//trio
		var trioLosses = Math.floor(json.data.stats.all.trio.matches - json.data.stats.all.trio.wins);
		var trioWinrate = Math.floor(json.data.stats.all.trio.wins / json.data.stats.all.trio.matches);
		var trioKD = json.data.stats.all.trio.kills / json.data.stats.all.trio.deaths
		var trioKDRound = trioKD.toFixed(4);
		//squad
		var squadLosses = Math.floor(json.data.stats.all.squad.matches - json.data.stats.all.squad.wins);
		var squadWinrate = Math.floor(json.data.stats.all.squad.wins / json.data.stats.all.squad.matches);
		var squadKD = json.data.stats.all.squad.kills / json.data.stats.all.squad.deaths
		var squadKDRound = squadKD.toFixed(4);
		//ltm
		var ltmLosses = Math.floor(json.data.stats.all.ltm.matches - json.data.stats.all.ltm.wins);
		var ltmWinrate = Math.floor(json.data.stats.all.ltm.wins / json.data.stats.all.ltm.matches);
		var ltmKD = json.data.stats.all.ltm.kills / json.data.stats.all.ltm.deaths
		var ltmKDRound = ltmKD.toFixed(4);


		let statsEmbed = new Discord.MessageEmbed()
		statsEmbed.setTitle(json.data.account.name + "'s Fortnite Stats")
		statsEmbed.setURL("https://fortnitetracker.com/profile/all/" + json.data.account.name)
		statsEmbed.setThumbnail("https://i.pinimg.com/originals/e1/71/09/e171098d2797260e90e1b170063c079e.png")
		statsEmbed.setColor("#00FFFF")
		statsEmbed.addField("About", "Platform: " + args[1] + '\n' + "Level: " + json.data.battlePass.level + '\n' + "Percent through level: " + json.data.battlePass.progress + "%" + '\n' + "Overall Playtime: " + overallFormatPlaytime, true)
		statsEmbed.addField('\u200b', '\u200b')
		statsEmbed.addField("Overall", "Kills: " + json.data.stats.all.overall.kills + '\n' + "Deaths: " + json.data.stats.all.overall.deaths + '\n' + "K/D: " + overallKDRound + '\n' + "Players Outlived: " + json.data.stats.all.overall.playersOutlived + '\n' + "Score: " + json.data.stats.all.overall.score + '\n' + "Matches: " + json.data.stats.all.overall.matches + '\n' + "Wins: " + json.data.stats.all.overall.wins + '\n' + "Losses: " + overallLosses + '\n' + "Winrate: " + overallWinrate, true)
		statsEmbed.addField("Solos", "Kills: " + json.data.stats.all.solo.kills + '\n' + "Deaths: " + json.data.stats.all.solo.deaths + '\n' + "K/D: " + soloKDRound + '\n' + "Players Outlived: " + json.data.stats.all.solo.playersOutlived + '\n' + "Score: " + json.data.stats.all.solo.score + '\n' + "Matches: " + json.data.stats.all.solo.matches + '\n' + "Wins: " + json.data.stats.all.solo.wins + '\n' + "Losses: " + soloLosses + '\n' + "Winrate: " + soloWinrate + '\n' + "Solo Playtime: " + soloFormatPlaytime + '\n' + "Top 10's: " + json.data.stats.all.solo.top10 + '\n' + "Top 25's: " + json.data.stats.all.solo.top25, true)
		statsEmbed.addField("Duos", "Kills: " + json.data.stats.all.duo.kills + '\n' + "Deaths: " + json.data.stats.all.duo.deaths + '\n' + "K/D: " + duoKDRound + '\n' + "Players Outlived: " + json.data.stats.all.duo.playersOutlived + '\n' + "Score: " + json.data.stats.all.duo.score + '\n' + "Matches: " + json.data.stats.all.duo.matches + '\n' + "Wins: " + json.data.stats.all.duo.wins + '\n' + "Losses: " + duoLosses + '\n' + "Winrate: " + duoWinrate + '\n' + "Duo Playtime: " + duoFormatPlaytime + '\n' + "Top 5's: " + json.data.stats.all.duo.top5 + '\n' + "Top 12's: " + json.data.stats.all.duo.top12, true)
		statsEmbed.addField("Trios", "Kills: " + json.data.stats.all.trio.kills + '\n' + "Deaths: " + json.data.stats.all.trio.deaths + '\n' + "K/D: " + trioKDRound + '\n' + "Players Outlived: " + json.data.stats.all.trio.playersOutlived + '\n' + "Score: " + json.data.stats.all.trio.score + '\n' + "Matches: " + json.data.stats.all.trio.matches + '\n' + "Wins: " + json.data.stats.all.trio.wins + '\n' + "Losses: " + trioLosses + '\n' + "Winrate: " + trioWinrate + '\n' + "Trio Playtime: " + trioFormatPlaytime + '\n' + "Top 3's: " + json.data.stats.all.trio.top3 + '\n' + "Top 6's: " + json.data.stats.all.trio.top6, true)
		statsEmbed.addField("Squads", "Kills: " + json.data.stats.all.squad.kills + '\n' + "Deaths: " + json.data.stats.all.squad.deaths + '\n' + "K/D: " + squadKDRound + '\n' + "Players Outlived: " + json.data.stats.all.squad.playersOutlived + '\n' + "Score: " + json.data.stats.all.squad.score + '\n' + "Matches: " + json.data.stats.all.squad.matches + '\n' + "Wins: " + json.data.stats.all.squad.wins + '\n' + "Losses: " + squadLosses + '\n' + "Winrate: " + squadWinrate + '\n' + "Squad Playtime: " + squadFormatPlaytime + '\n' + "Top 3's: " + json.data.stats.all.squad.top3 + '\n' + "Top 6's: " + json.data.stats.all.squad.top6, true)
		statsEmbed.addField("LTMs", "Kills: " + json.data.stats.all.ltm.kills + '\n' + "Deaths: " + json.data.stats.all.ltm.deaths + '\n' + "K/D: " + ltmKDRound + '\n' + "Players Outlived: " + json.data.stats.all.ltm.playersOutlived + '\n' + "Score: " + json.data.stats.all.ltm.score + '\n' + "Matches: " + json.data.stats.all.ltm.matches + '\n' + "Wins: " + json.data.stats.all.ltm.wins + '\n' + "Losses: " + ltmLosses + '\n' + "Winrate: " + ltmWinrate + '\n', true)
		statsEmbed.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
		statsEmbed.setTimestamp()
		message.reply("Here is the stats for " + json.data.account.name);
		message.channel.send(statsEmbed);
	})();

}

module.exports.help = {
	name: "fortnite"
}
