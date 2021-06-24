'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose = require('mongoose');
const ModmailSchema = new mongoose.Schema({
	id: {
		type: String,
		unique: true,
		required: true,
	},
	channelId: {
		type: String,
		unique: true,
	},
	ticketId: {
		type: String,
	},
	createdTicket: {
		type: Boolean,
		default: false,
	},
	banned: {
		type: Boolean,
		default: false,
	},
	onFaq: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Number,
		default: Date.now(),
	},
}, {
	minimize: false,
});
const ModmailModel = mongoose.model('modmail', ModmailSchema);
exports.default = ModmailModel;