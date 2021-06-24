const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
	if (!args[0]) {
		return msg.channel.send(
			'Add hook to the list for org announcements from Relics ❯ Brawl Stars.\n\nUsage:\n`-addhook webhook_link`',
		);
	}
	if (!args[0].includes('/')) {return msg.channel.send(`Provided webhook link is incorrect ${args[0]}.`);}

	const fields = args[0]
		.replace('https://discord.com/api/webhooks/', '')
		.split('/');
	const data = Bot.readJsFile('globals');
	const obj = {};
	obj.id = fields[0];
	obj.token = fields[1];

	const hook = new Discord.WebhookClient(obj.id, obj.token);

	if (!hook) {
		return msg.channel.send(
			`Didn't able to create webhook with given link ${args[0]}`,
		);
	}

	data.webhooks.push(obj);

	Bot.emit('writeJsFile', data, 'globals.csv', 'addhook, #21', msg.channel);

	return msg.channel.send('Successfully added hook.');
};
module.exports.help = {
	name: 'addhook',
	description:
    'Add hook to the list for org announcements from Relics ❯ Brawl Stars.',
	usage: '-addhook webhook_link',
	module: 'Webhook',
	aliases: ['ah'],
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
