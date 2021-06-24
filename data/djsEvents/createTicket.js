const Discord = require('discord.js');

module.exports = (Bot, msg, code, createdAt, action) => {
	const embed = new Discord.MessageEmbed()
		.setColor(Bot.green)
		.setFooter('Created At')
		.setTimestamp(createdAt)
		.setAuthor(msg.author.tag)
		.setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
		.setDescription(
			`Action: ${action}\nTicket Id: ${code}\n Author ID: ${
				msg.author.id
			}\n\nMessage: ${msg.content ? msg.content : ''}`,
		);
	if (msg.attachments.size > 0) {
		embed.attachFiles(msg.attachments.map((a) => a.url));
	}
	Bot.channels.cache.get('788838021801705503').send(embed);
};
