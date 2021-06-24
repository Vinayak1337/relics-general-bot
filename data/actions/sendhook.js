const Discord = require('discord.js');

module.exports.run = (_Bot, msg, args) => {
  if (!args[0])
    return msg.channel.send(
      'Send any message/image to the hook.\n\nUsage:\n`-sendhook (webhook_link) (message/image)`',
    );
  if (!args[0].includes('/'))
    return msg.channel.send(`Provided webhook link is incorrect ${args[0]}.`);
  if (!(args[1] || msg.attachments.size > 0))
    return msg.channel.sed(
      'Please provide the message/image you want to send.\n\nUsage:\n`-sendhook (webhook_link) (message/image)`',
    );

  const fields = args[0]
    .replace('https://discord.com/api/webhooks/', '')
    .split('/');
  const obj = {};
  obj.id = fields[0];
  obj.token = fields[1];

  const hook = new Discord.WebhookClient(obj.id, obj.token);

  if (!hook)
    return msg.channel.send(
      `Didn't able to create webhook with given link ${args[0]}`,
    );

  if (args[1] && msg.attachments.size > 0)
    hook.send(args.slice(1).join(' '), {
      files: msg.attachments.map((at) => at.url),
    });
  else if (args[1] && !(msg.attachments.size > 0))
    hook.send(args.slice(1).join(' '));
  else if (!args[1] && msg.attachments.size > 0)
    hook.send({ files: msg.attachments.map((at) => at.url) });

  return msg.channel.send('Successfully sent message to provided hook.');
};
module.exports.help = {
  name: 'sendhook',
  description: 'Send any message/image to the hook.',
  usage: '-sendhook (webhook_link) (message/image)',
  module: 'Webhook',
  aliases: ['sh'],
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
