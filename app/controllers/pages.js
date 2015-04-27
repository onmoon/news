'use strict';
var pages = require('app/models/pages');
var weather = require('app/controllers/weather');
var _ = require('lodash');

module.exports = {
	index : function *() {
		this.state.news = yield pages.index();
		yield this.render('astra/index');		
	},
	categoryList: function* () {
		this.state.cats = yield pages.categoryList();
		yield this.render('astra/categories');
	},
	categorySingle: function* () {
		this.state.active = this.params.slug;
		this.state.news = yield pages.categorySingle(this.params.slug);
		yield this.render('astra/index');		
	},
	post: function* () {

	},
	login : function* () {
		yield this.render('pages/login');
	},
	signup : function* () {
		yield this.render('pages/signup');
	},
	weather : function* () {
		this.state.weather = yield weather.daily();
		yield this.render('weather/index');
	},
	admin : function* () {
		yield this.render('admin/layout');
	}

}