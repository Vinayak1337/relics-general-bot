const access = require('request');

module.exports.run = (Bot, msg, args) => {
	if (!args[0]) {
		return msg.channel.send(
			'Convert your text into into Bold Text.\n\nUsage:\n`-ascii text`',
		);
	}
	const input = args.join(' ');
	if (input.length > 11) {return msg.channel.send('Text length should not be more than 11.');}

	access(
		'https://artii.herokuapp.com/make?text=' + input,
		function(error, response, body) {
			if (!error && response.statusCode == 200) {
				msg.channel.send('\n```' + body + '```');
			}
			else {
				msg.channel.send('Invaild Arguments ' + input);
			}
		},
	);
};
module.exports.help = {
	name: 'ascii',
	description: 'Convert your text into into Bold Text.',
	usage: '-ascii text',
	module: 'Other',
	aliases: ['a'],
};

module.exports.requirements = {
	userPerms: [],
	BotPerms: [],
	ownerOnly: false,
	adminOnly: false,
	guild: '',
	role: '',
	channel: '',
};
