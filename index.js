require('dotenv').config();
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs")
const bot = new Discord.Client ({disableEveryone: true});
let r6stats = require("./r6stats.json");
const invites = {};
bot.commands = new Discord.Collection();

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('shardDisconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

bot.on('shardReconnecting', () => console.log('I am reconnecting now!'));

fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("Couldn't find any commands...");
		return;
	}

	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} has loaded successfully!`)
		bot.commands.set(props.help.name, props);
	});

})



bot.on("ready", async () => {
	const activitylist = [
		"over Tomb",
		"over " + bot.guilds.cache.size + " guilds!",
		"over " + bot.users.cache.size + " users!"
	];
	console.log(`${bot.user.username} has successfully turned on properly! Aidan you didn't mess up the code this time!!! :D`);;
	bot.user.setPresence({ activity: { name: 'StartUp.exe' }, status: 'dnd' });

	setTimeout(() => {
		bot.guilds.cache.forEach(g => {
			g.fetchInvites().then(guildInvites => {
				invites[g.id] = guildInvites;
			});
		});
	}, 1000)
	setTimeout(() => {
		setInterval(() => {
			//bot.user.setActivity('over Tomb and ' + bot.guilds.cache.size + ' other guilds!', { type: 'WATCHING' });
			const index = Math.floor(Math.random() * (activitylist.length));
			bot.user.setPresence({ activity: { name: activitylist[index], type: 'WATCHING' }, status: 'online' });
        }, 15000)
    }, 20000)
	//bot.user.setActivity('Y6S1 OPERATION CRIMSON HEIST', {url: 'https://twitch.tv/TheItzAidan', type: 'STREAMING'});
});


bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))

	if(!prefixes[message.guild.id]){
			prefixes[message.guild.id] = {
			prefixes: botconfig.prefix
		};
	}

	let prefix = prefixes[message.guild.id].prefixes;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	if(cmd.slice(0,prefix.length)==prefix){
	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(bot,message,args);
	}
	
	if(cmd === `${prefix}ping`){
		const m = await message.channel.send("Ping?");
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
	}

	if(cmd === `<@!714884174359691265>`){
		const pingjpg = new Discord.MessageAttachment('./ping.jpg');
	await message.channel.send("Oi");
	await message.channel.send(pingjpg);
	}	
	
	if(cmd === `gn`){
		const gngif = new Discord.MessageAttachment('./gnblitz.gif');
	await message.channel.send("GN");
	await message.channel.send(gngif);
	}
	
	if (message.content === 'What is my avatar?') {
		const authorAvatar = message.author.avatarURL({ format: 'png', size: 256});
		return message.reply(authorAvatar);
	}
	  
	if (cmd === `${prefix}avatar`){
		const authorAvatar = message.author.avatarURL({ format: 'png', size: 256});
		return message.reply(authorAvatar);
	}
    
    if(cmd === `${prefix}say`) {
        message.delete();
        message.channel.send(args.join(" "));
    } 
	
	if(cmd === `wma`){
		const wmagif = new Discord.MessageAttachment('./wma.gif');
	await message.channel.send("When Windows Mouse Acceleration is on:");
	await message.channel.send(wmagif);
	}
	
	if(cmd === `${prefix}muteall`) {
		message.delete();
		let channel = message.member.voice.channel;
		for (let member of channel.members) {
			member[1].voice.setMute(true);
		}
	}
	 
	if(cmd === `${prefix}unmuteall`) {
		message.delete();
		let channel = message.member.voice.channel;
		for (let member of channel.members) {
			member[1].voice.setMute(false);
		}
	}
	
	if(cmd === `${prefix}membercount`) {
		//bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
		let mcembed = new Discord.MessageEmbed()
		 mcembed.setColor("#00FFFF")
		 mcembed.addField("Members", message.guild.memberCount, true)
		 mcembed.addField("Humans", message.guild.members.cache.filter(member => !member.user.bot).size, true)
		 mcembed.addField("Bots", message.guild.members.cache.filter(member => member.user.bot).size, true)
		 mcembed.setAuthor(message.guild.name, message.guild.iconURL())
		 mcembed.setTimestamp()
		return message.channel.send(mcembed);
	}
	
	if(cmd === `${prefix}nick`){
		if (message.author.id === '235532241403510795'){
			message.guild.me.setNickname(args[0]);
			message.delete()
			message.channel.send("My new nickname is: " + args[0]);
		} else {
			message.reply('only **GOD** himself can change MY NAME');
		}
	}
	
	 /*if(cmd === `=socialsedit`){
		 const msgID = "720106361639403522";
		 const tombemoji = bot.emojis.cache.find(emoji => emoji.name === "tomb");
		 const yt = bot.emojis.cache.find(emoji => emoji.name === "yt");
		 const twitter = bot.emojis.cache.find(emoji => emoji.name === "twitter");
		 const discord = bot.emojis.cache.find(emoji => emoji.name === "discord");
		 const ig = bot.emojis.cache.find(emoji => emoji.name === "ig");
		 const fb = bot.emojis.cache.find(emoji => emoji.name === "fb");
		 const reddit = bot.emojis.cache.find(emoji => emoji.name === "reddit");
		  let gysedit = message.channel.messages.fetch({around: msgID, limit: 1})
		 .then(message => {
		 const fetchMsg = message.first();
		 
	 fetchMsg.edit(`**${tombemoji} Official Tomb Clan Social Media Links: ${tombemoji}**\n\n${yt} **:** <https://www.youtube.com/channel/UCOkw8SF81Y-M2yXr7JeAz5w> \n${twitter} **:** <https://twitter.com/tombclan> \n${discord} **:** <https://discord.gg/TNMuqTD> \n${ig} **:** <https://instagram.com/tombclan> \n${fb} **:** <https://facebook.com/TombClan> \n${tiktok} **:** <https://tiktok.com/@tombnetwork> \n${reddit} **:** <https://reddit.com/r/TombNetwork>`);
	 })}*/
	
	
	 const msgID = "783486925222051886";
	 let gysembed = new Discord.MessageEmbed()
		 gysembed.setTitle("Get your Stats Here!")
		 gysembed.setColor("#00FFFF")
		 gysembed.addField("How to get your stats!", "For general stats type: **!r6 <username> <platform>**" + '\n\n' + "For operator stats type: **!r6op <username> <platform> <operator name>**" + '\n\n' + "For two top operators type: **!r6topops <username> <platform>**" + '\n\n' + "For seasonal ranked stats use the commands found in the message below." + '\n\n\n' + "<username> is a uplay/psn/xbox username" + '\n' + "<platform> is pc/xbox/ps4" + '\n' + "<operator name> is the name of an operator CaSe SeNsItIvE")
		 gysembed.addField("You can also get Halo Master Chief Collection stats!", "Type: **!halo <gamertag>**" + '\n\n' + "<gamertag> is your Xbox Gamertag. (which can include spaces)")
		 gysembed.addField("NEW GAME STATS AVAILABLE!", "For CS:GO type: **!csgo <steamid/communityurl>** *your steam account must be public for stats to work*\nFor VALORANT type: **!valstats <name#tagline>**")
		 gysembed.setFooter("Official Tomb Bot", bot.user.displayAvatarURL())
		 gysembed.setTimestamp()
		 
	 let gysrankedembed = new Discord.MessageEmbed()
		 gysrankedembed.setTitle("R6 Seasonal Codes")
		 gysrankedembed.setColor("#00FFFF")
		 gysrankedembed.addField("Year 6", "For Crimson Heist type: **!r6seasonal <username> <platform> crimson**")
		 gysrankedembed.addField("Year 5", "For Neon Dawn type: **!r6seasonal <username> <platform> neon** \n For Shadow Legacy type: **!r6seasonal <username> <platform> shadow** \n For Steel Wave type: **!r6seasonal <username> <platform> steel** \n For Void Edge type: **!r6seasonal <username> <platform> void**")
		 gysrankedembed.addField("Year 4", "For Shifting Tides type: **!r6seasonal <username> <platform> shifting** \n For Ember Rise type: **!r6seasonal <username> <platform> ember** \n For Phantom Sight type: **!r6seasonal <username> <platform> phantom** \n For Burnt Horizon type: **!r6seasonal <username> <platform> burnt**")
		 gysrankedembed.addField("Year 3", "For Wind Bastion type: **!r6seasonal <username> <platform> wind** \n For Grim Sky type: **!r6seasonal <username> <platform> grim** \n For Para Bellum type: **!r6seasonal <username> <platform> parabellum** \n For Chimera type: **!r6seasonal <username> <platform> chimera**")
		 gysrankedembed.addField("Year 2", "For White Noise type: **!r6seasonal <username> <platform> white** \n For Blood Orchid type: **!r6seasonal <username> <platform> blood** \n For Operation Health type: **!r6seasonal <username> <platform> health**")
		 gysrankedembed.addField('\u200b', '\u200b')
		 gysrankedembed.addField("Notes:", "• *Stats for Burnt Horizon and all previous do not show kills/deaths since Ubi's API doesn't have them it seems.* \n • *All stats before Operation Health are unavailable. Sorry About That!*")
		 gysrankedembed.setFooter("Official Tomb Bot", bot.user.displayAvatarURL())
		 gysrankedembed.setTimestamp()
	 if(cmd === `=gys`){
	 return message.channel.send(gysembed);
	 }
	 if(cmd ===`=gys2`){
	 return message.channel.send(gysrankedembed);
	 }
	 if(cmd === `gys2`){
		 let gysedit = message.channel.messages.fetch({around: msgID, limit: 1})
		 .then(message => {
			 const fetchMsg = message.first();
			 fetchMsg.edit(gysembed);
	 })}
	 
	 /*var iconURL = message.guild.iconURL();
	 
	 const msgID = "754810220806406285";
	 let gysembed = new Discord.MessageEmbed()
		 gysembed.setTitle("Strat Roulette Commands")
		 gysembed.setColor("#00FFFF")
		 gysembed.addField("Commands", "For a random strat type: **!strat <attack/defend> <bomb/secure/hostage>**" + '\n\n' + "For a 5 stack of random ops type: **!randomops <attack/defend>**")
		 gysembed.setFooter("Official Tomb Bot", iconURL)
	 if(cmd === `=strat`){
	 return message.channel.send(gysembed);
	 }
	 
	 if(cmd === `stratedit`){
		 let gysedit = message.channel.messages.fetch({around: msgID, limit: 1})
		 .then(message => {
			 const fetchMsg = message.first();
			 fetchMsg.edit(gysembed);
	 })}*/

	/*if(cmd === `=teagrolesedit`){
		 //const msgID = "720106361639403522";
		 const amongusemoji = bot.emojis.cache.find(emoji => emoji.name === "aured");
		  //let gysedit = message.channel.messages.fetch({around: msgID, limit: 1})
		 //.then(message => {
		 //const fetchMsg = message.first();
	
	 //fetchMsg.edit(`**${tombemoji} Official Tomb Clan Social Media Links: ${tombemoji}**\n\n${yt} **:** <https://www.youtube.com/channel/UCOkw8SF81Y-M2yXr7JeAz5w> \n${twitter} **:** <https://twitter.com/tombclan> \n${discord} **:** <https://discord.gg/TNMuqTD> \n${ig} **:** <https://instagram.com/tombclan> \n${fb} **:** <https://facebook.com/TombClan> \n${tiktok} **:** <https://tiktok.com/@tombnetwork> \n${reddit} **:** <https://reddit.com/r/TombNetwork>`);
	 //})
	 let teagrolesEmbed = new Discord.MessageEmbed()
			.setAuthor(message.guild.name + "'s Reaction Roles!", message.guild.iconURL())
			.setTitle("React to the message below to receive the associated role.")
			.setDescription("If you would like to remove the role, simply remove your reaction!")
			.setColor("C7FEE2")
			.addField(amongusemoji, "Ping for Among Us")
			.addField("🃏", "Ping for Cards Against Humanity")
			.addField("🌃", "Ping for Town of Salem")
			.addField("⛳", "Ping for Golf it")
			.addField("🖊️", "Ping for Scribbl.io")
			.setFooter("Official Tomb Bot", bot.user.displayAvatarURL())
	
		message.channel.send(teagrolesEmbed);
	 }*/

	if(cmd === `=tombrulesedit`){
	 //const msgID = "720106361639403522";
	 //const amongusemoji = bot.emojis.cache.find(emoji => emoji.name === "aured");
	  //let gysedit = message.channel.messages.fetch({around: msgID, limit: 1})
	 //.then(message => {
	 //const fetchMsg = message.first();

	let tombrules = new Discord.MessageEmbed()
		.setAuthor(message.guild.name + "'s Server Rules!", message.guild.iconURL())
		.setColor("00ffff")
		.setDescription("As normal to every server there are a couple rules. Although I don't feel that anyone in this server is gonna be a problem, it's still good to have them.")
		.addField("#1", "Follow the rules.")
		.addField("#2", "Play fair no cheats hacks or any other means of ruining the gaming experience for others.")
		.addField("#3", "Be fair to your fellow gamers, don't call them names or make fun of them they are just here to have fun and game with everyone else.")
		.addField("#4", "Encourage those around you to always improve whether they are better or worse. As a group challenging each other to do better will lead to infinite growth.")
		.addField("#5", "Have fun and make sure to use this channel as it is, a gaming channel. It's for the gaming fun of all in it  not a meme station or a joke train.")
		.setFooter("Official Tomb Bot", bot.user.displayAvatarURL())
		.setTimestamp()
	
	message.channel.send(tombrules);
 }
	
	let user = message.author
	
	if(cmd === `${prefix}r6link`){
		r6stats[message.author.id] = {
			username: `${message.author.tag}`,
			account: args[0],
			platform: args[1],
		}
		
		var string = JSON.stringify(r6stats, null, 4);
		
		fs.writeFile ("./r6stats.json", string, 'utf8', (err) => {
			if (err) {
				console.log(`Error writing file: ${err}`);
				message.reply('There was an error writing to the db, please contact <@235532241403510795>')
			} else {
				message.channel.send(`Your account ${args[0]}'s stats are now linked to *${prefix}r6linked*`).then(msg => {msg.delete({timeout: 30000})});
			}
			
		});
	}
	
	if(cmd === `${prefix}fub`){
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
			
				const dispatcher = connection.play('./fub.mp3');

				dispatcher.on('start', () => {
					message.channel.send("<a:kgMalding:819442521658753044> FUCK YOU BATTLEYE <a:kgMalding:819442521658753044>");
				});

				dispatcher.on('finish', () => {
					connection.disconnect();
				});

				dispatcher.on('error', console.error);
			
		} else if (!message.member.voice.channel) {
			message.reply("Cannot join a voice channel if you aren't in one silly.");
		}
	
	}

});

