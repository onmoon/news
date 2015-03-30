'use strict';
var comments = require('app/models/comments');

module.exports = {
	create : function* () {
		this.body = yield comments.create(this.request.body);
	},
	delete : function* () {
		this.body = yield comments.delete(this.params.id);
	},
	update : function* (id) {
		this.body = yield comments.update(this.params.id, this.request.body);
	},
	list : function* () {
		this.body = yield comments.list();
	}
}