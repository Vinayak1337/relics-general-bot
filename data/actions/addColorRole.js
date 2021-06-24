/* eslint-disable max-statements-per-line */
const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
	if (!args[0]) {
		return msg.channel.send(
			new Discord.MessageEmbed()
				.setColor(Bot.color)
				.setDescription(
					'Usage:\n`-c Color_role_postion`\n\nType `-colorList` to get a list of color roles and their positions.',
				)
				.setTimestamp(),
		);
	}
	const colors = Bot.readJsFile('globals')[msg.guild.id].colorList;
	const colorRoles = [];
	colors.forEach((id) => {
		const role = msg.guild.roles.cache.get(id);
		if (role) {
			colorRoles.push(role);
		}
	});
	if (!msg.member.roles.cache.has(colorRoles[args[0] - 1].id)) {
		const em = new Discord.MessageEmbed()
			.setColor(colorRoles[args[0] - 1].color)
			.setThumbnail(msg.guild.iconURL({ dynamic: true }))
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		colorRoles.forEach((role) => {
			if (msg.member.roles.cache.has(role.id)) {
				msg.member.roles.remove(role.id).catch((err) => {
					if (err) {
						Bot.emit('error', err, 'Add Color role, 22');
						return msg.channel.send(
							'Encountered some error, please try to contact Vinayak#0001',
						);
					}
				});
			}
		});
		msg.member.roles.add(colorRoles[args[0] - 1]).catch((err) => {
			if (err) {
				Bot.emit('error', err, 'Add Color role, 25');
				return msg.channel.send(
					'Encountered some error, please try to contact Vinayak#0001',
				);
			}
		});
		return msg.channel.send(
			em.setDescription(
				`${msg.author.toString()}, Added color role ${colorRoles[
					args[0] - 1
				].toString()}`,
			),
		);
	}
	else {
		return msg.channel.send(
			new Discord.MessageEmbed()
				.setColor('RED')
				.setDescription(
					`${msg.author.toString()}, You already have ${colorRoles[
						args[0] - 1
					].toString()} color role.`,
				),
		);
	}
};
module.exports.help = {
	name: 'c',
	description: 'Assigns you a color role.',
	usage: 'c role_position',
	module: 'Color',
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
