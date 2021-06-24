module.exports.run = (_Bot, msg) => {
  msg.guild.channels.cache.forEach((ch) => {
    if (ch.viewable && ch.manageable) {
      if (ch.type === 'category') {
        category(ch);
      } else {
        text(ch);
      }
    }
  });

  function text(ch) {
    if (!ch.name.startsWith('┃')) {
      ch.edit({ name: '┃' + ch.name }).catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  function category(ch) {
    if (!ch.name.startsWith('❯❯')) {
      if (ch.name.startsWith('❯')) {
        ch.edit({ name: '❯' + ch.name }).catch((err) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        ch.edit({ name: '❯❯' + ch.name }).catch((err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  }

  msg.channel.send('Done!');
};

module.exports.help = {
  name: 'updatechannels',
  description: 'Update all the channels with ❯❯ & ┃',
  usage: '-updatechannels',
  module: 'Utility',
  aliases: ['uch'],
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

module.exports.serverLimits = {
  rateLimit: 1,
  cooldown: 5e3,
};
