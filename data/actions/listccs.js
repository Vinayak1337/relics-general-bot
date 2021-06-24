const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = (Bot, msg) => {
  const roleIDs = Bot.readJsFile('globals')[msg.guild.id].colorList;
  const colorHex = [];
  const toShow = [];
  roleIDs.forEach((id, int) => {
    const role = msg.guild.roles.cache.get(id);
    if (role) {
      if (int % 3 === 0) {
        colorHex.push('');
        toShow.push('');
      }
      colorHex.push(role.hexColor);
      toShow.push(`${int + 1}. - ${role.toString()} - ${role.hexColor}`);
    }
  });
  fs.writeFile('./listCss.txt', colorHex.join('\n'), (err) => {
    (async () => {
      if (err) return msg.channel.send(err.message);

      const msg2 = await Bot.channels.cache.get('794609900638306314').send({
        files: [
          {
            attachment: './listCss.txt',
            name: 'listCss.txt',
          },
        ],
      });

      fs.unlink('./listCss.txt', function (err) {
        if (err) return msg.channel.send(err.message);
      });
      const url = msg2.attachments.first().url;
      const em = new Discord.MessageEmbed()
        .setAuthor(
          msg.author.tag,
          msg.author.displayAvatarURL({ dynamic: true }),
        )
        .setThumbnail(msg.guild.iconURL({ dynamic: true }))
        .setDescription(
          `**${toShow.join(
            '\n',
          )}**\n\n[Click here to download colors' hex](${url})`,
        )
        .setTitle('Hex Codes of color roles')
        .setColor(Bot.color);
      msg.channel.send(em);
      msg2.delete({ timeout: 36e5 / 2 });
    })();
  });
};
module.exports.help = {
  name: 'listccs',
  description: 'Get hex codes of color roles.',
  usage: '-listcss',
  module: 'Color',
  aliases: ['lc'],
  // command name identifier
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
