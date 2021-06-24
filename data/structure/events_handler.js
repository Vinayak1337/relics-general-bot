const { readdirSync } = require('fs');
const { join } = require('path');
const filePath = join(__dirname, '..', 'djsEvents');

module.exports.run = (Bot) => {
	Bot.once('ready', () => {
		const eventFiles = readdirSync(filePath);
		for (const eventFile of eventFiles) {
			const event = require(`${filePath}/${eventFile}`);
			const eventName = eventFile.split('.').shift();
			Bot.on(eventName, event.bind(null, Bot));
		}
		console.log(`${eventFiles.length} events has been successfully loaded!`);
		Bot.emit('ready');
	});
};
