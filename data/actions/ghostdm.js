module.exports.run = (Bot, msg, args) => {
  if (!args[0])
    return msg.channel.send(
      `DM anyone with message/image.\n\nUsage:\n\`-dm (user) (message/image)\`${Bot.argCondition}`,
    );
  if (!(args[1] || msg.attachments.size > 0))
    return msg.channel.send(
      `Please provide the message/image you want to send.\n\nUsage:\n\`-dm (user) (message)\`${Bot.argCondition}`,
    );

  const user = msg.mentions.users.first() || Bot.users.cache.get(args[0]);
  if (!user) msg.channel.send(`Didn't find any user with argument ${args[0]}`);

  user
    .send(
      `**${msg.author.tag}**: ${args[1] ? args.slice(1).join(' ') : ''}`,
      msg.attachments.size > 0
        ? { files: msg.attachments.map((at) => at.url) }
        : '',
    )
    .catch((err) => {
      Bot.emit('error', err, 'ghostdm // #11', msg.channel);
    });
  return msg.delete();
};
module.exports.help = {
  name: 'ghostdm',
  description: 'DM anyone with any message or image',
  usage: '-dm (user) (message/image)',
  module: 'Utility',
  aliases: ['gd'],
};

module.exports.requirements = {
  userPerms: [],
  BotPerms: [],
  ownerOnly: false,
  adminOnly: true,
  guild: '',
  role: '',
  channel: '',
};

module.exports.userLimits = {
  rateLimit: 1,
  cooldown: 5000,
};
