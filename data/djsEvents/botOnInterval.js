const Discord = require('discord.js');

module.exports = (Bot) => {
	setInterval(function() {
		(async () => {
			if (Bot.noticeMsg) {
				Bot.noticeMsg.delete().catch((err) => {
					Bot.emit('error', err, 'onInterval Event');
				});
			}
			const channel = Bot.channels.cache.get('340880569162399774');
			Bot.noticeMsg = await channel
				.send(
					new Discord.MessageEmbed()
						.setColor('YELLOW')
						.setDescription(
							'⚠️ Important ⚠️\nRegardless of whether you are in our clubs or not, you need to send a screenshot of your profile like the one below to <#340880569162399774> in order to get access to the rest of the server.\nThen wait for a mod to verify you.\nNote:- Do not ping any Mod or Admin for roles, or 1 week mute, no exceptions.',
						)
						.setImage(
							'https://cdn.discordapp.com/attachments/340892971681710080/787765044191952916/Screenshot_2020-01-24-23-15-55-385_com.png',
						)
						.setTimestamp()
						.setThumbnail(
							'https://media.discordapp.net/attachments/696305061852348447/696305121834958848/dribble.gif',
						)
						.setAuthor(Bot.guilds.cache.get('328479586297839618').name),
				)
				.catch((err) => {
					Bot.emit('error', err, 'onInterval Event');
				});
		})();
	}, 36e5);
};
