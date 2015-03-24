'use strict';
var router = require('koa-router')();
var newsCtrl = require('app/controllers/news');
var usersCtrl = require('app/controllers/users');

module.exports = {
	init : function (app) {
		router.get('/news', newsCtrl.all);
		router.get('/news/:id', newsCtrl.one);

		router.post('/signin', usersCtrl.create);

		app
			.use(router.routes())
			.use(router.allowedMethods())

	}
};