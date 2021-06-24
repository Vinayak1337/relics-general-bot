module.exports.run = (_Bot, msg) => {
  return msg.channel.send('https://discord.gg/TXvxyR9');
};
module.exports.help = {
  name: 'link',
  description: "To get main server' permanent link.",
  usage: '-link',
  module: 'Other',
  aliases: ['invitelink', 'invite'],
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