bot.setMaxListeners(17)
//RAINBOW VOICE CHANNELS
bot.on('voiceStateUpdate', (oldState, newState) => { //R6T1
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "R6 In-Game");

	if (newUserChannel === '681593685309259807') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '681593685309259807' && newUserChannel !== '681593685309259807') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //R6T2
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "R6 In-Game");

	if (newUserChannel === '681593753357910143') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '681593753357910143' && newUserChannel !== '681593753357910143') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //R6LIVE
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "R6 In-Game");

	if (newUserChannel === '814176439435001876') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '814176439435001876' && newUserChannel !== '814176439435001876') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //R6WR
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const textChannel = newState.guild.channels.cache.get('714577203060539403')

	if (newUserChannel === '710609618824462416') {
		wrmsg = textChannel.send(`<@&714576468906344491>, ${newState.member} has joined the waiting room!`)
	} else if (oldUserChannel === '710609618824462416' && newUserChannel !== '710609618824462416') {
		textChannel.messages.fetch({ limit: 1 }).then(collected => { collected.forEach(msg => { msg.delete() }) });
	}
})

//TARKOV VOICE CHANNELS
bot.on('voiceStateUpdate', (oldState, newState) => { //TART1
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "Tarkov/Squad In-Game");

	if (newUserChannel === '684477649938153472') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '684477649938153472' && newUserChannel !== '684477649938153472') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //TART2
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "Tarkov/Squad In-Game");

	if (newUserChannel === '684477676152815620') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '684477676152815620' && newUserChannel !== '684477676152815620') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //TARLIVE
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "Tarkov/Squad In-Game");

	if (newUserChannel === '814177005405995078') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '814177005405995078' && newUserChannel !== '814177005405995078') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //TARKOVWR
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const textChannel = newState.guild.channels.cache.get('740659925222686791')

	if (newUserChannel === '740661289013215436') {
		textChannel.send(`<@&740660152482529407>, ${newState.member} has joined the waiting room!`)
	} else if (oldUserChannel === '740661289013215436' && newUserChannel !== '740661289013215436') {
		textChannel.messages.fetch({ limit: 1 }).then(collected => { collected.forEach(msg => { msg.delete() }) });
	}
})

