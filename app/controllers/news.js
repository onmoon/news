'use strict';
var news = require('app/models/news');

module.exports = {
	create : function* () {
		this.body = yield news.create(this.request.body);
	},
	delete : function* () {
		this.body = yield news.delete(this.params.id);
	},
	update : function* (id) {
		this.body = yield news.update(this.params.id, this.request.body);
	},
	list : function* () {
		this.body = yield news.list();
	}
}