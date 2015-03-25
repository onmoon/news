'use strict';
var news = require('app/models/users');

module.exports = {
	create : function* () {
		console.log(this.request.body);
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

}