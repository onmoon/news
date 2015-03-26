'use strict';
var Router = require('koa-router');
var router = new Router();
var newsCtrl = require('app/controllers/news');
var usersCtrl = require('app/controllers/users');
var groupsCtrl = require('app/controllers/groups');

module.exports = {
	init : function (app) {

		router.get('/news', newsCtrl.all);
		router.get('/news/:id', newsCtrl.one);



		router.get('/admin', usersCtrl.admin);
		router.get('/signin', usersCtrl.signin);
		router.get('/login', usersCtrl.login);

		//api
		router.get('/api/users', usersCtrl.list);
		router.post('/api/users', usersCtrl.create);



		router.get('/api/groups', groupsCtrl.list);
		router.post('/api/groups', groupsCtrl.create);
		router.put('/api/groups/:id', groupsCtrl.update);
		router.delete('/api/groups/:id', groupsCtrl.delete);

		app
			.use(router.routes())
			.use(router.allowedMethods())
			.use(function*(){
				this.status = 404;
				yield this.render('pages/404')
			})

	}
};