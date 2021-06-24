const fs = require('fs');

module.exports.run = (Bot, msg, args) => {
  if (!args[0])
    return msg.channel.send(
      "Get a file of members' id of a role.\n\nUsage:\n`-membersid role-id`",
    );
  if (!msg.guild.roles.cache.get(args[0]))
    return msg.channel.send(
      `Didn't find any role with provided id ${args[0]}. If it wasn't an id then provide an id.`,
    );

  const role = msg.guild.roles.cache.get(args[0]);
  const data = role.members.map((m) => m.user.id);
  fs.writeFile('./text.txt', data.join('\n\n'), (err) => {
    if (err) return msg.channel.send(err.message);
    msg.channel
      .send({
        files: [
          {
            attachment: './text.txt',
            name: 'text.txt',
          },
        ],
      })
      .then(() => {
        fs.unlink('./text.txt', function (err) {
          if (err) return msg.channel.send(err.message);
        });
      });
  });
};
module.exports.help = {
  name: 'membersid',
  description: "Get a file of members' id of a role.",
  usage: '-membersid (role_id)',
  module: 'Utility',
  aliases: ['mi'],
  // command name identifier
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
