'use strict';
var Router = require('koa-router');
var router = new Router();
var _ = require('lodash');
var newsCtrl = require('app/controllers/news');
var usersCtrl = require('app/controllers/users');
var categoriesCtrl = require('app/controllers/categories');
var commentsCtrl = require('app/controllers/comments');
var groupsCtrl = require('app/controllers/groups');

module.exports = {
	init : function (app) {


		router.get('/admin', usersCtrl.admin);
		router.get('/signin', usersCtrl.signin);
		router.get('/login', usersCtrl.login);

		//api
		rest('users', usersCtrl);
		rest('news', newsCtrl);
		rest('categories', categoriesCtrl);
		rest('comments', commentsCtrl);
		rest('groups', groupsCtrl);

		app
			.use(router.routes())
			.use(router.allowedMethods())
			.use(function*(){
				this.status = 404;
				yield this.render('pages/404')
			})

	}
};

function rest(route, ctrl) {
	var methods = {
		post : 'create',
		put  : 'update',
		get  : 'list',
		delete : 'delete'
	};
	_.each(methods, function (ctrlMethod, routerMethod){
		var id = routerMethod === 'delete' || routerMethod === 'put';
		router[routerMethod]('/api/' + route + (id ? '/:id' : ''), ctrl[ctrlMethod]);
	});
}