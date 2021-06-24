const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
  const em = new Discord.MessageEmbed()
    .setColor(Bot.color)
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
    .setThumbnail(msg.guild.iconURL({ dynamic: true }))
    .setTimestamp();

  if (!args[0]) {
    const obj = {};
    obj.Color = [];
    obj.Modmail = [];
    obj.Utility = [];
    obj.Other = [];
    obj.Webhook = [];

    const commands = Bot.commands;
    commands.sort(compare);
    commands.forEach((command) => {
      if (command.help.name === 'DM') return;
      if (command.requirements.ownerOnly && !Bot.owners.includes(msg.author.id))
        return;
      if (
        command.requirements.adminOnly &&
        !(
          msg.member.permissions.has('ADMINISTRATOR') ||
          Bot.owners.includes(msg.author.id)
        )
      )
        return;
      if (
        command.requirements.guild &&
        !(msg.guild.id === command.requirements.guild)
      )
        return;
      if (
        command.requirements.role &&
        !msg.member.roles.cache.has(command.requirements.role)
      )
        return;

      obj[command.help.module].push(`\`${command.help.name}\``);
    });
    if (obj.Color[0])
      em.addField('\u200B', `${obj.Color.join(', ')}\n\n`, false);
    if (obj.Modmail[0])
      em.addField('\u200B', `${obj.Modmail.join(', ')}\n\n`, false);
    if (obj.Utility[0])
      em.addField('\u200B', `${obj.Utility.join(', ')}\n\n`, false);
    if (obj.Other[0])
      em.addField('\u200B', `${obj.Other.join(', ')}\n\n`, false);
    if (obj.Webhook[0])
      em.addField('\u200B', `${obj.Webhook.join(', ')}\n\n`, false);

    msg.channel.send(
      em.setFooter(
        'Use -h commandName to get more help on an individual command',
      ),
    );

    // eslint-disable-next-line no-inner-declarations
    function compare(a, b) {
      const A = a.help.module.toUpperCase();
      const B = b.help.module.toUpperCase();

      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else if (A < B) {
        comparison = -1;
      }
      return comparison;
    }
  } else if (args[0]) {
    const command =
      Bot.commands.get(args[0].toLowerCase()) ||
      Bot.aliases.get(args[0].toLowerCase());
    if (!command) return noCommand();
    if (command.requirements.ownerOnly && !Bot.owners.includes(msg.author.id))
      return noCommand();
    if (
      command.requirements.adminOnly &&
      !(
        msg.member.permissions.has('ADMINISTRATOR') ||
        Bot.owners.includes(msg.author.id)
      )
    )
      return noCommand();
    if (
      command.requirements.guild &&
      !(msg.guild.id === command.requirements.guild)
    )
      return noCommand();
    if (
      command.requirements.role &&
      !msg.member.roles.cache.has(command.requirements.role)
    )
      return noCommand();

    em.setTitle('Command name: ' + command.help.name);
    em.setDescription(`
  Description: ${command.help.description}
  Usage:
  \`${command.help.usage}\`${
      command.help.aliases && command.help.aliases[0]
        ? `\`\nAlises: ${command.help.aliases.join('`, `')}\``
        : ''
    }${command.requirements.ownerOnly ? '\n**Owner Only**' : ''}${
      command.requirements.adminOnly ? '\n**Admin Only**' : ''
    }${
      command.requirements.guild
        ? `\nCan only be used in **${
            Bot.guilds.cache.get(command.requirements.guild).name
          }**`
        : ''
    }${
      command.requirements.role
        ? `\nCan only be used with role **${
            msg.guild.roles.cache.get(command.requirements.role).name
          }**`
        : ''
    }${
      command.requirements.channel
        ? `\nCan only be used in channel **${Bot.channels.cache
            .get(command.requirements.channel)
            .toString()}**`
        : ''
    }${
      command.userLimits
        ? `\nCan use this command ${command.userLimits.rateLimit} times in ${
            command.userLimits.cooldown / 1000
          } seconds.`
        : ''
    }${
      command.serverLimits
        ? `\nCan use this command ${command.serverLimits.rateLimit} times in ${
            command.serverLimits.cooldown / 1000
          } seconds.`
        : ''
    }
  `);
    msg.channel.send(em);

    // eslint-disable-next-line no-inner-declarations
    function noCommand() {
      return msg.channel.send(`There's no command named ${args[0]}.`);
    }
  }
};
module.exports.help = {
  name: 'help',
  description: 'To get help about commands',
  usage: '-help',
  module: 'Other',
  aliases: ['h'],
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