//VALORANT VOICE CHANNELS
bot.on('voiceStateUpdate', (oldState, newState) => { //VALOT1
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "Valorant In-Game");

	if (newUserChannel === '698592598134095873') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '698592598134095873' && newUserChannel !== '698592598134095873') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //VALOT2
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "Valorant In-Game");

	if (newUserChannel === '698592719362195666') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '698592719362195666' && newUserChannel !== '698592719362195666') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //VALOLIVE
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "Valorant In-Game");

	if (newUserChannel === '814176594821513237') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '814176594821513237' && newUserChannel !== '814176594821513237') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //VALORANTWR
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const textChannel = newState.guild.channels.cache.get('714905744494821417')

	if (newUserChannel === '710610147545841714') {
		textChannel.send(`<@&714576809735225457>, ${newState.member} has joined the waiting room!`)
	} else if (oldUserChannel === '710610147545841714' && newUserChannel !== '710610147545841714') {
		textChannel.messages.fetch({ limit: 1 }).then(collected => { collected.forEach(msg => { msg.delete() }) });
	}
})

//VALHEIM VOICE CHANNELS
bot.on('voiceStateUpdate', (oldState, newState) => { //VALHT1
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "Valheim In-Game");

	if (newUserChannel === '813309982962876436') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '813309982962876436' && newUserChannel !== '813309982962876436') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //VALH6T2
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "Valheim In-Game");

	if (newUserChannel === '813309999165997106') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '813309999165997106' && newUserChannel !== '813309999165997106') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //VALHLIVE
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const r6wrRole = newState.guild.roles.cache.find(role => role.name === "Valheim In-Game");

	if (newUserChannel === '814176541734862868') {
		newState.member.roles.add(r6wrRole);
	} else if (oldUserChannel === '814176541734862868' && newUserChannel !== '814176541734862868') {
		newState.member.roles.remove(r6wrRole);
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //VALHEIMWR
	const newUserChannel = newState.channelID
	const oldUserChannel = oldState.channelID
	const textChannel = newState.guild.channels.cache.get('813310764899237909')

	if (newUserChannel === '813310039166812171') {
		textChannel.send(`<@&813310616894308353>, ${newState.member} has joined the waiting room!`)
	} else if (oldUserChannel === '813310039166812171' && newUserChannel !== '813310039166812171') {
		textChannel.messages.fetch({ limit: 1 }).then(collected => { collected.forEach(msg => { msg.delete() }) });
	}
})

