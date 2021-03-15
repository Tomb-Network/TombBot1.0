const Discord = require("discord.js");
const operatorList = require("../operators.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

	message.delete(180000);

	let randomSide = args[0];
	
	if (!randomSide)
		return message.channel.send("The Correct Format is `!randomops <attack/defend>`");

	let opArray = fs.readFileSync("./operators.json");
	var jsonOpArray = JSON.parse(opArray);
	
	//attackers
	if (randomSide === "attack") {
		var op1 = jsonOpArray.attackers[Math.floor(Math.random() * jsonOpArray.attackers.length)];
	}
	if (randomSide === "attack") {
		var op2 = jsonOpArray.attackers[Math.floor(Math.random() * jsonOpArray.attackers.length)];
	}
	if (randomSide === "attack") {
		var op3 = jsonOpArray.attackers[Math.floor(Math.random() * jsonOpArray.attackers.length)];
	}
	if (randomSide === "attack") {
		var op4 = jsonOpArray.attackers[Math.floor(Math.random() * jsonOpArray.attackers.length)];
	}
	if (randomSide === "attack") {
		var op5 = jsonOpArray.attackers[Math.floor(Math.random() * jsonOpArray.attackers.length)];
	}

	//defenders
	if (randomSide === "defend") {
		var op1 = jsonOpArray.defenders[Math.floor(Math.random() * jsonOpArray.defenders.length)];
	}
	if (randomSide === "defend") {
		var op2 = jsonOpArray.defenders[Math.floor(Math.random() * jsonOpArray.defenders.length)];
	}
	if (randomSide === "defend") {
		var op3 = jsonOpArray.defenders[Math.floor(Math.random() * jsonOpArray.defenders.length)];
	}
	if (randomSide === "defend") {
		var op4 = jsonOpArray.defenders[Math.floor(Math.random() * jsonOpArray.defenders.length)];
	}
	if (randomSide === "defend") {
		var op5 = jsonOpArray.defenders[Math.floor(Math.random() * jsonOpArray.defenders.length)];
	}
		
	var op1icon = op1 + "icon";
	var op2icon = op2 + "icon";
	var op3icon = op3 + "icon";
	var op4icon = op4 + "icon";
	var op5icon = op5 + "icon";
	
	//attack icons
	const Sledgeicon = bot.emojis.cache.find(emoji => emoji.id === "791499788972720148");
	const Thatchericon = bot.emojis.cache.find(emoji => emoji.id === "791499789035372565");
	const Ashicon = bot.emojis.cache.find(emoji => emoji.id === "791499788369002526");
	const Thermiteicon = bot.emojis.cache.find(emoji => emoji.id === "791499788897222716");
	const Montagneicon = bot.emojis.cache.find(emoji => emoji.id === "791499790302314496");
	const Twitchicon = bot.emojis.cache.find(emoji => emoji.id === "791499788952272906");
	const Glazicon = bot.emojis.cache.find(emoji => emoji.id === "791499788247105537");
	const Fuzeicon = bot.emojis.cache.find(emoji => emoji.id === "791499788205293651");
	const IQicon = bot.emojis.cache.find(emoji => emoji.id === "791499788972982302");
	const Blitzicon = bot.emojis.cache.find(emoji => emoji.id === "791499788213682216");
	const Buckicon = bot.emojis.cache.find(emoji => emoji.id === "791499788058886185");
	const Blackbeardicon = bot.emojis.cache.find(emoji => emoji.id === "791499788356681758");
	const Capitaoicon = bot.emojis.cache.find(emoji => emoji.id === "791499788164005910");
	const Hibanaicon = bot.emojis.cache.find(emoji => emoji.id === "791499788520521769");
	const Jackalicon = bot.emojis.cache.find(emoji => emoji.id === "791499789002473502");
	const Yingicon = bot.emojis.cache.find(emoji => emoji.id === "791499788972982342");
	const Zofiaicon = bot.emojis.cache.find(emoji => emoji.id === "791499789010862090");
	const Dokkaebiicon = bot.emojis.cache.find(emoji => emoji.id === "791499788259688448");
	const Lionicon = bot.emojis.cache.find(emoji => emoji.id === "791499789091078144");
	const Finkaicon = bot.emojis.cache.find(emoji => emoji.id === "791499788251168810");
	const Maverickicon = bot.emojis.cache.find(emoji => emoji.id === "791499789014663208");
	const Nomadicon = bot.emojis.cache.find(emoji => emoji.id === "791499789110870066");
	const Gridlockicon = bot.emojis.cache.find(emoji => emoji.id === "791499788943753216");
	const Nokkicon = bot.emojis.cache.find(emoji => emoji.id === "791499789010599946");
	const Amaruicon = bot.emojis.cache.find(emoji => emoji.id === "791499787991777311");
	const Kaliicon = bot.emojis.cache.find(emoji => emoji.id === "791499788947423272");
	const Ianaicon = bot.emojis.cache.find(emoji => emoji.id === "791499789035896842");
	const Aceicon = bot.emojis.cache.find(emoji => emoji.id === "791499788113543198");
	const Zeroicon = bot.emojis.cache.find(emoji => emoji.id === "791499789061587014");
	const Floresicon = bot.emojis.cache.find(emoji => emoji.id === "814981887415156756");

	//defense icons
	const Smokeicon = bot.emojis.cache.find(emoji => emoji.id === "791500387932045314");
	const Muteicon = bot.emojis.cache.find(emoji => emoji.id === "791500387743825920");
	const Castleicon = bot.emojis.cache.find(emoji => emoji.id === "791500252750413824");
	const Pulseicon = bot.emojis.cache.find(emoji => emoji.id === "791500387679993856");
	const Docicon = bot.emojis.cache.find(emoji => emoji.id === "791500252816998430");
	const Rookicon = bot.emojis.cache.find(emoji => emoji.id === "791500387650764840");
	const Kapkanicon = bot.emojis.cache.find(emoji => emoji.id === "791500252800090142");
	const Tachankaicon = bot.emojis.cache.find(emoji => emoji.id === "791500387659415562");
	const Jagericon = bot.emojis.cache.find(emoji => emoji.id === "791500252481191999");
	const Banditicon = bot.emojis.cache.find(emoji => emoji.id === "791500252678193182");
	const Frosticon = bot.emojis.cache.find(emoji => emoji.id === "791500252393898007");
	const Valkyrieicon = bot.emojis.cache.find(emoji => emoji.id === "791500387604496384");
	const Caveiraicon = bot.emojis.cache.find(emoji => emoji.id === "791500252687368232");
	const Echoicon = bot.emojis.cache.find(emoji => emoji.id === "791500252791963648");
	const Miraicon = bot.emojis.cache.find(emoji => emoji.id === "791500252909535262");
	const Lesionicon = bot.emojis.cache.find(emoji => emoji.id === "791500252464021516");
	const Elaicon = bot.emojis.cache.find(emoji => emoji.id === "791500252447375401");
	const Vigilicon = bot.emojis.cache.find(emoji => emoji.id === "791500387633987654");
	const Maestroicon = bot.emojis.cache.find(emoji => emoji.id === "791500252754608178");
	const Alibiicon = bot.emojis.cache.find(emoji => emoji.id === "791500252808347678");
	const Clashicon = bot.emojis.cache.find(emoji => emoji.id === "791500252829319178");
	const Kaidicon = bot.emojis.cache.find(emoji => emoji.id === "791500252875194398");
	const Mozzieicon = bot.emojis.cache.find(emoji => emoji.id === "791500252800614410");
	const Wardenicon = bot.emojis.cache.find(emoji => emoji.id === "791500387412475905");
	const Goyoicon = bot.emojis.cache.find(emoji => emoji.id === "791500252556296213");
	const Wamaiicon = bot.emojis.cache.find(emoji => emoji.id === "791500388003217448");
	const Oryxicon = bot.emojis.cache.find(emoji => emoji.id === "791500387802808320");
	const Melusiicon = bot.emojis.cache.find(emoji => emoji.id === "791500252796026900");
	const Aruniicon = bot.emojis.cache.find(emoji => emoji.id === "791500253345611786");


	var op1icon;
	var op2icon;
	var op3icon;
	var op4icon;
	var op5icon;

	//Attacker 1
	if (op1 === "Sledge") {
		op1icon = Sledgeicon
	} else if (op1 === "Thatcher") {
		op1icon = Thatchericon
	} else if (op1 === "Ash") {
		op1icon = Ashicon
	} else if (op1 === "Thermite") {
		op1icon = Thermiteicon
	} else if (op1 === "Montagne") {
		op1icon = Montagneicon
	} else if (op1 === "Twitch") {
		op1icon = Twitchicon
	} else if (op1 === "Glaz") {
		op1icon = Glazicon
	} else if (op1 === "Fuze") {
		op1icon = Fuzeicon
	} else if (op1 === "IQ") {
		op1icon = IQicon
	} else if (op1 === "Blitz") {
		op1icon = Blitzicon
	} else if (op1 === "Buck") {
		op1icon = Buckicon
	} else if (op1 === "Blackbeard") {
		op1icon = Blackbeardicon
	} else if (op1 === "Capitao") {
		op1icon = Capitaoicon
	} else if (op1 === "Hibana") {
		op1icon = Hibanaicon
	} else if (op1 === "Jackal") {
		op1icon = Jackalicon
	} else if (op1 === "Ying") {
		op1icon = Yingicon
	} else if (op1 === "Zofia") {
		op1icon = Zofiaicon
	} else if (op1 === "Dokkaebi") {
		op1icon = Dokkaebiicon
	} else if (op1 === "Lion") {
		op1icon = Lionicon
	} else if (op1 === "Finka") {
		op1icon = Finkaicon
	} else if (op1 === "Maverick") {
		op1icon = Maverickicon
	} else if (op1 === "Nomad") {
		op1icon = Nomadicon
	} else if (op1 === "Gridlock") {
		op1icon = Gridlockicon
	} else if (op1 === "Nokk") {
		op1icon = Nokkicon
	} else if (op1 === "Amaru") {
		op1icon = Amaruicon
	} else if (op1 === "Kali") {
		op1icon = Kaliicon
	} else if (op1 === "Iana") {
		op1icon = Ianaicon
	} else if (op1 === "Ace") {
		op1icon = Aceicon
	} else if (op1 === "Zero") {
		op1icon = Zeroicon
	} else if (op1 === "Flores") {
		op1icon = Floresicon
	}

	//Attacker 2
	if (op2 === "Sledge") {
		op2icon = Sledgeicon
	} else if (op2 === "Thatcher") {
		op2icon = Thatchericon
	} else if (op2 === "Ash") {
		op2icon = Ashicon
	} else if (op2 === "Thermite") {
		op2icon = Thermiteicon
	} else if (op2 === "Montagne") {
		op2icon = Montagneicon
	} else if (op2 === "Twitch") {
		op2icon = Twitchicon
	} else if (op2 === "Glaz") {
		op2icon = Glazicon
	} else if (op2 === "Fuze") {
		op2icon = Fuzeicon
	} else if (op2 === "IQ") {
		op2icon = IQicon
	} else if (op2 === "Blitz") {
		op2icon = Blitzicon
	} else if (op2 === "Buck") {
		op2icon = Buckicon
	} else if (op2 === "Blackbeard") {
		op2icon = Blackbeardicon
	} else if (op2 === "Capitao") {
		op2icon = Capitaoicon
	} else if (op2 === "Hibana") {
		op2icon = Hibanaicon
	} else if (op2 === "Jackal") {
		op2icon = Jackalicon
	} else if (op2 === "Ying") {
		op2icon = Yingicon
	} else if (op2 === "Zofia") {
		op2icon = Zofiaicon
	} else if (op2 === "Dokkaebi") {
		op2icon = Dokkaebiicon
	} else if (op2 === "Lion") {
		op2icon = Lionicon
	} else if (op2 === "Finka") {
		op2icon = Finkaicon
	} else if (op2 === "Maverick") {
		op2icon = Maverickicon
	} else if (op2 === "Nomad") {
		op2icon = Nomadicon
	} else if (op2 === "Gridlock") {
		op2icon = Gridlockicon
	} else if (op2 === "Nokk") {
		op2icon = Nokkicon
	} else if (op2 === "Amaru") {
		op2icon = Amaruicon
	} else if (op2 === "Kali") {
		op2icon = Kaliicon
	} else if (op2 === "Iana") {
		op2icon = Ianaicon
	} else if (op2 === "Ace") {
		op2icon = Aceicon
	} else if (op2 === "Zero") {
		op2icon = Zeroicon
	} else if (op2 === "Flores") {
		op2icon = Floresicon
	}

	//Attacker 3
	if (op3 === "Sledge") {
		op3icon = Sledgeicon
	} else if (op3 === "Thatcher") {
		op3icon = Thatchericon
	} else if (op3 === "Ash") {
		op3icon = Ashicon
	} else if (op3 === "Thermite") {
		op3icon = Thermiteicon
	} else if (op3 === "Montagne") {
		op3icon = Montagneicon
	} else if (op3 === "Twitch") {
		op3icon = Twitchicon
	} else if (op3 === "Glaz") {
		op3icon = Glazicon
	} else if (op3 === "Fuze") {
		op3icon = Fuzeicon
	} else if (op3 === "IQ") {
		op3icon = IQicon
	} else if (op3 === "Blitz") {
		op3icon = Blitzicon
	} else if (op3 === "Buck") {
		op3icon = Buckicon
	} else if (op3 === "Blackbeard") {
		op3icon = Blackbeardicon
	} else if (op3 === "Capitao") {
		op3icon = Capitaoicon
	} else if (op3 === "Hibana") {
		op3icon = Hibanaicon
	} else if (op3 === "Jackal") {
		op3icon = Jackalicon
	} else if (op3 === "Ying") {
		op3icon = Yingicon
	} else if (op3 === "Zofia") {
		op3icon = Zofiaicon
	} else if (op3 === "Dokkaebi") {
		op3icon = Dokkaebiicon
	} else if (op3 === "Lion") {
		op3icon = Lionicon
	} else if (op3 === "Finka") {
		op3icon = Finkaicon
	} else if (op3 === "Maverick") {
		op3icon = Maverickicon
	} else if (op3 === "Nomad") {
		op3icon = Nomadicon
	} else if (op3 === "Gridlock") {
		op3icon = Gridlockicon
	} else if (op3 === "Nokk") {
		op3icon = Nokkicon
	} else if (op3 === "Amaru") {
		op3icon = Amaruicon
	} else if (op3 === "Kali") {
		op3icon = Kaliicon
	} else if (op3 === "Iana") {
		op3icon = Ianaicon
	} else if (op3 === "Ace") {
		op3icon = Aceicon
	} else if (op3 === "Zero") {
		op3icon = Zeroicon
	} else if (op3 === "Flores") {
		op3icon = Floresicon
	}

	//Attacker 4
	if (op4 === "Sledge") {
		op4icon = Sledgeicon
	} else if (op4 === "Thatcher") {
		op4icon = Thatchericon
	} else if (op4 === "Ash") {
		op4icon = Ashicon
	} else if (op4 === "Thermite") {
		op4icon = Thermiteicon
	} else if (op4 === "Montagne") {
		op4icon = Montagneicon
	} else if (op4 === "Twitch") {
		op4icon = Twitchicon
	} else if (op4 === "Glaz") {
		op4icon = Glazicon
	} else if (op4 === "Fuze") {
		op4icon = Fuzeicon
	} else if (op4 === "IQ") {
		op4icon = IQicon
	} else if (op4 === "Blitz") {
		op4icon = Blitzicon
	} else if (op4 === "Buck") {
		op4icon = Buckicon
	} else if (op4 === "Blackbeard") {
		op4icon = Blackbeardicon
	} else if (op4 === "Capitao") {
		op4icon = Capitaoicon
	} else if (op4 === "Hibana") {
		op4icon = Hibanaicon
	} else if (op4 === "Jackal") {
		op4icon = Jackalicon
	} else if (op4 === "Ying") {
		op4icon = Yingicon
	} else if (op4 === "Zofia") {
		op4icon = Zofiaicon
	} else if (op4 === "Dokkaebi") {
		op4icon = Dokkaebiicon
	} else if (op4 === "Lion") {
		op4icon = Lionicon
	} else if (op4 === "Finka") {
		op4icon = Finkaicon
	} else if (op4 === "Maverick") {
		op4icon = Maverickicon
	} else if (op4 === "Nomad") {
		op4icon = Nomadicon
	} else if (op4 === "Gridlock") {
		op4icon = Gridlockicon
	} else if (op4 === "Nokk") {
		op4icon = Nokkicon
	} else if (op4 === "Amaru") {
		op4icon = Amaruicon
	} else if (op4 === "Kali") {
		op4icon = Kaliicon
	} else if (op4 === "Iana") {
		op4icon = Ianaicon
	} else if (op4 === "Ace") {
		op4icon = Aceicon
	} else if (op4 === "Zero") {
		op4icon = Zeroicon
	} else if (op4 === "Flores") {
		op4icon = Floresicon
	}

	//Attacker 5
	if (op5 === "Sledge") {
		op5icon = Sledgeicon
	} else if (op5 === "Thatcher") {
		op5icon = Thatchericon
	} else if (op5 === "Ash") {
		op5icon = Ashicon
	} else if (op5 === "Thermite") {
		op5icon = Thermiteicon
	} else if (op5 === "Montagne") {
		op5icon = Montagneicon
	} else if (op5 === "Twitch") {
		op5icon = Twitchicon
	} else if (op5 === "Glaz") {
		op5icon = Glazicon
	} else if (op5 === "Fuze") {
		op5icon = Fuzeicon
	} else if (op5 === "IQ") {
		op5icon = IQicon
	} else if (op5 === "Blitz") {
		op5icon = Blitzicon
	} else if (op5 === "Buck") {
		op5icon = Buckicon
	} else if (op5 === "Blackbeard") {
		op5icon = Blackbeardicon
	} else if (op5 === "Capitao") {
		op5icon = Capitaoicon
	} else if (op5 === "Hibana") {
		op5icon = Hibanaicon
	} else if (op5 === "Jackal") {
		op5icon = Jackalicon
	} else if (op5 === "Ying") {
		op5icon = Yingicon
	} else if (op5 === "Zofia") {
		op5icon = Zofiaicon
	} else if (op5 === "Dokkaebi") {
		op5icon = Dokkaebiicon
	} else if (op5 === "Lion") {
		op5icon = Lionicon
	} else if (op5 === "Finka") {
		op5icon = Finkaicon
	} else if (op5 === "Maverick") {
		op5icon = Maverickicon
	} else if (op5 === "Nomad") {
		op5icon = Nomadicon
	} else if (op5 === "Gridlock") {
		op5icon = Gridlockicon
	} else if (op5 === "Nokk") {
		op5icon = Nokkicon
	} else if (op5 === "Amaru") {
		op5icon = Amaruicon
	} else if (op5 === "Kali") {
		op5icon = Kaliicon
	} else if (op5 === "Iana") {
		op5icon = Ianaicon
	} else if (op5 === "Ace") {
		op5icon = Aceicon
	} else if (op5 === "Zero") {
		op5icon = Zeroicon
	} else if (op5 === "Flores") {
		op5icon = Floresicon
	}

	//Defender 1
	if (op1 === "Smoke") {
		op1icon = Smokeicon
	} else if (op1 === "Mute") {
		op1icon = Muteicon
	} else if (op1 === "Castle") {
		op1icon = Castleicon
	} else if (op1 === "Pulse") {
		op1icon = Pulseicon
	} else if (op1 === "Doc") {
		op1icon = Docicon
	} else if (op1 === "Rook") {
		op1icon = Rookicon
	} else if (op1 === "Kapkan") {
		op1icon = Kapkanicon
	} else if (op1 === "Tachanka") {
		op1icon = Tachankaicon
	} else if (op1 === "Jager") {
		op1icon = Jagericon
	} else if (op1 === "Bandit") {
		op1icon = Banditicon
	} else if (op1 === "Frost") {
		op1icon = Frosticon
	} else if (op1 === "Valkyrie") {
		op1icon = Valkyrieicon
	} else if (op1 === "Caveira") {
		op1icon = Caveiraicon
	} else if (op1 === "Echo") {
		op1icon = Echoicon
	} else if (op1 === "Mira") {
		op1icon = Miraicon
	} else if (op1 === "Lesion") {
		op1icon = Lesionicon
	} else if (op1 === "Ela") {
		op1icon = Elaicon
	} else if (op1 === "Vigil") {
		op1icon = Vigilicon
	} else if (op1 === "Maestro") {
		op1icon = Maestroicon
	} else if (op1 === "Alibi") {
		op1icon = Alibiicon
	} else if (op1 === "Clash") {
		op1icon = Clashicon
	} else if (op1 === "Kaid") {
		op1icon = Kaidicon
	} else if (op1 === "Mozzie") {
		op1icon = Mozzieicon
	} else if (op1 === "Warden") {
		op1icon = Wardenicon
	} else if (op1 === "Goyo") {
		op1icon = Goyoicon
	} else if (op1 === "Wamai") {
		op1icon = Wamaiicon
	} else if (op1 === "Oryx") {
		op1icon = Oryxicon
	} else if (op1 === "Melusi") {
		op1icon = Melusiicon
	} else if (op1 === "Aruni") {
		op1icon = Aruniicon
	}

	//Defender 2
	if (op2 === "Smoke") {
		op2icon = Smokeicon
	} else if (op2 === "Mute") {
		op2icon = Muteicon
	} else if (op2 === "Castle") {
		op2icon = Castleicon
	} else if (op2 === "Pulse") {
		op2icon = Pulseicon
	} else if (op2 === "Doc") {
		op2icon = Docicon
	} else if (op2 === "Rook") {
		op2icon = Rookicon
	} else if (op2 === "Kapkan") {
		op2icon = Kapkanicon
	} else if (op2 === "Tachanka") {
		op2icon = Tachankaicon
	} else if (op2 === "Jager") {
		op2icon = Jagericon
	} else if (op2 === "Bandit") {
		op2icon = Banditicon
	} else if (op2 === "Frost") {
		op2icon = Frosticon
	} else if (op2 === "Valkyrie") {
		op2icon = Valkyrieicon
	} else if (op2 === "Caveira") {
		op2icon = Caveiraicon
	} else if (op2 === "Echo") {
		op2icon = Echoicon
	} else if (op2 === "Mira") {
		op2icon = Miraicon
	} else if (op2 === "Lesion") {
		op2icon = Lesionicon
	} else if (op2 === "Ela") {
		op2icon = Elaicon
	} else if (op2 === "Vigil") {
		op2icon = Vigilicon
	} else if (op2 === "Maestro") {
		op2icon = Maestroicon
	} else if (op2 === "Alibi") {
		op2icon = Alibiicon
	} else if (op2 === "Clash") {
		op2icon = Clashicon
	} else if (op2 === "Kaid") {
		op2icon = Kaidicon
	} else if (op2 === "Mozzie") {
		op2icon = Mozzieicon
	} else if (op2 === "Warden") {
		op2icon = Wardenicon
	} else if (op2 === "Goyo") {
		op2icon = Goyoicon
	} else if (op2 === "Wamai") {
		op2icon = Wamaiicon
	} else if (op2 === "Oryx") {
		op2icon = Oryxicon
	} else if (op2 === "Melusi") {
		op2icon = Melusiicon
	} else if (op2 === "Aruni") {
		op2icon = Aruniicon
	}

	//Defender 3
	if (op3 === "Smoke") {
		op3icon = Smokeicon
	} else if (op3 === "Mute") {
		op3icon = Muteicon
	} else if (op3 === "Castle") {
		op3icon = Castleicon
	} else if (op3 === "Pulse") {
		op3icon = Pulseicon
	} else if (op3 === "Doc") {
		op3icon = Docicon
	} else if (op3 === "Rook") {
		op3icon = Rookicon
	} else if (op3 === "Kapkan") {
		op3icon = Kapkanicon
	} else if (op3 === "Tachanka") {
		op3icon = Tachankaicon
	} else if (op3 === "Jager") {
		op3icon = Jagericon
	} else if (op3 === "Bandit") {
		op3icon = Banditicon
	} else if (op3 === "Frost") {
		op3icon = Frosticon
	} else if (op3 === "Valkyrie") {
		op3icon = Valkyrieicon
	} else if (op3 === "Caveira") {
		op3icon = Caveiraicon
	} else if (op3 === "Echo") {
		op3icon = Echoicon
	} else if (op3 === "Mira") {
		op3icon = Miraicon
	} else if (op3 === "Lesion") {
		op3icon = Lesionicon
	} else if (op3 === "Ela") {
		op3icon = Elaicon
	} else if (op3 === "Vigil") {
		op3icon = Vigilicon
	} else if (op3 === "Maestro") {
		op3icon = Maestroicon
	} else if (op3 === "Alibi") {
		op3icon = Alibiicon
	} else if (op3 === "Clash") {
		op3icon = Clashicon
	} else if (op3 === "Kaid") {
		op3icon = Kaidicon
	} else if (op3 === "Mozzie") {
		op3icon = Mozzieicon
	} else if (op3 === "Warden") {
		op3icon = Wardenicon
	} else if (op3 === "Goyo") {
		op3icon = Goyoicon
	} else if (op3 === "Wamai") {
		op3icon = Wamaiicon
	} else if (op3 === "Oryx") {
		op3icon = Oryxicon
	} else if (op3 === "Melusi") {
		op3icon = Melusiicon
	} else if (op3 === "Aruni") {
		op3icon = Aruniicon
	}

	//Defender 4
	if (op4 === "Smoke") {
		op4icon = Smokeicon
	} else if (op4 === "Mute") {
		op4icon = Muteicon
	} else if (op4 === "Castle") {
		op4icon = Castleicon
	} else if (op4 === "Pulse") {
		op4icon = Pulseicon
	} else if (op4 === "Doc") {
		op4icon = Docicon
	} else if (op4 === "Rook") {
		op4icon = Rookicon
	} else if (op4 === "Kapkan") {
		op4icon = Kapkanicon
	} else if (op4 === "Tachanka") {
		op4icon = Tachankaicon
	} else if (op4 === "Jager") {
		op4icon = Jagericon
	} else if (op4 === "Bandit") {
		op4icon = Banditicon
	} else if (op4 === "Frost") {
		op4icon = Frosticon
	} else if (op4 === "Valkyrie") {
		op4icon = Valkyrieicon
	} else if (op4 === "Caveira") {
		op4icon = Caveiraicon
	} else if (op4 === "Echo") {
		op4icon = Echoicon
	} else if (op4 === "Mira") {
		op4icon = Miraicon
	} else if (op4 === "Lesion") {
		op4icon = Lesionicon
	} else if (op4 === "Ela") {
		op4icon = Elaicon
	} else if (op4 === "Vigil") {
		op4icon = Vigilicon
	} else if (op4 === "Maestro") {
		op4icon = Maestroicon
	} else if (op4 === "Alibi") {
		op4icon = Alibiicon
	} else if (op4 === "Clash") {
		op4icon = Clashicon
	} else if (op4 === "Kaid") {
		op4icon = Kaidicon
	} else if (op4 === "Mozzie") {
		op4icon = Mozzieicon
	} else if (op4 === "Warden") {
		op4icon = Wardenicon
	} else if (op4 === "Goyo") {
		op4icon = Goyoicon
	} else if (op4 === "Wamai") {
		op4icon = Wamaiicon
	} else if (op4 === "Oryx") {
		op4icon = Oryxicon
	} else if (op4 === "Melusi") {
		op4icon = Melusiicon
	} else if (op4 === "Aruni") {
		op4icon = Aruniicon
	}

	//Defender 5
	if (op5 === "Smoke") {
		op5icon = Smokeicon
	} else if (op5 === "Mute") {
		op5icon = Muteicon
	} else if (op5 === "Castle") {
		op5icon = Castleicon
	} else if (op5 === "Pulse") {
		op5icon = Pulseicon
	} else if (op5 === "Doc") {
		op5icon = Docicon
	} else if (op5 === "Rook") {
		op5icon = Rookicon
	} else if (op5 === "Kapkan") {
		op5icon = Kapkanicon
	} else if (op5 === "Tachanka") {
		op5icon = Tachankaicon
	} else if (op5 === "Jager") {
		op5icon = Jagericon
	} else if (op5 === "Bandit") {
		op5icon = Banditicon
	} else if (op5 === "Frost") {
		op5icon = Frosticon
	} else if (op5 === "Valkyrie") {
		op5icon = Valkyrieicon
	} else if (op5 === "Caveira") {
		op5icon = Caveiraicon
	} else if (op5 === "Echo") {
		op5icon = Echoicon
	} else if (op5 === "Mira") {
		op5icon = Miraicon
	} else if (op5 === "Lesion") {
		op5icon = Lesionicon
	} else if (op5 === "Ela") {
		op5icon = Elaicon
	} else if (op5 === "Vigil") {
		op5icon = Vigilicon
	} else if (op5 === "Maestro") {
		op5icon = Maestroicon
	} else if (op5 === "Alibi") {
		op5icon = Alibiicon
	} else if (op5 === "Clash") {
		op5icon = Clashicon
	} else if (op5 === "Kaid") {
		op5icon = Kaidicon
	} else if (op5 === "Mozzie") {
		op5icon = Mozzieicon
	} else if (op5 === "Warden") {
		op5icon = Wardenicon
	} else if (op5 === "Goyo") {
		op5icon = Goyoicon
	} else if (op5 === "Wamai") {
		op5icon = Wamaiicon
	} else if (op5 === "Oryx") {
		op5icon = Oryxicon
	} else if (op5 === "Melusi") {
		op5icon = Melusiicon
	} else if (op5 === "Aruni") {
		op5icon = Aruniicon
	}

	var sideembed = "not set"
	let sideimage;

	if (randomSide === "attack") {
		sideembed = "Attack"
		sideimage = "https://cdn.discordapp.com/attachments/717839884961841213/817095859329695775/attackericon.png";
	} else if (randomSide === "defend") {
		sideembed = "Defense"
		sideimage = "https://cdn.discordapp.com/attachments/717839884961841213/817095856334962758/defendicon.png"
	}

	let randomopEmbed = new Discord.MessageEmbed()
		.setTitle(`5 Stack of Random ${sideembed} Operators`)
		.setColor("#00FFFF")
		.setThumbnail(sideimage)
		.addField(op1icon, op1)
		.addField(op2icon, op2)
		.addField(op3icon, op3)
		.addField(op4icon, op4)
		.addField(op5icon, op5)
		.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
		.setTimestamp()
	message.channel.send(randomopEmbed);//.then(message => { message.delete({ timeout: 180000 }) });
	
}	
	
module.exports.help = {
  name: "randomops"
}
