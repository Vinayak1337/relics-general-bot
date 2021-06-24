const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
	if (!(args[0] || msg.attachments.first())) {
		return msg.channel.send(
			`Announce any message or image.\n\nUsage:\n\`-announce [channel] (message/attach image)\`${Bot.argCondition}`,
		);
	}

	let channel;
	if (args[0] && args[0].startsWith('<#')) {channel = msg.mentions.channels.first();}
	else {channel = Bot.channels.cache.get(args[0]);}
	if (channel && !(args[1] || msg.attachments.first())) {
		return msg.channel.send(
			`Please provide message or image to send\n\nUsage:\n\`-say [channel] (message/attach image)\`${Bot.argCondition}`,
		);
	}

	const embed = new Discord.MessageEmbed()
		.setColor(Bot.color)
		.setTimestamp()
		.setThumbnail(msg.guild.iconURL({ dynamic: true }))
		.setAuthor(msg.guild.name);
	if (channel) {
		if (args[1]) embed.setDescription(args.slice(1).join(' '));
	}
	else if (args[0]) {
		embed.setDescription(args.join(' '));
	}
	if (msg.attachments.size > 0) {
		if (
			['webp', 'png', 'jpg', 'jpeg', 'gif'].some((t) =>
				msg.attachments.first().url.endsWith(t),
			)
		) {
			embed.setImage(msg.attachments.first().url);
			if (msg.attachments.size > 1) {
				embed.attachFiles(msg.attachments.map((at) => at.url).slice(1));
			}
		}
		else {
			embed.attachFiles(msg.attachments.map((at) => at.url));
		}
	}

	if (channel) {
		return channel.send(embed).catch((err) => {
			Bot.emit('error', err, 'announce // #24', msg.channel);
		});
	}
	else {
		msg.channel.send(embed).catch((err) => {
			Bot.emit('error', err, 'announce // #27', msg.channel);
		});
		return msg.delete({ timeout: 3000 });
	}
};
module.exports.help = {
	name: 'announce',
	description: 'Announce any message or image.',
	usage: '-announce [channel] (message/attach image)',
	module: 'Utility',
	aliases: ['an'],
};

module.exports.requirements = {
	userPerms: [],
	BotPerms: [],
	ownerOnly: false,
	adminOnly: true,
	guild: '',
	role: '',
	channel: '',
};
