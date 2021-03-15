require('dotenv').config();
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs")
const bot = new Discord.Client ({disableEveryone: true});
let r6stats = require("./r6stats.json");
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
	console.log(`${bot.user.username} has successfully turned on properly! Aidan you didn't mess up the code this time!!! :D`);
	bot.user.setActivity('over Tomb', {type: 'WATCHING' });
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
		  let gysedit = message.channel.messages.fetch({around: msgID, limit: 1})
		 .then(message => {
		 const fetchMsg = message.first();
		 
	 fetchMsg.edit(`**${tombemoji} Official Tomb Clan Social Media Links: ${tombemoji}**\n\n${yt} **:** <https://www.youtube.com/channel/UCOkw8SF81Y-M2yXr7JeAz5w> \n${twitter} **:** <https://twitter.com/tombclan> \n${discord} **:** <https://discord.gg/TNMuqTD> \n${ig} **:** <https://instagram.com/tombclan> \n${fb} **:** <https://facebook.com/TombClan>`);
	 })}*/
	
	
	 /*const msgID = "783486925222051886";
	 let gysembed = new Discord.MessageEmbed()
		 gysembed.setTitle("Get your Stats Here!")
		 gysembed.setColor("#00FFFF")
		 gysembed.addField("How to get your stats!", "For general stats type: **!r6 <username> <platform>**" + '\n\n' + "For operator stats type: **!r6op <username> <platform> <operator name>**" + '\n\n' + "For two top operators type: **!r6topops <username> <platform>**" + '\n\n' + "For seasonal ranked stats use the commands found in the message below." + '\n\n\n' + "<username is a uplay/psn/xbox username>" + '\n' + "<platform is pc/xbox/ps4>" + '\n' + "<operator name is the name of an operator CaSe SeNsItIvE>")
		 gysembed.addField("You can also get Halo Master Chief Collection stats!", "Type: **!halo <gamertag>**" + '\n\n' + "<gamertag> is your Xbox Gamertag. (which can include spaces)")
		 gysembed.addField("NEW GAME STATS AVAILABLE!", "For CS:GO type: **!csgo <steamid/communityurl>** *your steam account must be public for stats to work*\nFor VALORANT type: **!valstats <name#tagline>**")
		 gysembed.setFooter("Official Tomb Bot", message.guild.iconURL())
		 gysembed.setTimestamp()
		 
	 let gysrankedembed = new Discord.MessageEmbed()
		 gysrankedembed.setTitle("R6 Ranked Commands")
		 gysrankedembed.setColor("#00FFFF")
		 gysrankedembed.addField("Year 5", "For Neon Dawn type: **!r6ranked <username> <platform>** \n For Shadow Legacy type: **!r6rankedshadow <username> <platform>** \n For Steel Wave type: **!r6rankedsteel <username> <platform>** \n For Void Edge type: **!r6rankedvoid <username> <platform>**")
		 gysrankedembed.addField("Year 4", "For Shifting Tides type: **!r6rankedshifting <username> <platform>** \n For Ember Rise type: **!r6rankedember <username> <platform>** \n For Phantom Sight type: **!r6rankedphantom <username> <platform>** \n For Burnt Horizon type: **!r6rankedburnt <username> <platform>**")
		 gysrankedembed.addField("Year 3", "For Wind Bastion type: **!r6rankedwind <username> <platform>** \n For Grim Sky type: **!r6rankedgrim <username> <platform>** \n For Para Bellum type: **!r6rankedpara <username> <platform>** \n For Chimera type: **!r6rankedchimera <username> <platform>**")
		 gysrankedembed.addField("Year 2", "For White Noise type: **!r6rankedwhite <username> <platform>** \n For Blood Orchid type: **!r6rankedblood <username> <platform>** \n For Operation Health type: **!r6rankedhealth <username> <platform>**")
		 gysrankedembed.addField('\u200b', '\u200b')
		 gysrankedembed.addField("Notes:", "• *Stats for Burnt Horizon and all previous do not show kills/deaths since Ubi's API doesn't have them it seems.* \n • *All stats before Operation Health are unavailable. Sorry About That!*")
		 gysrankedembed.setFooter("Official Tomb Bot", message.guild.iconURL())
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
	 })}*/
	 
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

bot.on('voiceStateUpdate', (oldState, newState) => { //R6
  const newUserChannel = newState.channelID
  const oldUserChannel = oldState.channelID
  const textChannel = newState.guild.channels.cache.get('714577203060539403')
	
  if(newUserChannel === '710609618824462416') {
	wrmsg = textChannel.send(`<@&714576468906344491>, ${newState.member} has joined the waiting room!`)
	} else if (oldUserChannel === '710609618824462416' && newUserChannel !== '710609618824462416') {
		textChannel.messages.fetch({ limit: 1}).then(collected => {collected.forEach(msg => {msg.delete()})});
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //VALHEIM
  const newUserChannel = newState.channelID
  const oldUserChannel = oldState.channelID
  const textChannel = newState.guild.channels.cache.get('813310764899237909')

  if(newUserChannel === '813310039166812171') {
    textChannel.send(`<@&813310616894308353>, ${newState.member} has joined the waiting room!`)
  } else if (oldUserChannel === '813310039166812171' && newUserChannel !== '813310039166812171') {
		textChannel.messages.fetch({ limit: 1}).then(collected => {collected.forEach(msg => {msg.delete()})});
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //VALORANT
  const newUserChannel = newState.channelID
  const oldUserChannel = oldState.channelID
  const textChannel = newState.guild.channels.cache.get('714905744494821417')

  if(newUserChannel === '710610147545841714') {
    textChannel.send(`<@&714576809735225457>, ${newState.member} has joined the waiting room!`)
  } else if (oldUserChannel === '710609618824462416' && newUserChannel !== '710609618824462416') {
		textChannel.messages.fetch({ limit: 1}).then(collected => {collected.forEach(msg => {msg.delete()})});
	}
})

bot.on('voiceStateUpdate', (oldState, newState) => { //HALO
  const newUserChannel = newState.channelID
  const oldUserChannel = oldState.channelID
  const textChannel = newState.guild.channels.cache.get('740659925222686791')

  if(newUserChannel === '740661289013215436') {
    textChannel.send(`<@&740660152482529407>, ${newState.member} has joined the waiting room!`)
  } else if (oldUserChannel === '710609618824462416' && newUserChannel !== '710609618824462416') {
		textChannel.messages.fetch({ limit: 1}).then(collected => {collected.forEach(msg => {msg.delete()})});
	}
})

bot.on('guildMemberAdd', member => {
  let guestRole = member.guild.roles.cache.find(role => role.name === "Guest");
  if (!guestRole) return;
  member.roles.add(guestRole)
  let rulesChannel = member.guild.channels.cache.get('752659979269570674');
  if (!rulesChannel) return;
  member.send(`Welcome to the Tomb Clan Discord server, ${member}! Please read the ${rulesChannel} and enjoy your stay!`);
  
 // member.roles.add(addRole)
});

/*bot.on('guildMemberRemove', member => {
  let leaveChannel = member.guild.channels.cache.get('752659979269570675');
  if (!leaveChannel) return;
  leaveChannel.send(`${member} has left the server!`);
});*/

bot.login(process.env.BOT_TOKEN);