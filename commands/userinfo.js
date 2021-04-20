const Discord = require(`discord.js`);


module.exports.run = async (bot, message, args) => {
const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
    };

    let user;
  const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
  if (!member) return message.reply("Please provide a vaild Mention or USER ID");
  let isBot;
  if (member.user.bot === true) {
    isBot = "Yes";
  } else {
    isBot = "No";
  }

    const members = message.guild.members.cache
        .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
        .array();

    const position = new Promise((ful) => {
        for (let i = 1; i < members.length + 1; i++) {
            if (members[i - 1].id === member.id) ful(i);
        }
    });

    const uicon = member.user.avatarURL;
    const userembed = new Discord.MessageEmbed()
        .setDescription(`User Information`)
        .setColor("00ffff")
        .setThumbnail(uicon)
        .setAuthor(member.user.username, uicon)
		.addField("Name:", `${member.nickname !== null ? `Nickname: ${member.nickname}` : member.user.username}`, true)
		.addField("Bot?", `${isBot}`, true)
		.addField("Status", `${status[member.presence.status]}`, true)
		.addField("Playing", `${member.presence.activities[0].name ? `${member.presence.activities[0].name}` : "not playing anything."}`, true)
        .addField(`User Was Created On`, member.user.createdAt)
        .addField(`You Joined This Server On`, member.joinedAt)
        .addField(`Join Position`, await position)
        .addField("Roles", `<@&${message.guild.member(message.author)._roles.join('> | <@&')}>`, true)

    message.channel.send(`${member.user.username}'s User Info:`);
    message.channel.send(userembed);
};

module.exports.help = {
    name: 'userinfo',
};