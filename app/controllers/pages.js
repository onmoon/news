'use strict';
var pages = require('app/models/pages');
var weather = require('app/controllers/weather');
var _ = require('lodash');

module.exports = {
	index : function *() {
		var news = yield pages.index();
		yield this.render('astra/index', {
			user : this.passport.user,
			news : news
		});		
	},
	categories: function* () {
		var news = yield pages.categories(this.params.slug);
		yield this.render('astra/index', {
			user : this.passport.user,
			news : news
		});		
	},
	post: function* () {

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
	weather : function* () {
		var info = yield weather.daily();
		yield this.render('weather/index', {
			weather : info 
		})
	}
}