const Discord = require('discord.js');
const access = require('request');

module.exports.run = (Bot, msg, args) => {
  if (!args[0])
    return msg.channel.send(
      'Get your text in trumpt tweet.\n\nUsage:\n`-trumptweet message`',
    );

  const input = args.join(' ');
  access(
    'https://nekobot.xyz/api/imagegen?type=trumptweet&text=' + input,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        return msg.channel.send(
          new Discord.MessageEmbed()
            .setImage(JSON.parse(body).message)
            .setColor(Bot.color)
            .setTimestamp(),
        );
      } else {
        msg.channel.send('Invaild Arguments ' + input);
      }
    },
  );
};
module.exports.help = {
  name: 'trumptweet',
  description: 'Get your text in trumpt tweet',
  usage: 'usage of the command',
  module: 'Other',
  aliases: ['tt'],
  // command name identifier
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
