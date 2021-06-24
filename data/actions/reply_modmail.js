const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, msg, args) => {
	const doc = await client.modmail.cache.find((t) => t.channelId === msg.channel.id);
	const em = new MessageEmbed();
	if (!doc) {
		return await msg.reply(
			em.setDescription('This is not a ticket').setColor(client.red),
		);
	}
	const ticketAuthor = client.users.cache.get(doc.id);
	if (!ticketAuthor) return deleteTicket();

	em.setDescription(args.join(' '))
		.setColor(client.blue)
		.setTitle('Support Reply')
		.attachFiles(msg.attachments.map((a) => a.url));
	try {
		await ticketAuthor.send(ticketAuthor.toString(), em);
	}
	catch (error) {
		if (error.message.startsWith('Cannot send')) return deleteTicket();
		msg.reply(
			em.setDescription(
				`Error while sending message:\n\`\`\`\n${error.message}\n\`\`\``,
			),
		);
	}
	await msg.channel.send(ticketAuthor.toString(), em);

	async function deleteTicket() {
		await msg.reply(
			em.setDescription(
				'Ticket author not found, this ticket will be deleted in 7 seconds.',
			),
		);
		setTimeout(async () => {
			client.emit(
				'deleteTicket',
				msg,
				'Author was not found',
				doc.ticketId,
				doc.createdAt,
			);
			await msg.channel.delete();
			const doc2 = await client.modmail.model.findOne({ id: doc.id });
			doc2.channelId = null;
			doc2.createdTicket = null;
			doc2.createdAt = null;
			doc2.onFaq = false;
			doc2.ticketId = null;
			await doc2.save();
			client.modmail.cache.set(doc2.id, doc2);
		}, 7000);
		return;
	}
};

module.exports.help = {
	name: 'reply',
	description: 'Send a reply to a modmail ticket.',
	usage: '-reply (message)',
	module: 'Modmail',
	aliases: ['r'],
};

module.exports.requirements = {
	clientPerms: [],
	ownerOnly: false,
	adminOnly: false,
	guild: '',
	role: '791746502867288085',
	channel: '',
};
