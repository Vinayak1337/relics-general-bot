const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
  if (!args[0])
    return msg.channel.send(
      'Send any message/image to all the stored hooks.\n\nUsage:\n`-sendhooks message/image`',
    );
  if (!(args[1] || msg.attachments.size > 0))
    return msg.channel.sed(
      'Please provide the message/image you want to send.\n\nUsage:\n`-sendhooks message/image`',
    );

  const hooks = Bot.readJsFile('globals').webhooks;

  hooks.forEach((obj) => {
    const hook = new Discord.WebhookClient(obj.id, obj.token);
    if (args[1] && msg.attachments.size > 0)
      hook.send(args.slice(1).join(' '), {
        files: msg.attachments.map((at) => at.url),
      });
    else if (args[1] && !(msg.attachments.size > 0))
      hook.send(args.slice(1).join(' '));
    else if (!args[1] && msg.attachments.size > 0)
      hook.send({ files: msg.attachments.map((at) => at.url) });
  });

  return msg.channel.send('Successfully sent message to the hooks.');
};
module.exports.help = {
  name: 'sendhooks',
  description: 'Send any message/image to all the stored hooks.',
  usage: '-sendhooks message/image',
  module: 'Webhook',
  aliases: ['shs'],
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
