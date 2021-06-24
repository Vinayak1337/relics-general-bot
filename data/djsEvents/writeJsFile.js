const fs = require('fs');

module.exports = (Bot, data, file, from, channel) => {
	fs.writeFileSync(`./data/database/${file}`, JSON.stringify(data), (err) => {
		if (err) {
			return Bot.emit('error', err, from, channel);
		}
	});
};
