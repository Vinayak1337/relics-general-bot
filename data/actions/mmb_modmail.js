module.exports.run = (Bot, msg, args) => {
  const user = Bot.users.cache.get(args[0]);

  if (!user)
    return msg.channel.send(
      `Not found any user with provided id: ${args[0]}.\nIf you didn't provide an id then provide an id to add someone to modmail ban.`,
    );

  const data = Bot.readJsFile('globals');
  if (data[user.id]) {
    if (data[user.id].banned) {
      data[user.id].banned = false;
    } else {
      data[user.id].banned = true;
    }
  } else {
    data[user.id] = {
      banned: true,
    };
  }
  Bot.emit('writeJsFile', data, 'globals.csv', 'mmb modmail, #17');
  msg.channel.send(
    `${
      data[user.id].banned ? `Added ${user.tag} to` : `Removed ${user.tag} from`
    } modmail ban.`,
  );
};

module.exports.help = {
  name: 'mmb',
  description: 'Add or remove anyone to modmail ban.',
  usage: '-mmb user',
  module: 'Modmail',
};

module.exports.requirements = {
  BotPerms: [],
  ownerOnly: false,
  adminOnly: false,
  guild: '',
  role: '791746502867288085',
  channel: '',
};
