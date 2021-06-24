const Discord = require('discord.js');

module.exports.run = (Bot, msg) => {
	const colors = Bot.readJsFile('globals')[msg.guild.id].colorList;
	const colorRolesToDisplay = [];
	colors.forEach((id, int) => {
		const role = msg.guild.roles.cache.get(id);
		if (int % 3 === 0) colorRolesToDisplay.push('');
		if (role) {
			colorRolesToDisplay.push(`${int + 1}. <@&${role.id}>`);
		}
	});

	const em = new Discord.MessageEmbed()
		.setColor(Bot.color)
		.setThumbnail(msg.guild.iconURL({ dynamic: true }))
		.setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
		.setTimestamp()
		.setTitle('Color List');

	msg.channel.send(
		em.setDescription(
			`**${colorRolesToDisplay.join(
				'\n',
			)}**\n\nUsage:\n\`-c Color_role_position\``,
		),
	);
};
module.exports.help = {
	name: 'colorlist',
	description: 'Command file template!',
	usage: 'usage of the command',
	module: 'Color',
	aliases: ['cl'],
};

module.exports.requirements = {
	userPerms: [],
	BotPerms: [],
	ownerOnly: false,
	adminOnly: false,
	guild: '',
	role: '',
	channel: '631819165233053696',
};
