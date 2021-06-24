const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
  if (!args[0])
    return msg.channel.send(
      'Suggest any suggestion to the server.\n\nUsage:\n`-suggest message`',
    );

  Bot.channels.cache
    .get('677121048948375552')
    .send(
      new Discord.MessageEmbed()
        .setColor(Bot.color)
        .setDescription(args.join(' '))
        .setThumbnail(msg.guild.iconURL({ dynamic: true }))
        .setAuthor(
          msg.author.tag,
          msg.author.displayAvatarURL({ dynamic: true }),
        )
        .setFooter(
          "👍 - I like the idea | 👎 - I don't like the idea | ❗ - Already possible",
        )
        .setTimestamp()
        .setTitle('New Suggestion'),
    )
    .then(() => {
      msg.react('👍');
      msg.react('👎');
      msg.react('❗');
    });
};
module.exports.help = {
  name: 'suggest',
  description: 'Suggest any suggestion to the server.',
  usage: 'usage of the command',
  module: 'Utility',
  aliases: ['s'],
};

module.exports.requirements = {
  userPerms: [],
  BotPerms: [],
  ownerOnly: false,
  adminOnly: false,
  guild: '328479586297839618',
  role: '',
  channel: '',
};
