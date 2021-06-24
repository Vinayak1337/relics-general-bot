'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Collection } = require('discord.js');
class ModmailProvider {
	constructor(model) {
		this.cache = new Collection();
		this.model = model;
	}
	async init() {
		const docs = await this.model.find({});
		if (!docs) {
			return;
		}
		for (const doc of docs) {
			this.cache.set(doc.id, doc);
		}
	}
	async get(id) {
		let doc = this.cache.get(id);
		if (doc) {
			return doc;
		}
		doc = await new this.model({ id }).save();
		this.cache.set(doc.id, doc);
		return doc;
	}
	async delete(id) {
		const doc = this.cache.get(id);
		if (!doc) {
			return false;
		}
		await doc.remove();
		return true;
	}
}
exports.default = ModmailProvider;
