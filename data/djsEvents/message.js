/* eslint-disable no-shadow */
const { owners } = require('../keys/settings');
const Discord = require('discord.js');

module.exports = (Bot, msg) => {
	if (!Bot.ready) return;
	if (msg.author.bot) return;
	if (msg.channel.id === '335303154839060480') {
		const em = new Discord.MessageEmbed()
			.setColor(Bot.color)
			.setTimestamp()
			.setThumbnail(msg.guild.iconURL({ dynamic: true }))
			.setAuthor(msg.guild.name);
		if (msg.attachments.size > 0) {
			if (
				['webp', 'png', 'jpg', 'jpeg', 'gif'].some((t) =>
					msg.attachments.first().url.endsWith(t),
				)
			) {
				em.setImage(msg.attachments.first().url);
				if (msg.attachments.size > 1) {
					em.attachFiles(msg.attachments.map((at) => at.url).slice(1));
				}
			}
			else {
				em.attachFiles(msg.attachments.map((at) => at.url));
			}
		}
		if (msg.content) {
			em.setDescription(msg.content);
		}
		msg.delete({ timeout: 1000 });
		return msg.channel.send(em);
	}

	if (msg.channel.id === '694601107921698876') {
		const hooks = Bot.readJsFile('globals').webhooks;

		hooks.forEach((obj) => {
			const hook = new Discord.WebhookClient(obj.id, obj.token);
			if (!hook) return;
			if (msg.content && msg.attachments.size > 0) {hook.send(msg.content, { files: msg.attachments.map((at) => at.url) });}
			else if (msg.content && !(msg.attachments.size > 0)) {hook.send(msg.content);}
			else if (!msg.content && msg.attachments.size > 0) {hook.send({ files: msg.attachments.map((at) => at.url) });}
		});
		return;
	}
	Bot.owners = owners;

	const msgArray = msg.content.split(' ');
	let command, args;

	if (msg.channel.type === 'dm') {
		command = 'DM';
		args = msgArray;
	}
	else if (msg.content.startsWith('<@!714763717874679871>')) {
		const allowed = /^[0-9<@!>]+$/;
		if (msgArray[0].match(allowed)) {
			command = msgArray[1].toLowerCase();
			args = msgArray.slice(2);
		}
		else {
			command = msgArray[0].replace('<@!714763717874679871>').toLowerCase();
			args = msgArray.slice(1);
		}
	}
	else if (msg.content.startsWith(Bot.prefix)) {
		command = msgArray[0].slice(Bot.prefix.length).toLowerCase();
		args = msgArray.slice(1);
	}
	else if (
		!msg.content.startsWith(Bot.prefix) ||
    !msg.content.startsWith('<@!714763717874679871>')
	) {
		return;
	}
	args.forEach((a, i) => {
		a = a.trim();
		if (!a) {
			args.splice(i, 1);
		}
	});
	args = args.map((a) => a.trim());

	const cmd = Bot.commands.get(command) || Bot.aliases.get(command);

	if (!cmd) return;
	if (msg.guild) {
		if (!msg.guild.me.permissions.has(['SEND_MESSAGES'])) {
			return msg.author.send(
				Bot.errEm.setDescription(
					`user ${msg.author}, i don't have permission to send message in ${msg.channel}`,
				),
			);
		}

		if (cmd.requirements.guild && !(msg.guild.id === cmd.requirements.guild)) {return;}

		if (!Bot.owners.includes(msg.author.id)) {
			if (!msg.member.permissions.has(['ADMINISTRATOR'])) {
				if (
					cmd.requirements.blackListedChannel &&
          msg.channel.id === cmd.requirements.blackListedChannel
				) {return;}
			}

			if (
				cmd.requirements.role &&
        !msg.member.roles.cache.has(cmd.requirements.role)
			) {return;}
			if (cmd.requirements.ownerOnly && !owners.includes(msg.author.id)) return;
			if (
				cmd.requirements.channel &&
        !(msg.channel.id === cmd.requirements.channel)
			) {return;}
			if (
				cmd.requirements.adminOnly &&
        !msg.member.permissions.has(['ADMINISTRATOR'])
			) {return;}

			if (
				cmd.requirements.userPerms &&
        !msg.member.permissions.has(cmd.requirements.userPerms)
			) {
				return msg.channel.send(
					Bot.errEm.setDescription(
						`You must have the following permissions: ${missingPerms(
							msg.member,
							cmd.requirements.userPerms,
						)}`,
					),
				);
			}
		}

		if (
			cmd.requirements.BotPerms &&
      !msg.guild.me.permissions.has(cmd.requirements.BotPerms)
		) {
			return msg.channel.send(
				Bot.errEm.setDescription(
					`I am missing the following permissions: ${missingPerms(
						msg.guild.me,
						cmd.requirements.BotPerms,
					)}`,
				),
			);
		}

		// Check user limit
		if (cmd.userLimits) {
			const current = Bot.limits.get(`${command}-${msg.author.id}`);

			if (!current) {
				const obj = {};
				obj.crr = 1;
				obj.time = Date.now() / 1000;
				Bot.limits.set(`${command}-${msg.author.id}`, obj);
			}
			else if (current.crr >= cmd.userLimits.rateLimit) {
				const usedTime = current.time;
				const time = Date.now() / 1000;
				const used = time - usedTime;
				const remain = cmd.limits.cooldown / 1000 - used;
				return msg.channel.send(
					Bot.errEm.setDescription(
						`Please wait ${Math.round(
							remain,
						)} seconds to use this command again!`,
					),
				);
			}
			else {
				const obj = {};
				obj.crr = current.crr + 1;
				obj.time = Date.now() / 1000;
				Bot.limits.set(`${command}-${msg.author.id}`, obj);
			}

			setTimeout(() => {
				Bot.limits.delete(`${command}-${msg.author.id}`);
				Bot.limits.delete(`${command}-${msg.author.id}-Time`);
			}, cmd.userLimits.cooldown);
		}

		// check if server limits
		else if (cmd.serverLimits) {
			const current = Bot.limits.get(`${command}-${msg.guild.id}`);

			if (!current) {
				const obj = {};
				obj.crr = 1;
				obj.time = Date.now() / 1000;
				Bot.limits.set(`${command}-${msg.guild.id}`, obj);
			}
			else if (current.crr >= cmd.serverLimits.rateLimit) {
				const usedTime = current.time;
				const time = Date.now() / 1000;
				const used = time - usedTime;
				const remain = cmd.limits.cooldown / 1000 - used;
				return msg.channel.send(
					Bot.errEm.setDescription(
						`Please wait ${Math.round(
							remain,
						)} seconds to use this command again!`,
					),
				);
			}
			else {
				const obj = {};
				obj.crr = current.crr + 1;
				obj.time = Date.now() / 1000;
				Bot.limits.set(`${command}-${msg.guild.id}`, obj);
			}

			setTimeout(() => {
				Bot.limits.delete(`${command}-${msg.guild.id}`);
				Bot.limits.delete(`${command}-${msg.guild.id}-Time`);
			}, cmd.serverLimits.cooldown);
		}
	}
	cmd.run(Bot, msg, args, command);
};

const missingPerms = (member, perms) => {
	const missingPerms = member.permissions.missing(perms).map(
		(str) =>
			`\`${str
				.replace(/_/g, ' ')
				.toLowerCase()
				.replace(/\b(\w)/g, (char) => char.toUpperCase())}\``,
	);

	return missingPerms.length > 1
		? `${missingPerms.slice(0, -1).join(', ')} and ${missingPerms.slice(
			-(1)[0],
		)}`
		: missingPerms[0];
};
