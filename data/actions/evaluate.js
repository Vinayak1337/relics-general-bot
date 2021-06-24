/* eslint-disable no-shadow */
const util = require('util');
const Discord = require('discord.js');
const tags = require('common-tags');
function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}
const nl = '!!NL!!';
const nlPattern = new RegExp(nl, 'g');

let lastResult = '';
Object.defineProperty(this, '_sensitivePattern', {
  value: null,
  configurable: true,
});

module.exports.run = async (client, msg, args) => {
  args = args.join(' ');
  // Make a bunch of helpers
  let hrStart = 0;
  // eslint-disable-next-line no-unused-vars
  const reply = (val) => {
    if (val instanceof Error) {
      msg.reply(`Callback error: \`${val}\``);
    } else {
      const result = makeResultMessages(val, process.hrtime(hrStart));
      if (Array.isArray(result)) {
        for (const item of result) msg.reply(item);
      } else {
        msg.reply(result);
      }
    }
  };

  // Remove any surrounding code blocks before evaluation
  if (args.startsWith('```') && args.endsWith('```')) {
    args = args.replace(/(^.*?\s)|(\n.*$)/g, '');
  }

  // Run the code and measure its execution time
  let hrDiff;
  try {
    const hrStart = process.hrtime();
    lastResult = await eval(args);
    hrDiff = process.hrtime(hrStart);
  } catch (err) {
    return msg.reply(`Error while evaluating: \`${err}\``);
  }

  // Prepare for callback time and respond
  hrStart = process.hrtime();
  const result = await makeResultMessages(lastResult, hrDiff, args);
  if (Array.isArray(result)) {
    return result.map((item) => msg.reply(item));
  } else {
    return msg.reply(result);
  }

  function makeResultMessages(result, hrDiff, input = null) {
    const inspected = util
      .inspect(result, { depth: 0 })
      .replace(nlPattern, '\n')
      .replace(sensitivePattern(), '--snip--');
    const split = inspected.split('\n');
    const last = inspected.length - 1;
    const prependPart =
      inspected[0] !== '{' && inspected[0] !== '[' && inspected[0] !== "'"
        ? split[0]
        : inspected[0];
    const appendPart =
      inspected[last] !== '}' &&
      inspected[last] !== ']' &&
      inspected[last] !== "'"
        ? split[split.length - 1]
        : inspected[last];
    const prepend = `\`\`\`javascript\n${prependPart}\n`;
    const append = `\n${appendPart}\n\`\`\``;
    if (input) {
      return Discord.splitMessage(
        tags.stripIndents`
				*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
				\`\`\`javascript
				${inspected}
				\`\`\`
			`,
        { maxLength: 1900, prepend, append },
      );
    } else {
      return Discord.splitMessage(
        tags.stripIndents`
				*Callback executed after ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${
          hrDiff[1] / 1000000
        }ms.*
				\`\`\`javascript
				${inspected}
				\`\`\`
			`,
        { maxLength: 1900, prepend, append },
      );
    }
  }

  function sensitivePattern() {
    if (!this._sensitivePattern) {
      let pattern = '';
      if (client.token) pattern += escapeRegex(client.token);
      Object.defineProperty(this, '_sensitivePattern', {
        value: new RegExp(pattern, 'gi'),
        configurable: false,
      });
    }
    return this._sensitivePattern;
  }
};

module.exports.help = {
  name: 'eval',
  aliases: ['exec'],
  description: 'To compile a code on js,njs & djs languages',
  usage: '-eval (code)',
  module: 'Other',
};

module.exports.requirements = {
  userPerms: [],
  BotPerms: [],
  ownerOnly: true,
  adminOnly: false,
  guild: '',
  role: '',
  channel: '',
};
