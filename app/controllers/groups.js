'use strict';
var groups = require('app/models/groups');

module.exports = {
	create : function* () {
		this.body = yield groups.create(this.request.body);
	},
	delete : function* () {
		this.body = yield groups.delete(this.params.id);
	},
	update : function* (id) {
		this.body = yield groups.update(this.params.id);
	},
	list : function* () {
		this.body = yield groups.list();
	}
}