module.exports.run = (Bot, msg, args) => {
  if (!msg.member.roles.cache.has('653722596143267870')) return;
  if (!(args[0] || msg.attachments.size > 0))
    return msg.channel.send(
      `Send message/image via bot.\n\nUsage:\n\`-say [channel] (message)\`${Bot.argCondition}`,
    );

  let channel;
  if (args[0].startsWith('<#')) channel = msg.mentions.channels.first();
  else channel = Bot.channels.cache.get(args[0]);
  if (channel && !(args[1] || msg.attachments.size > 0))
    return msg.channel.send(
      `Please provide message/image to send\n\nUsage:\n\`-say [channel] (message)\`${Bot.argCondition}`,
    );
  if (channel) {
    if (msg.attachments.size > 0) {
      channel
        .send(`${args.slice(1).join(' ')}`, {
          files: msg.attachments.map((at) => at.url),
        })
        .catch((err) => {
          Bot.emit('error', err, 'say // #9', msg.channel);
        });
    } else {
      channel.send(`${args.slice(1).join(' ')}`).catch((err) => {
        Bot.emit('error', err, 'say // #9', msg.channel);
      });
    }
  } else if (msg.attachments.size > 0) {
    msg.channel.send(args.join(' '), {
      files: msg.attachments.map((at) => at.url),
    });
  } else {
    msg.channel.send(args.join(' '));
  }
  return msg.delete();
};
module.exports.help = {
  name: 'say',
  description: 'Send text or image via bot in any channel.',
  usage: '-say message/image',
  module: 'Utility',
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
