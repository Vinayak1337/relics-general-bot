module.exports = (Bot) => {
	console.log(`Logged in as ${Bot.user.tag}`);
	Bot.user.setPresence({
		status: 'online',
		activity: { name: 'DM me for help!', type: 'PLAYING' },
	});
	Bot.statusInt = 0;
	Bot.statusInt++;
	setInterval(function() {
		changeStatus();
	}, 10000);
	Bot.mmServer = Bot.guilds.cache.get('695636626503893042');
	Bot.ready = true;
	Bot.emit('botOnInterval');

	function changeStatus() {
		switch (Bot.statusInt) {
		case 0:
			{
				Bot.user.setPresence({
					status: 'online',
					activity: { name: 'DM me for help!', type: 'PLAYING' },
				});
				Bot.statusInt++;
			}
			break;

		case 1:
			{
				Bot.user.setPresence({
					status: 'online',
					activity: { name: 'Developer: Vinayak#0001', type: 'LISTENING' },
				});
				Bot.statusInt++;
			}
			break;

		case 2:
			{
				Bot.user.setPresence({
					status: 'online',
					activity: {
						name: `${Bot.users.cache.size} users' DMs.`,
						type: 'LISTENING',
					},
				});
				Bot.statusInt++;
			}
			break;

		case 3:
			{
				Bot.user.setPresence({
					status: 'online',
					activity: { name: 'Brawl Stars', type: 'PLAYING' },
				});
				Bot.statusInt++;
			}
			break;

		case 4:
			{
				Bot.user.setPresence({
					status: 'online',
					activity: { name: 'relics', type: 'LISTENING' },
				});
				Bot.statusInt++;
			}
			break;

		case 5:
			{
				Bot.user.setPresence({
					status: 'online',
					activity: { name: 'for commands!', type: 'WATCHING' },
				});
				Bot.statusInt = 0;
			}
			break;
		}
	}
	/*
status: online/idle/invisible/dnd
activity:
{
name:
type: PLAYING/STREAMING/LISTENING/WATCHING/COMPETING
url:
}
    */
};
