const Discord = require('discord.js');

module.exports = (Bot, msg, reason, code, createdAt, transcript) => {
	const embed = new Discord.MessageEmbed()
		.setColor(Bot.red)
		.setFooter('Created At')
		.setTimestamp(createdAt ? createdAt : Date.now())
		.setAuthor(msg.author.tag)
		.setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
		.setDescription(
			`Reason: ${reason}\nTicket Id: ${code}\n Author ID: ${
				msg.author.id
			}\n\nLast Message:  ${msg.content ? msg.content : ''}
			${transcript ? `[Transcript](https://tickettool.xyz/direct?url=${transcript}) of the ticket.` : ''}`,
		);
	if (msg.attachments.size > 0) {
		embed.attachFiles(msg.attachments.map((a) => a.url));
	}
	Bot.channels.cache.get('788838021801705503').send(embed);
};
