'use strict';
var categories = require('app/models/categories');

module.exports = {
	create : function* () {
		this.body = yield categories.create(this.request.body);
	},
	delete : function* () {
		this.body = yield categories.delete(this.params.id);
	},
	update : function* (id) {
		this.body = yield categories.update(this.params.id, this.request.body);
	},
	list : function* () {
		this.body = yield categories.list();
	}
}