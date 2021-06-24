module.exports.run = (Bot, msg, args) => {
  if (!args[0])
    return msg.channel.send(
      'Remove hook from the list.\n\nUsage:\n`-removehook webhook_link`',
    );
  if (!args[0].includes('/'))
    return msg.channel.send(`Provided webhook link is incorrect ${args[0]}.`);

  const fields = args[0]
    .replace('https://discord.com/api/webhooks/', '')
    .split('/');
  const data = Bot.readJsFile('globals');
  const obj = {};
  obj.id = fields[0];
  obj.token = fields[1];

  if (!data.webhooks.includes(obj))
    return msg.channel.send(`Didn't find ${args[0]} in the list.`);
  const index = data.webhooks.indexOf(obj);
  data.webhooks.splice(index, 1);

  Bot.emit('writeJsFile', data, 'globals.csv', 'addhook, #21', msg.channel);

  return msg.channel.send('Successfully removed hook.');
};
module.exports.help = {
  name: 'removehook',
  description: 'Remove any stored hook.',
  usage: '-removehook webhook_link',
  module: 'Webhook',
  aliases: ['rh'],
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
