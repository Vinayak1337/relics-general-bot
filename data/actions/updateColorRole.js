const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
  if (!msg.guild.id === '328479586297839618') return;
  const em = new Discord.MessageEmbed()
    .setTimestamp()
    .setThumbnail(msg.guild.iconURL({ dynamic: true }))
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }));
  if (!args[0])
    return msg.channel.send(
      em
        .setTitle('Add or remove color role')
        .setDescription('Usage:\n-color Add/Remove color-role-id')
        .setColor('RED'),
    );
  if (
    args[0] &&
    !(args[0].toLowerCase() === 'add' || args[0].toLowerCase() === 'remove')
  )
    return msg.channel.send(
      em
        .setTitle('Add or remove color role')
        .setDescription(
          'Please provide add/remove as 1st argument whether you want to add or remove a color role.\nUsage:\n-color Add/Remove color-role-id',
        )
        .setColor('RED'),
    );
  if (!args[1])
    return msg.channel.send(
      em
        .setTitle(
          `${args[0].charAt(0).toUpperCase() + args[0].slice(1)} color role`,
        )
        .setDescription(
          `Please provide an id of color role for ${
            args[0].toLowerCase() === 'add' ? 'adding' : 'removing'
          } a role.\nUsage:\n-color Add/Remove color-role-id`,
        )
        .setColor('RED'),
    );
  if (!msg.guild.roles.cache.get(args[1]))
    return msg.channel.send(
      em
        .setTitle(
          `${args[0].charAt(0).toUpperCase() + args[0].slice(1)} color role`,
        )
        .setDescription(
          `Didn't find any role with provided id ${args[0]}, if it was not an id then please provide an id.\nUsage:\n-color Add/Remove color-role-id`,
        )
        .setColor('RED'),
    );
  if (msg.guild.roles.cache.get(args[1]).managed)
    return msg.channel.send(
      em
        .setTitle(
          `${args[0].charAt(0).toUpperCase() + args[0].slice(1)} color role`,
        )
        .setDescription(
          "Provided role is managed, it can't be assigned to any user, please provide an appropriate role.",
        )
        .setColor('RED'),
    );

  const colors = Bot.readJsFile('globals')[msg.guild.id].colorList;
  const role = msg.guild.roles.cache.get(args[1]);
  if (args[0].toLowerCase() === 'add') {
    if (colors.includes(args[1]))
      return msg.channel.send(
        em
          .setColor('RED')
          .setTitle('Role already exist in the list')
          .setDescription(
            `Provided role ${role.name} already added in the list.`,
          ),
      );
  } else if (!colors.includes(args[1])) {
    return msg.channel.send(
      em
        .setColor('RED')
        .setTitle("Role doesn't exist in the list")
        .setDescription(`Didn't find provided role ${role.name} in the list.`),
    );
  }

  switch (args[0].toLowerCase()) {
    case 'add':
      {
        const data = Bot.readJsFile('globals');
        data[msg.guild.id].colorList.push(role.id);
        Bot.emit('writeJsFile', data, 'globals', 'Update Color role, #19');
        msg.channel.send(
          em
            .setColor(role.color)
            .setTitle('Added role')
            .setDescription(
              `Role ${role.toString()} has been added to the list.`,
            ),
        );
      }
      break;

    case 'remove':
      {
        const data = Bot.readJsFile('globals.csv');
        const index = data[msg.guild.id].colorList.indexOf(role.id);
        data[msg.guild.id].colorList.splice(index, 1);
        Bot.emit('writeJsFile', data, 'globals.csv', 'Update Color role, #27');
        msg.channel.send(
          em
            .setColor(role.color)
            .setTitle('Removed role')
            .setDescription(
              `Role ${role.toString()} has been removed from the list.`,
            ),
        );
      }
      break;

    default: {
      return msg.channel.send('Something wrong happened, #23.');
    }
  }
};
module.exports.help = {
  name: 'color',
  description: 'Add or remove any role from color roles list.',
  usage: 'color add/remove role_id',
  module: 'Color',
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
