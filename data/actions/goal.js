module.exports.run = (Bot, msg, args) => {
  if (!args[0])
    return msg.channel.send(
      'Increase or decrease Goal.\n\nUsage:\n`-goal [number]`\nTo decrease use [-]',
    );
  const allowed = /^[0-9+-]+$/;
  if (!args[0].match(allowed))
    return msg.channel.send(
      'Numbers and [+/-] are only allowed in order to increase or decrease the goal.',
    );
  const channel = Bot.channels.cache.get('706155334116311060');
  const int = parseInt(channel.name.replace('┃Goal: ', '')) + parseInt(args[0]);
  channel.edit({
    name: '┃Goal: ' + int,
  });
  return msg.channel.send(
    `${args[0].startsWith('-') ? 'Dcreased' : 'Increased'} ${args[0]
      .replace('-', '')
      .replace('+', '')}`,
  );
};
module.exports.help = {
  name: 'goal',
  description: 'To change goal.',
  usage: '-goal (number)',
  module: 'Utility',
  aliases: ['g'],
};

module.exports.requirements = {
  userPerms: [],
  BotPerms: [],
  ownerOnly: false,
  adminOnly: true,
  guild: '328479586297839618',
  role: '',
  channel: '',
};
