const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
  const em = new Discord.MessageEmbed().setTimestamp().setColor('RED');
  if (!args[0])
    return msg.channel.send(
      em.setDescription(
        'Shows you the members list of club role.\n\nUsage:\n`-members club_name/club_role_name`',
      ),
    );
  switch (args.length) {
    case 1:
      {
        const role = msg.guild.roles.cache.find((r) =>
          r.name.toLowerCase().endsWith(args[0].toLowerCase()),
        );
        if (!role)
          return msg.channel.send(
            `Didn't find any role with argument ${args[0]}`,
          );
        if (!role.name.includes('Relics'))
          return msg.channel.send("This isn't a Relics club role");
        const names = role.members.map((m) => m.displayName);
        names.sort();

        if (!names.join('\n').length > 2048) {
          return msg.channel.send(
            em
              .setColor(Bot.color)
              .setDescription(names.join('\n'))
              .setFooter(`Members count: ${names.length}`),
          );
        } else {
          const namesPart = [];
          const namesLastPart = [];
          names.forEach((name) => {
            if ((namesPart.join('\n') + '\n' + name).length < 2048) {
              namesPart.push(name);
            } else {
              namesLastPart.push(name);
            }
          });
          if (namesLastPart[0]) {
            em.addField('\u200B', namesLastPart.join('\n'));
          }
          msg.channel.send(
            em
              .setDescription(namesPart.join('\n'))
              .setColor(Bot.color)
              .setFooter(`Members count: ${names.length}`),
          );
          console.log(namesPart.length);
        }
      }
      break;

    case 2:
      {
        let role = msg.guild.roles.cache.find((r) =>
          r.name.toLowerCase().endsWith(args[0].toLowerCase()),
        );

        if (!role)
          role = msg.guild.roles.cache.find((r) =>
            r.name.toLowerCase().endsWith(args[1].toLowerCase()),
          );

        if (!role)
          return msg.channel.send(
            `Didn't find any role with arguments ${args[0]} & ${args[1]}`,
          );

        if (!role.name.includes('Relics'))
          return msg.channel.send("This isn't a Relics club role");
        const names = role.members.map((m) => m.displayName);
        names.sort();
        if (!names.join('\n').length > 2048) {
          return msg.channel.send(
            em
              .setColor(Bot.color)
              .setDescription(names.join('\n'))
              .setFooter(`Members count: ${names.length}`),
          );
        } else {
          const namesPart = [];
          const namesLastPart = [];
          names.forEach((name) => {
            if ((namesPart.join('\n') + '\n' + name).length < 2048) {
              namesPart.push(name);
            } else {
              namesLastPart.push(name);
            }
          });
          if (namesLastPart[0]) {
            em.addField('\u200B', namesLastPart.join('\n'));
          }
          msg.channel.send(
            em
              .setDescription(namesPart.join('\n'))
              .setColor(Bot.color)
              .setFooter(`Members count: ${names.length}`),
          );
          console.log(namesPart.length);
        }
      }
      break;
  }
};
module.exports.help = {
  name: 'members',
  description: 'Get members list of club role.',
  usage: '-members (club_name)',
  module: 'Utility',
  aliases: ['m'],
};

module.exports.requirements = {
  userPerms: [],
  BotPerms: [],
  ownerOnly: false,
  adminOnly: false,
  guild: '',
  role: '653722596143267870',
  channel: '',
};
