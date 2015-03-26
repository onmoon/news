'use strict';
var users = require('app/models/users');

module.exports = {
	create : function* () {
		this.body = yield users.create(this.request.body);
	},
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
	list : function* () {
		this.body = yield users.all();
	}

}