const {
	default: ModmailProvider,
} = require('./data/ModmailProvider/ModmailProvider');
const {
	default: ModmailModel,
} = require('./data/ModmailProvider/ModmailModel');
const { Collection, Client } = require('discord.js');
const mongoose = require('mongoose');
const client = new Client();
const fs = require('fs');
const settings = require('./data/keys/settings');

client.ready = false;
client.prefix = '&';
client.blue = '#5865F2';
client.green = '#57F287';
client.red = '#ED4245';
client.yellow = '#FEE75C';
client.white = '#FFFFFF';
client.black = '#23272A';
client.modmailChannel = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.limits = new Map();
client.argCondition = '\n[] - optional\n() - required';
client.readJsFile = function(file) {
	return JSON.parse(fs.readFileSync(`./data/database/${file}.csv`, 'utf8'));
};
const commands = require('./data/structure/commands_handler');

const events = require('./data/structure/events_handler');
client.once('ready', () => {
	commands.run(client);
});
events.run(client);

client.login(settings.token).then(() => {
	client.user.setPresence({
		status: 'online',
		activity: {
			name: 'Loading Commands & Events, please wait!',
			type: 'PLAYING',
		},
	});
	mongoose
		.connect(settings.uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => {
			console.log('Connected to database');
			client.modmail = new ModmailProvider(ModmailModel);
			client.modmail.init();
		})
		.catch(console.error);
});