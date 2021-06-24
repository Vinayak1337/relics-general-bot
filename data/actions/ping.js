module.exports.run = (Bot, msg) => {
  const hrstart = process.hrtime();
  const wsping = Math.floor(Bot.ws.ping);
  msg.channel.send(`Web stock latency: \`${wsping}\`ms`).then((msg2) => {
    const hrDiff = process.hrtime(hrstart);
    msg2.edit(`Webstock latency: \`${wsping}\`ms.\nResponse time: ${
      hrDiff[0] > 0 ? `${hrDiff[0]}ms. ` : ''
    }\`${Math.round(hrDiff[1] / 1000000)}\`ms.
        `);
  });
};

module.exports.help = {
  name: 'ping',
  description:
    'A simple ping command to check the webstock latency & bot response time!',
  module: 'Utility',
  usage: '-ping',
  aliases: ['p'],
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
