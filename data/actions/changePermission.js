module.exports.run = (Bot, msg, args) => {
	if (!args[0]) {
		return msg.channel.send(
			`Change permission of a role or user in all channels of the server.\n\nUsage:\n\`-changePermission (user/role) (+/-permission_flag)\`\nTo know all the permission flags type: \`-changePermission flags\`\nNote:- if you do not specify +/- with flags then the permission will be null.${Bot.argCondition}`,
		);
	}

	if (args[0].toLowerCase() === 'flags') {
		return msg.channel.send(`\`\`\`yaml
---Every permission can be applied on categories---\n
---Applied on all channels---
CREATE_INSTANT_INVITE (create invitations to the guild)
MANAGE_CHANNELS (edit and reorder channels)
VIEW_CHANNEL\n
---TEXT Channels only---
ADD_REACTIONS (add new reactions to messages)
SEND_MESSAGES
SEND_TTS_MESSAGES
MANAGE_MESSAGES (delete messages and reactions)
EMBED_LINKS (links posted will have a preview embedded)
ATTACH_FILES
READ_MESSAGE_HISTORY (view messages that were posted prior to opening Discord)
MENTION_EVERYONE (Mention all roles also allows)
USE_EXTERNAL_EMOJIS (use emojis from different guilds)
MANAGE_WEBHOOKS\n
---Voice Channels only---
PRIORITY_SPEAKER
STREAM
CONNECT (connect to a voice channel)
SPEAK (speak in a voice channel)
MUTE_MEMBERS (mute members across all voice channels)
DEAFEN_MEMBERS (deafen members across all voice channels)
MOVE_MEMBERS (move members between voice channels)
USE_VAD (use voice activity detection)\n
(Not case sensitive)
    \`\`\``);
	}

	if (!args[1]) {
		return msg.channel.send(
			'Please provide the permission flag(s).\nTo know all the permission flags type command `-cp flags`\n\nUsage:\n`-changePermission (user/role) (+/-permission flag(s))`',
		);
	}
	if (
		!(
			msg.guild.roles.cache.get(args[0]) || msg.guild.members.cache.get(args[0])
		)
	) {
		return msg.channel.send(
			`Didn't find any user or role with id ${args[0]}.\nIf it wasn't an id then please provide an id.`,
		);
	}
	const er = [];
	const perms = [
		'CREATE_INSTANT_INVITE',
		'MANAGE_CHANNELS',
		'VIEW_CHANNEL',
		'ADD_REACTIONS',
		'SEND_MESSAGES',
		'SEND_TTS_MESSAGES',
		'MANAGE_MESSAGES',
		'EMBED_LINKS',
		'ATTACH_FILES',
		'READ_MESSAGE_HISTORY',
		'MENTION_EVERYONE',
		'USE_EXTERNAL_EMOJIS',
		'MANAGE_WEBHOOKS',
		'PRIORITY_SPEAKER',
		'STREAM',
		'CONNECT',
		'SPEAK',
		'MUTE_MEMBERS',
		'DEAFEN_MEMBERS',
		'MOVE_MEMBERS',
		'USE_VAD',
	];
	args.slice(1).forEach((arg) => {
		if (!perms.includes(arg.replace('+', '').replace('-', '').toUpperCase())) {
			er.push(arg);
		}
	});
	if (er[0]) {
		return msg.channel.send(
			`${
				args.lenght > 1 ? 'These don\'t' : 'This doesn\'t'
			}  match with permission flags: **${er.join(
				' ',
			)}** .\nPlease use \`-cp flags\` to know all the exist flags.`,
		);
	}

	const permissions = {};
	args.slice(1).forEach((perm) => {
		permissions[perm.replace('+', '').replace('-', '').toUpperCase()] =
      perm.startsWith('+') ? true : perm.startsWith('-') ? false : null;
	});

	msg.guild.channels.cache.forEach((channel) => {
		channel.updateOverwrite(args[0], permissions).catch((err) => {
			Bot.emit('error', err, 'changePermission // #54', msg.channel);
		});
	});
	msg.channel.send('Done');
};
module.exports.help = {
	name: 'changepermission',
	description: 'Changepermission of a role or user in all channels.',
	usage: '-changepermission +/-flags',
	module: 'Utility',
	aliases: ['cp'],
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
