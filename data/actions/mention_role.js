/* eslint-disable no-shadow */
/* eslint-disable max-statements-per-line */
const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
  const em = new Discord.MessageEmbed().setTimestamp().setColor('RED');
  if (!args[0])
    return msg.channel.send(
      em.setDescription(
        "Enable or disable mentionable permission of a role.\n\nUsage:\n`-mention on/off role`\nNote:- If there's any space in the role name with replace space with `_` underscore, e.g.: Server member -> Server_member",
      ),
    );
  if (
    args[0] &&
    !(args[0].toLowerCase() === 'on' || args[0].toLowerCase() === 'off')
  )
    return msg.channel.send(
      em.setDescription(
        "Please provide 1st argument `on` or `off` for enaling or disabling the mentionable permission from a role.\n\nUsage:\n`-mention on/off role`\nNote:- If there's any space in the role name with replace space with `_` underscore, e.g.: Server member -> Server_member",
      ),
    );
  if (!args[1])
    return msg.channel.send(
      em.setDescription(
        `Please provide a role in 2nd argument, without provided a role what am i supposed to ${
          args[0].toLowerCase() === 'on' ? 'enable' : 'disable'
        }.\nUsage:\n\`-mention on/off role\`\nNote:- If there's any space in the role name with replace space with \`_\` underscore, e.g.: Server member -> Server_member`,
      ),
    );
  if (
    args[1] &&
    !(
      msg.guild.roles.cache.get(args[1]) ||
      msg.mentions.roles.first() ||
      msg.guild.roles.cache.find(
        (r) => r.name.replace('_', ' ') === args[1].replace('_', ' '),
      ) ||
      msg.guild.roles.cache.find(
        (r) =>
          r.name.toLowerCase().replace('_', ' ') === args[1].replace('_', ' '),
      ) ||
      msg.guild.roles.cache.find((r) =>
        r.name
          .toLowerCase()
          .replace('_', ' ')
          .startsWith(args[1].replace('_', ' ')),
      ) ||
      msg.guild.roles.cache.find((r) =>
        r.name
          .toLowerCase()
          .replace('_', ' ')
          .endsWith(args[1].replace('_', ' ')),
      ) ||
      msg.guild.roles.cache.find((r) =>
        r.name
          .toLowerCase()
          .replace('_', ' ')
          .includes(args[1].replace('_', ' ')),
      )
    )
  )
    return msg.channel.send(
      em.setDescription(
        `Didn't find any role with provided argumemnt ${args[0]}. \nNote:- If there's any space in the role name with replace space with \`_\` underscore, e.g.: Server member -> Server_member`,
      ),
    );

  const role =
    msg.guild.roles.cache.get(args[1]) ||
    msg.mentions.roles.first() ||
    msg.guild.roles.cache.find(
      (r) => r.name.replace('_', ' ') === args[1].replace('_', ' '),
    ) ||
    msg.guild.roles.cache.find(
      (r) =>
        r.name.toLowerCase().replace('_', ' ') === args[1].replace('_', ' '),
    ) ||
    msg.guild.roles.cache.find((r) =>
      r.name
        .toLowerCase()
        .replace('_', ' ')
        .startsWith(args[1].replace('_', ' ')),
    ) ||
    msg.guild.roles.cache.find((r) =>
      r.name
        .toLowerCase()
        .replace('_', ' ')
        .endsWith(args[1].replace('_', ' ')),
    ) ||
    msg.guild.roles.cache.find((r) =>
      r.name
        .toLowerCase()
        .replace('_', ' ')
        .includes(args[1].replace('_', ' ')),
    );

  switch (args[0].toLowerCase()) {
    case 'on':
      {
        role
          .setMentionable(true)
          .then((role) => {
            return msg.channel.send(
              `Enabled mentionable permission to ${role.name}`,
            );
          })
          .catch((err) => {
            Bot.emit('error', err, 'mention role, #14', msg.channel);
          });
      }
      break;

    case 'off':
      {
        role
          .setMentionable(false)
          .then((role) => {
            return msg.channel.send(
              `Disabled mentionable permission from ${role.name}`,
            );
          })
          .catch((err) => {
            Bot.emit('error', err, 'mention role, #14', msg.channel);
          });
      }
      break;
  }
};
module.exports.help = {
  name: 'mention',
  description: 'Enable or disable mentionable permission of a role.',
  usage: '-mention (on/off) (role)',
  module: 'Utility',
  aliases: ['mr'],
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
