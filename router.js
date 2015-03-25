'use strict';
var Router = require('koa-router');
var router = new Router();
var newsCtrl = require('app/controllers/news');
var usersCtrl = require('app/controllers/users');

module.exports = {
	init : function (app) {

		router.get('/news', newsCtrl.all);
		router.get('/news/:id', newsCtrl.one);



		router.get('/admin', usersCtrl.admin);
		router.get('/signin', usersCtrl.signin);
		router.get('/login', usersCtrl.login);

		app
			.use(router.routes())
			.use(router.allowedMethods())
			.use(function*(){
				this.status = 404;
				yield this.render('pages/404')
			})

	}
};