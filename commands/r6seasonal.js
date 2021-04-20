const Discord = require("discord.js");
const api = "https://api2.r6stats.com/public-api/stats/";
const api2 = "https://api.statsdb.net/r6/";
const fetch = require('node-fetch');
const btoa = require('btoa');
let statsDBToken = btoa(process.env.STATSDB_ID + ":" + process.env.STATSDB_PW);

//import { playtime } from '../utilities'

module.exports.run = async (bot, message, args) => {

	let season = args[2];
	let platform = args[1];
	let name = args[0];

	if (!name || !platform || !season)
		return message.channel.send("The Correct Format is `!r6seasonal <username> <platform> <season>`");

	if (season != "crimson" && season != "neon" && season != "shadow" && season != "steel" && season != "void" && season != "shifting" && season != "ember" && season != "phantom" && season != "burnt" && season != "wind" && season != "grim" && season != "para" && season != "chimera" && season != "white" && season != "blood" && season != "health") {
		return message.reply("The Current Season Codes available are: ```* crimson\n* neon\n* shadow\n* steel\n* void\n* shifting\n* ember\n* phantom\n* burnt\n* wind\n* grim\n* parabellum\n* chimera\n* white\n* blood\n* health\n\n(Note: All codes are CaSe SeNsItIvE)```")
    }
	message.reply("Fetching Stats, this may take a while.").then(message => { message.delete({ timeout: 30000 }) });
	//message.delete({timeout:30000});
	//message.reply("`Operation Crimson Heist ranked stats are currently unavailable. They will be up soon!`\n\nCheck https://discord.com/channels/681590186320199716/783463368534523954/783486932775731240 for the Ranked Stats Commands.").then(message => {message.delete({timeout:30000})});

	(async () => {
		const body = { a: 1 };

		const response = await fetch(api + name + "/" + platform + "/seasonal", {
			method: 'get',
			headers: { 'Authorization': 'Bearer ' + process.env.R6API_KEY }
		});
		const json = await response.json();

		/*const response1 = await fetch(api2 + platform + "/player/" + name, {
			method: 'get',
			headers: { 'Authorization': 'Basic ' + statsDBToken }
		});
		const json1 = await response1.json();

		if (json1.code === 401) {
			message.reply("**ERROR** Something has gone wrong and we are unauthorized from the API.\n I have contacted <@235532241403510795>. We should be fixed soon!")
			let aidan = bot.users.cache.get('235532241403510795')
			return aidan.send("I have experienced an error **" + json1.code + "** '" + json1.message + "' in server " + message.guild.name + ".")
		} else if (json1.code === 429) {
			let rateLimitReset = response1.headers.get("X-Rate-Limit-Reset");
			let currentTime = new Date().getTime() / 1000;
			let timeTilReset = rateLimitReset - currentTime;
			let timeTilResetHrs = timeTilReset / 3600;
			message.reply("**ERROR** We have been rate-limited.\nI have contacted <@235532241403510795> to make see about getting our rate-limit raised!\n\nIn the mean time check back in " + timeTilResetHrs.toFixed(2) + " hours and our rate-limit should be reset if not extended by then.")
			let aidan = bot.users.cache.get('235532241403510795')
			return aidan.send("I have experienced an error **" + json1.code + "** '" + json1.message + "' in server " + message.guild.name + ". Rate-limit exceeded contact StatsDB support to get it upped or wait " + timeTilResetHrs.toFixed(2) + " hours if lazy.")
		} else if (json1.code === 404) {
			return message.reply("User not found. Make sure the name is correct and you chose the right platform");
        }*/

		if (season === "crimson") {
			seasonStat = json.seasons.crimson_heist.regions.ncsa[0];
			//casStat = json1.payload.stats.seasonal.casual;
			seasonName = "Crimson Heist";
			seasonColour = "#8C0000";
			curfinRank = "Current Rank: ";
			curfinMMR = "Current MMR: ";
		} else if (season === "neon") {
			seasonStat = json.seasons.neon_dawn.regions.ncsa[0];
			seasonName = "Neon Dawn";
			seasonColour = "#D14007";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "shadow") {
			seasonStat = json.seasons.shadow_legacy.regions.ncsa[0];
			seasonName = "Shadow Legacy";
			seasonColour = "#6CA511";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "steel") {
			seasonStat = json.seasons.steel_wave.regions.ncsa[0];
			seasonName = "Steel Wave";
			seasonColour = "#2B7F9B";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "void") {
			seasonStat = json.seasons.void_edge.regions.ncsa[0];
			seasonName = "Void Edge";
			seasonColour = "#946A97";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "shifting") {
			seasonStat = json.seasons.shifting_tides.regions.ncsa[0];
			seasonName = "Shifting Tides"
			seasonColour = "#089EB3";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "ember") {
			seasonStat = json.seasons.ember_rise.regions.ncsa[0];
			seasonName = "Ember Rise";
			seasonColour = "#156309";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "phantom") {
			seasonStat = json.seasons.phantom_sight.regions.ncsa[0];
			seasonName = "Phantom Sight";
			seasonColour = "#304395";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "burnt") {
			seasonStat = json.seasons.burnt_horizon.regions.ncsa[0];
			seasonName = "Burnt Horizon";
			seasonColour = "#D2005A";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "wind") {
			seasonStat = json.seasons.wind_bastion.regions.ncsa[0];
			seasonName = "Wind Bastion";
			seasonColour = "#AA854F";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "grim") {
			seasonStat = json.seasons.grim_sky.regions.ncsa[0];
			seasonName = "Grim Sky";
			seasonColour = "#81A0C1";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "parabellum") {
			seasonStat = json.seasons.para_bellum.regions.ncsa[0];
			seasonName = "Para Bellum";
			seasonColour = "#949F39";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "chimera") {
			seasonStat = json.seasons.chimera.regions.ncsa[0];
			seasonName = "Chimera";
			seasonColour = "#FFC113";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "white") {
			seasonStat = json.seasons.white_noise.regions.ncsa[0];
			seasonName = "White Noise";
			seasonColour = "#FFFFFF";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "blood") {
			seasonStat = json.seasons.blood_orchid.regions.ncsa[0];
			seasonName = "Blood Orchid";
			seasonColour = "#CA361C";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else if (season === "health") {
			seasonStat = json.seasons.health.regions.ncsa[0];
			seasonName = "Health"
			seasonColour = "#4A74A9";
			curfinRank = "Final Rank: ";
			curfinMMR = "Final MMR: ";
		} else seasonStat = season;

		//RANKED
		var gamesPlayed = Math.floor(seasonStat.wins + seasonStat.losses);
		var kd = seasonStat.kills / seasonStat.deaths;
		var wl = seasonStat.wins / seasonStat.losses;
		var kdrounded = kd.toFixed(4);
		var wlrounded = wl.toFixed(4);
		var mmrNeeded = Math.floor(seasonStat.next_rank_mmr - seasonStat.mmr);
		var champrankPos = " "

		//CASUAL

		/*var casGamesPlayed = Math.floor(casStat.wins + casStat.losses);
		var casKD = casStat.kills / casStat.deaths;
		var casWL = casStat.wins / casStat.losses;
		var casKDRounded = casKD.toFixed(4);
		var casWLRounded = casWL.toFixed(4);
		var casRank;
		let casRankImage;

		if (casStat.mmr <= 1199) {
			casRank = "Copper V <:Copper5:832878160684122122>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839913864921219/copper-5.png";
		} else if (casStat.mmr >= 1200 && casStat.mmr <= 1299) {
			casRank = "Copper IV <:Copper4:832878160336125984>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839912849768518/copper-4.png";
		} else if (casStat.mmr >= 1300 && casStat.mmr <= 1399) {
			casRank = "Copper III <:Copper3:832878160336125985>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717840004348641420/copper-3.png";
		} else if (casStat.mmr >= 1400 && casStat.mmr <= 1499) {
			casRank = "Copper II <:Copper2:832878160763813918>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717840000439549952/copper-2.png";
		} else if (casStat.mmr >= 1500 && casStat.mmr <= 1599) {
			casRank = "Copper I <:Copper1:832878160622256128>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839995741798490/copper-1.png";
		} else if (casStat.mmr >= 1600 && casStat.mmr <= 1699) {
			casRank = "Bronze V <:Bronze5:832878160600629288>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839986048761947/bronze-5.png";
		} else if (casStat.mmr >= 1700 && casStat.mmr <= 1799) {
			casRank = "Bronze IV <:Bronze4:832878160239919112>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839981757857862/bronze-4.png";
		} else if (casStat.mmr >= 1800 && casStat.mmr <= 1899) {
			casRank = "Bronze III <:Bronze3:832878160546758716>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839977303638061/bronze-3.png";
		} else if (casStat.mmr >= 1900 && casStat.mmr <= 1999) {
			casRank = "Bronze II <:Bronze2:832878160491839488>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839972115415131/bronze-2.png";
		} else if (casStat.mmr >= 2000 && casStat.mmr <= 2099) {
			casRank = "Bronze I <:Bronze1:832878160173072446>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839967912722452/bronze-1.png";
		} else if (casStat.mmr >= 2100 && casStat.mmr <= 2199) {
			casRank = "Silver V <:Silver5:832878160848224276>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717841732829446265/silver-5.png";
		} else if (casStat.mmr >= 2200 && casStat.mmr <= 2299) {
			casRank = "Silver IV <:Silver4:832878160848224277>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717841731483205732/silver-4.png";
		} else if (casStat.mmr >= 2300 && casStat.mmr <= 2399) {
			casRank = "Silver III <:Silver3:832878160869326858>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839957619900426/silver-3.png";
		} else if (casStat.mmr >= 2400 && casStat.mmr <= 2499) {
			casRank = "Silver II <:Silver2:832878160827645972>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717841736625422449/silver-2.png";
		} else if (casStat.mmr >= 2500 && casStat.mmr <= 2599) {
			casRank = "Silver I <:Silver1:832878160990437386>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839925659041912/silver-1.png";
		} else if (casStat.mmr >= 2600 && casStat.mmr <= 2799) {
			casRank = "Gold III <:Gold3:832878160684122123>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839920290332744/gold-3.png";
		} else if (casStat.mmr >= 2800 && casStat.mmr <= 2999) {
			casRank = "Gold II <:Gold2:832878160533389323>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839919397077002/gold-2.png";
		} else if (casStat.mmr >= 3000 && casStat.mmr <= 3199) {
			casRank = "Gold I <:Gold1:832878160780460073>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839918134591608/gold-1.png";
		} else if (casStat.mmr >= 3200 && casStat.mmr <= 3599) {
			casRank = "Platinum III <:Platinum3:832878160763813919>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839926217146419/platinum-3.png";
		} else if (casStat.mmr >= 3600 && casStat.mmr <= 3999) {
			casRank = "Platinum II <:Platinum2:832878161061609494>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839923176276029/platinum-2.png";
		} else if (casStat.mmr >= 4000 && casStat.mmr <= 4399) {
			casRank = "Platinum I <:Platinum1:832878161062526996>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839921624121404/platinum-1.png";
		} else if (casStat.mmr >= 4400 && casStat.mmr <= 4999) {
			casRank = "Diamond <:Diamond:832878160616882187>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839917031358564/diamond.png";
		} else if (casStat.mmr >= 5000) {
			casRank = "Champion <:Champion:832878160554622986>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839990733668372/champion.png";
		} else {
			casRank = "Unranked <:Unranked:832878160684122124>";
			casRankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717845532516810812/unranked.png";
		}*/

		let isrank = seasonStat;
		if (isrank.rank_text === "Champions") {
			champrankPos = "Champion Rank Position: " + seasonStat.champions_rank_position
		}

		if (isrank) {
			let rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717845532516810812/unranked.png";
			if (isrank.rank_text === "Copper V") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839913864921219/copper-5.png";
			} else if (isrank.rank_text === "Copper IV") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839912849768518/copper-4.png";
			} else if (isrank.rank_text === "Copper III") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717840004348641420/copper-3.png";
			} else if (isrank.rank_text === "Copper II") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717840000439549952/copper-2.png";
			} else if (isrank.rank_text === "Copper I") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839995741798490/copper-1.png";
			} else if (isrank.rank_text === "Bronze V") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839986048761947/bronze-5.png";
			} else if (isrank.rank_text === "Bronze IV") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839981757857862/bronze-4.png";
			} else if (isrank.rank_text === "Bronze III") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839977303638061/bronze-3.png";
			} else if (isrank.rank_text === "Bronze II") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839972115415131/bronze-2.png";
			} else if (isrank.rank_text === "Bronze I") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839967912722452/bronze-1.png";
			} else if (isrank.rank_text === "Silver V") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717841732829446265/silver-5.png";
			} else if (isrank.rank_text === "Silver IV") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717841731483205732/silver-4.png";
			} else if (isrank.rank_text === "Silver III") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839957619900426/silver-3.png";
			} else if (isrank.rank_text === "Silver II") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717841736625422449/silver-2.png";
			} else if (isrank.rank_text === "Silver I") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839925659041912/silver-1.png";
			} else if (isrank.rank_text === "Gold III") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839920290332744/gold-3.png";
			} else if (isrank.rank_text === "Gold II") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839919397077002/gold-2.png";
			} else if (isrank.rank_text === "Gold I") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839918134591608/gold-1.png";
			} else if (isrank.rank_text === "Platinum III") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839926217146419/platinum-3.png";
			} else if (isrank.rank_text === "Platinum II") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839923176276029/platinum-2.png";
			} else if (isrank.rank_text === "Platinum I") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839921624121404/platinum-1.png";
			} else if (isrank.rank_text === "Diamond") {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717839917031358564/diamond.png";
			} else if (isrank.rank_text === "Champions") {
				rankImage = "https://champoser.r6stats.com/champions/rank/" + seasonStat.champions_rank_position + ".png";
			}
			else {
				rankImage = "https://cdn.discordapp.com/attachments/717839884961841213/717845532516810812/unranked.png";
			}

			let rankstatsEmbed = new Discord.MessageEmbed()
			rankstatsEmbed.setAuthor(json.username + `'s R6 ${seasonName} Seasonal Stats`, json.avatar_url_256)
			rankstatsEmbed.setThumbnail(rankImage)
			rankstatsEmbed.setTitle("View full stats for " + json.username + ".")
			rankstatsEmbed.setURL("https://r6stats.com/stats/" + json.ubisoft_id)
			rankstatsEmbed.setColor(seasonColour)
			rankstatsEmbed.addField("Ranked Game Stats", "Kills: " + seasonStat.kills + '\n' + "Deaths: " + seasonStat.deaths + '\n' + "K/D: " + kdrounded + '\n' + "Wins: " + seasonStat.wins + '\n' + "Losses: " + seasonStat.losses + '\n' + "W/L: " + wlrounded + '\n' + "Games Played: " + gamesPlayed + '\n' + "Games Abandoned: " + seasonStat.abandons, true)
			rankstatsEmbed.addField("Rank", curfinRank + seasonStat.rank_text + '\n' + "Highest Rank: " + seasonStat.max_rank_text + '\n' + curfinMMR + seasonStat.mmr + '\n' + "Last MMR Change: " + seasonStat.last_match_mmr_change + '\n' + "MMR required for next Rank: " + seasonStat.next_rank_mmr + '\n' + "MMR amount needed for next Rank: " + mmrNeeded + '\n' + champrankPos, true)
			//rankstatsEmbed.addField('\u200b', '\u200b')
			//rankstatsEmbed.addField("Casual Game Stats", "Kills: " + casStat.kills + '\n' + "Deaths: " + casStat.deaths + '\n' + "K/D: " + casKDRounded + '\n' + "Wins: " + casStat.wins + '\n' + "Losses: " + casStat.losses + '\n' + "W/L: " + casWLRounded + '\n' + "Games Played: " + casGamesPlayed + '\n' + "Games Abandoned: " + casStat.abandons, true)
			//rankstatsEmbed.addField("Rank", curfinRank + casRank + '\n' + curfinMMR + casStat.mmr + '\n' + "Last MMR Change: " + casStat.last_match_mmr_change, true)
			rankstatsEmbed.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
			rankstatsEmbed.setTimestamp()
			message.reply(`Here is the Operation ${seasonName} seasonal stats for ` + json.username);
			message.channel.send(rankstatsEmbed);
		}
	})();

}

module.exports.help = {
	name: "r6seasonal"
}
