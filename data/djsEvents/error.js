module.exports = (Bot, error, from, channel) => {
	console.log(error);
	Bot.channels.cache
		.get('787762836242956363')
		.send(`Error:\n${error.message}\nFrom: ${from}`);
	if (channel) return channel.send(`Error:\n${error.message}`);
};
