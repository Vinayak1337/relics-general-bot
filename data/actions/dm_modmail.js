const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, msg) => {
	let doc = client.modmail.cache.get(msg.author.id);
	if (!doc) {
		doc = await new client.modmail.model({ id: msg.author.id });
		client.modmail.cache.set(doc.id, doc);
	}
	const em = new MessageEmbed();
	if (doc.banned) {
		return msg.reply(
			em
				.setDescription('You are banned from using modmail.')
				.setColor(client.red),
		);
	}
	switch (doc.createdTicket) {
	case true:
		{
			const channel = client.channels.cache.get(doc.channelId);
			if (!channel) return createTicket();
			channel.send(
				em
					.setColor(client.green)
					.setDescription(msg.content)
					.setFooter(`Author Id - ${msg.author.id}, Created at`)
					.setTitle('Ticket Author reply')
					.setAuthor(msg.author.tag)
					.setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
					.attachFiles(msg.attachments.map((a) => a.url))
					.setTimestamp(doc.createdAt),
			);
		}
		break;

	default:
		createTicket();
	}

	async function createTicket() {
		if (doc.onFaq) return handleOnFaq();
		doc.ticketId = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, '')
			.substr(0, 5);
		doc.onFaq = true;
		doc.createdAt = Date.now();
		doc.createdTicket = false;
		doc.channelId = null;
		await doc.save();
		const data = client.readJsFile('globals');

		client.emit(
			'createTicket',
			msg,
			doc.ticketId,
			doc.createdAt,
			'Created a virtual ticket',
		);
		await msg.reply(
			em
				.setDescription(
					'Before we create a ticket with staff please read through this FAQ first.',
				)
				.setColor(client.yellow),
		);
		const server = client.guilds.cache.get('328479586297839618');
		em.setAuthor(server.name)
			.setThumbnail(server.iconURL({ dynamic: true }))
			.setColor(client.blue);
		await msg.channel.send(
			em.setDescription(`${data.faq}`).setFooter('Page 1/2'),
		);
		await msg.channel.send(
			em.setDescription(`${data.faq2}`).setFooter('Page 2/2'),
		);

		setTimeout(async () => {
			await msg.reply(
				em
					.setDescription(
						`If you still need the help then type the following token given below to create a ticket with staff.\n**__${doc.ticketId}__**\n\nNote:- Modmail is to provide assistance in relics, the issue should be game or discord related and most importantly related to relics. Other than that is irrelevant to us. So whenever you are going to create a ticket with staff make sure you need assistance something related to relics. Asking irrelevant stuff will end in a modmail ban.\n\nIf you fail to create ticket with given token within an hour, then this window will be closed.\nIf you do not need any assistance anymore then simply type \`close\` to close this virtual window.`,
					)
					.setFooter('')
					.setColor(client.yellow),
			);
		}, 3000);

		setTimeout(async () => {
			if (!doc.onFaq) return;
			doc.onFaq = false;
			doc.createdTicket = false;
			doc.channelId = null;
			client.emit(
				'deleteTicket',
				`Closed virtual ticket of ${msg.author.tag} by ${client.user.tag} for not responding / creating a ticket from an hour`,
				doc.ticketId,
				doc.createdAt,
			);
			await doc.save();
			await msg.reply('Time up! Your virtual ticket has been deleted.');
		}, 36e5);
	}

	function handleOnFaq() {
		if (msg.content.toLowerCase() === doc.ticketId) return createNewTicket();
		if (msg.content.toLowerCase() === 'close') return closeVirtualWindow();
		client.emit(
			'updateTicket',
			msg,
			doc.ticketId,
			doc.createdAt,
			'Sent message before creating ticket',
		);
	}

	async function closeVirtualWindow() {
		doc.onFaq = false;
		doc.createdTicket = false;
		doc.channelId = null;
		client.emit(
			'deleteTicket',
			`Virtual ticket has been closed of ${msg.author.tag} by himself.`,
			doc.ticketId,
			doc.createdAt,
			msg.author,
		);
		await doc.save();
		await msg.reply('Your virtual ticket has been deleted.');
	}

	async function createNewTicket() {
		const channel = await client.guilds.cache
			.get('695636626503893042')
			.channels.create(msg.author.tag, {
				parent: '695648801503051786',
				permissionOverwrites: [
					{
						id: '695636626503893042',
						deny: ['VIEW_CHANNEL'],
					},
					{
						id: '695636842967728228',
						allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
					},
				],
			});

		doc.channelId = channel.id;
		doc.createdTicket = true;
		doc.onFaq = false;
		doc.save();
		client.emit(
			'createTicket',
			msg,
			doc.ticketId,
			doc.createAt,
			'Created a ticket with the staff',
		);
		await msg.reply(
			em
				.setColor(client.blue)
				.setDescription(
					'Your ticket has been successfully created with staff.\nPlease tell us how may we help you?',
				),
		);
		await channel.send(
			'<&695636842967728228>',
			em
				.setColor(client.blue)
				.setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
				.setAuthor(msg.author.tag)
				.setTitle('Message sent to author')
				.setDescription(
					'Your ticket has been successfully created with staff.\nPlease tell us how may we help you?',
				)
				.setFooter(`Author Id - ${msg.author.id}, Created at`)
				.attachFiles(msg.attachments.map((a) => a.url))
				.setTimestamp(doc.createdAt),
		);
	}
};

module.exports.help = {
	name: 'DM',
	module: 'Modmail',
};

module.exports.requirements = {
	clientPerms: [],
	ownerOnly: false,
	adminOnly: false,
	guild: '',
	role: '',
	channel: '',
};
