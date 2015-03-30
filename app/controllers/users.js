'use strict';
var users = require('app/models/users');

module.exports = {
	//rest
	list : function* () {
		this.body = yield users.all();
	},
	create : function* () {
		this.body = yield users.create(this.request.body);
	},
	delete : function* () {
		this.body = yield users.delete(this.params.id);
	},
	update : function* (id) {
		this.body = yield users.update(this.params.id, this.request.body);
	},
	//pages
	admin : function* () {
		yield this.render('admin/layout', {
			user : 'z'
		});
	},
	login : function* () {
		yield this.render('admin/login', {
			user : 'z'
		});
	},
	signin : function* () {
		yield this.render('admin/signin', {
			user : 'z'
		});
	},


}