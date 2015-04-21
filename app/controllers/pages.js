'use strict';
var pages = require('app/models/pages');
var _ = require('lodash');

module.exports = {
	index : function *() {
		var news = yield pages.index();
		console.log(news);
		yield this.render('astra/index', {
			user : this.passport.user,
			news : news
		});		
	},
	login : function* () {
		yield this.render('pages/login', {
			user : this.passport.user
		});
	},
	signup : function* () {
		yield this.render('pages/signup', {
		});
	},
}