bot.on('guildMemberAdd', member => {
	let guestRole = member.guild.roles.cache.find(role => role.name === "Guest");
	const tombLogChannel = member.guild.channels.cache.get("832165005523681290");
	if (!guestRole) return;
	if (!tombLogChannel) return;

	member.guild.fetchInvites().then(guildInvites => {
		const ei = invites[member.guild.id];
		invites[member.guild.id] = guildInvites;
		const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
		const inviter = bot.users.cache.get(invite.inviter.id);

		let newUserEmbed = new Discord.MessageEmbed()
			.setAuthor(member.user.tag + " (" + member.user.id + ") has joined the server!", member.user.avatarURL())
			.setThumbnail(member.user.avatarURL())
			.setDescription(`<@${member.user.id}>`)
			.setColor("#00ff00")
			.addField("Total Users:", member.guild.memberCount, true)
			.addField("Account created on:", member.user.createdAt, true)
			.addField("Invite Link: https://discord.gg/" + invite.code + " (Uses: " + invite.uses + ")", "Invited by: " + inviter.tag, true)
			.setFooter("User ID: " + member.user.id)
			.setTimestamp()
		member.roles.add(guestRole, "New Member Joined Adding Guest Role")
		tombLogChannel.send(newUserEmbed);
	});
});

bot.on('guildMemberRemove', member => {
	const tombLogChannel = member.guild.channels.cache.get("832165005523681290");
	if (!tombLogChannel) return;
	let newUserEmbed = new Discord.MessageEmbed()
		.setAuthor(member.user.tag + " (" + member.user.id + ") has left the server!", member.user.avatarURL())
		.setThumbnail(member.user.avatarURL())
		.setDescription(`<@${member.user.id}>`)
		.setColor("#ff0000")
		.addField("Total Users:", member.guild.memberCount)
		.setFooter("User ID: " + member.user.id)
		.setTimestamp()
	tombLogChannel.send(newUserEmbed);
});

bot.login(process.env.BOT_TOKEN);