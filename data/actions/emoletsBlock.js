module.exports.run = (Bot, msg, args) => {
	if (!args[0]) {
		return msg.channel.send(
			'Get emoji text in blocks to copy.\n\nUsage:\n`-emoletsBlock (message)`',
		);
	}
	let words = args.join(' ');

	if (!words) {
		words = msg.author.tag;
	}

	let word = '';

	function GetCharacter(input) {
		if ('abcdefghijklmnopqrstuvwxyz'.includes(input)) {
			return ':regional_indicator_' + input + ':';
		}
		else {
			switch (input) {
			case '0':
				return ':zero:';
			case '1':
				return ':one:';
			case '2':
				return ':two:';
			case '3':
				return ':three:';
			case '4':
				return ':four:';
			case '5':
				return ':five:';
			case '6':
				return ':six:';
			case '7':
				return ':seven:';
			case '8':
				return ':eight:';
			case '9':
				return ':nine:';
			case '!':
				return ':grey_exclamation:';
			case '<':
				return ':arrow_backward:';
			case '>':
				return ':arrow_forward:';
			case ',':
				return ',';
			case '.':
				return '.';
			case '@':
				return '@';
			case '?':
				return ':question:';
			case '+':
				return ':heavy_plus_sign:';
			case '-':
				return ':heavy_minus_sign:';
			case '*':
				return ':heavy_multiplication_x:';
			case '/':
				return ':heavy_division_sign:';
			case '$':
				return ':heavy_dollar_sign:';
			case '®️':
				return ':registered:';
			case '©️':
				return ':copyright:';
			case '™️':
				return ':tm:';
			case '#':
				return ':hash:';
			default:
				return ' ';
			}
		}
	}

	words
		.toLowerCase()
		.split('')
		.forEach(function(char) {
			word += char ? GetCharacter(char) : ' ';
		});

	if (word && word.length < 1999) {
		msg.channel.send(`\`\`\`\n${word}\n\`\`\``);
	}
	else {
		msg.channel.send(
			'That message is to long! After the conversion you had ' +
        (word ? word.length : 'n/a') +
        '/1999 characters',
		);
	}
};
module.exports.help = {
	name: 'emoletsblock',
	description: 'Get emoji text in blocks to copy.',
	usage: '-emoletsBlock (message)',
	module: 'Other',
	aliases: ['emb'],
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
