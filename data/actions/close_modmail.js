const { MessageEmbed } = require('discord.js');
const htmlBuilder = require('../../htmlBuilder');
const fs = require('fs');

module.exports.run = async (client, msg) => {
	const doc = client.modmail.cache.find((t) => t.channelId === msg.channel.id);
	const em = new MessageEmbed();
	if (!doc) {
		return await msg.reply(
			em.setDescription('This is not a ticket').setColor(client.red),
		);
	}
	const ticketAuthor = client.users.cache.get(doc.id);
	await deleteTicket();
	em.setDescription(
		`Your ticket has been closed by the support team. If you need any assistance later, feel free to message here.\nYour ticket token was ${doc.ticketId}`,
	)
		.setColor(client.blue)
		.setTitle('Support Ticket was closed')
		.attachFiles(msg.attachments.map((a) => a.url));
	try {
		await ticketAuthor.send(ticketAuthor.toString(), em);
	}
	catch (error) {
		if (error.message.startsWith('Cannot send')) return;
		msg.reply(
			em.setDescription(
				`Error while sending message:\n\`\`\`\n${error.message}\n\`\`\``,
			),
		);
	}

	async function deleteTicket() {
		await msg.reply('Deleting ticket please wait...');
		const msgs = [];
		let fetchedMsgsSize = 1;
		do {
			const fetchedMsgs = await msg.channel.messages.fetch({ limit: 100, before: msgs[msgs.length - 1]?.id });
			fetchedMsgsSize = fetchedMsgs.size;
			const sortedMsgs = fetchedMsgs.sort((a, b) => b.createdTimestamp - a.createdTimestamp).map(m => m);
			if (fetchedMsgsSize) msgs.push(...sortedMsgs);
		} while (fetchedMsgsSize);
		msgs.reverse();
		const htmlBody = htmlBuilder(client, doc.ticketId, msg.channel.name, msgs);
		fs.writeFileSync(`${doc.id}.html`, htmlBody);
		const sentMsg = await msg.channel.send({ files: [{
			attachment: `./${doc.id}.html`,
			name: `${doc.id}.html`,
		}] });
		client.emit(
			'deleteTicket',
			msg,
			`Ticket was closed by **${msg.author.tag}** of **${ticketAuthor?.tag || doc.id}**`,
			doc.ticketId,
			doc.createdAt,
			sentMsg.attachments.first().url,
		);
		const doc2 = await client.modmail.model.findOne({ id: doc.id });
		doc2.channelId = null;
		doc2.createdTicket = null;
		doc2.createdAt = null;
		doc2.onFaq = false;
		doc2.ticketId = null;
		await doc2.save();
		client.modmail.cache.set(doc2.id, doc2);
		msg.channel.send('Ticket will be deleted in 3 seconds');
		setTimeout(async () => {
			await msg.channel.delete();
		}, 3000);
		fs.unlinkSync(`./${doc.id}`);
		return;
	}
};

module.exports.help = {
	name: 'close',
	description: 'Close/delete any modmail ticket',
	usage: '-close',
	module: 'Modmail',
};

module.exports.requirements = {
	BotPerms: [],
	ownerOnly: false,
	adminOnly: false,
	guild: '',
	role: '791746502867288085',
	channel: '',
};
