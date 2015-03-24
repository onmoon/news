'use strict';
var router = require('koa-router')();
var newsCtrl = require('app/controllers/news');

module.exports = {
	init : function (app) {
		router.get('/news', newsCtrl.all);
		router.get('/news/:id', newsCtrl.one);

		app
			.use(router.routes())
			.use(router.allowedMethods());

	}
};