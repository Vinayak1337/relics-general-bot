module.exports = (Bot, member) => {
	if (!member.guild.id === '328479586297839618') return;
	const channel = Bot.channels.cache.get('665239180393316413');
	return channel.edit({
		name:
      '┃Members: ' + member.guild.members.cache.filter((m) => !m.user.bot).size,
	});
};
