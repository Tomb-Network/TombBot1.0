const Discord = require("discord.js");
const opInfoList = require("../operatorStats.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

	let wantElite = args[1];
	let opSearch = args[0];

	if (!opSearch)
		return message.channel.send("The Correct Format is `!r6opinfo <operator name>`");

	let opArray = fs.readFileSync("./operatorStats.json");
	var jsonOpArray = JSON.parse(opArray);
	//message.channel.send(jsonOpArray[opSearch].secondaryWeapons);
	let lrgImage;
	let smlImage;
	if (wantElite === "elite" && opSearch === "Sledge" && opSearch === "Thatcher" && opSearch === "Smoke" && opSearch === "Mute" && opSearch === "Ash" && opSearch === "Thermite" && opSearch === "Pulse" && opSearch === "Twitch" && opSearch === "Doc" && opSearch === "Rook" && opSearch === "Glaz" && opSearch === "Fuze" && opSearch === "Kapkan" && opSearch === "Tachanka" && opSearch === "IQ" && opSearch === "Blitz" && opSearch === "Jager" && opSearch === "Bandit" && opSearch === "Buck" && opSearch === "Frost" && opSearch === "Blackbeard" && opSearch === "Valkyrie" && opSearch === "Capitao" && opSearch === "Caveira" && opSearch === "Hibana" && opSearch === "Echo" && opSearch === "Mira" && opSearch === "Lesion" && opSearch === "Zofia" && opSearch === "Ela" && opSearch === "Dokkaebi" && opSearch === "Maverick" && opSearch === "Kali") {
		lrgImage = jsonOpArray[opSearch].images.elite;
		smlImage = jsonOpArray[opSearch].images.fullbody;
	} else {
		lrgImage = jsonOpArray[opSearch].images.fullbody;
		smlImage = jsonOpArray[opSearch].images.icon;
    }

	let difText;
	if (jsonOpArray[opSearch].other.difficulty === 1) {
		difText = "●○○";
	} else if (jsonOpArray[opSearch].other.difficulty === 2) {
		difText = "●●○";
	} else if (jsonOpArray[opSearch].other.difficulty === 3) {
		difText = "●●●";
	}
	let speedText;
	if (jsonOpArray[opSearch].other.speedRating === 1) {
		speedText = "●○○";
	} else if (jsonOpArray[opSearch].other.speedRating === 2) {
		speedText = "●●○";
	} else if (jsonOpArray[opSearch].other.speedRating === 3) {
		speedText = "●●●";
	}
	let armorText;
	if (jsonOpArray[opSearch].other.armorRating === 1) {
		armorText = "●○○";
	} else if (jsonOpArray[opSearch].other.armorRating === 2) {
		armorText = "●●○";
	} else if (jsonOpArray[opSearch].other.armorRating === 3) {
		armorText = "●●●";
	}

	let opEmbed = new Discord.MessageEmbed()
		.setAuthor(opSearch + "'s Loadout and Other Information", jsonOpArray[opSearch].images.icon)
		.setThumbnail(smlImage)
		.setImage(lrgImage)
		.addField("Primary Weapons", jsonOpArray[opSearch].primaryWeapons, true)
		.addField("Secondary Weapons", jsonOpArray[opSearch].secondaryWeapons, true)
		.addField("Special Gadget", jsonOpArray[opSearch].specialGadget, true)
		.addField("Secondary Gadgets", jsonOpArray[opSearch].secondaryGadgets, true)
		.addField("Other", "Difficulty Rating: " + difText + '\n' + "Speed Rating: " + speedText + '\n' + "Armor Rating: " + armorText)
	message.channel.send(opEmbed);


}

module.exports.help = {
    name: "r6opinfo"
}