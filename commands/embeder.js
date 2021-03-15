const Discord = require("discord.js");

exports.run = async (client, message, [color, title, description]) => {
    let Color = color.toLowerCase();


    if (Color === "aqua") { Color = "0x1ABC9C"; } 
    if (Color === "green") { Color = "0x2ECC71"; }
    if (Color === "blue") { Color = "0x3498DB"; }
    if (Color === "purple") { Color = "0x9B59B6"; }
    if (Color === "gold") { Color = "0xF1C40F"; }
    if (Color === "orange") { Color = "0xE67E22"; }
    if (Color === "red") { Color = "0xE74C3C"; }
    if (Color === "grey" || Color === "gray") { Color = "0x95A5A6"; }
    if (Color === "navy") { Color = "0x34495E"; }
    if (Color === "darkaqua") { Color = "0x11806A"; }
    if (Color === "darkgreen") { Color = "0x1F8B4C"; }
    if (Color === "darkblue") { Color = "0x206694"; }
    if (Color === "darkpurple") { Color = "0x71368A"; }
    if (Color === "darkgold") { Color = "0xC27C0E"; }
    if (Color === "darkorange") { Color = "0xA84300"; }
    if (Color === "darkred") { Color = "0x992D22"; }
    if (Color === "darkgrey" || Color === "darkgray") { Color = "0x979C9F"; }
    if (Color === "darkergrey" || Color === "darkergray") { Color = "0x7F8C8D"; }
    if (Color === "lightgrey" || Color === "lightgray") { Color = "0xBCC0C0"; }
    if (Color === "darknavy") { Color = "0x2C3E50"; }
    if (Color === "blurple") { Color = "0x7289DA"; }
    if (Color === "greyple" || Color === "grayple") { Color = "0x99AAB5"; }
    if (Color === "darkish") { Color = "0x2C2F33"; }
    if (Color === "almostblack") { Color = "0x23272A"; }
    if (Color === "default") { Color = "0x000000"; }

    if(!title || !description) { return message.reply("You need to provide a subject title and description!"); }
  
    message.delete().catch();
    const embed = new Discord.MessageEmbed()
       .setColor(Color)
       .setTimestamp()
       .addField(`${title}`, `${description}`);
    return message.channel.send({embed});
  };
  
  exports.conf = {
      enabled: true,
      runIn: ["text"],
      aliases: [],
      permLevel: 10,
      botPerms: [],
      requiredFuncs: [],
  };
    
  exports.help = {
      name: "embeder",
  };