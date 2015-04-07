'use strict';
var Router = require('koa-router');
var router = new Router();
var _ = require('lodash');
var SocketIO = require('socket.io');
var newsCtrl = require('app/controllers/news');
var pagesCtrl = require('app/controllers/pages');
var usersCtrl = require('app/controllers/users');
var categoriesCtrl = require('app/controllers/categories');
var commentsCtrl = require('app/controllers/comments');
var groupsCtrl = require('app/controllers/groups');
var filesCtrl = require('app/controllers/files');

module.exports = {
	init : function (app) {
		router.get('/signup', pagesCtrl.signup);
		router.get('/login', pagesCtrl.login);

		//api
		rest('users', usersCtrl);
		rest('news', newsCtrl);
		rest('categories', categoriesCtrl);
		rest('comments', commentsCtrl);
		rest('groups', groupsCtrl);

		router.post('/api/upload', filesCtrl.upload);
		router.get('/api/files', filesCtrl.list);
		router.delete('/api/files/:id', filesCtrl.delete);
		router.get('/api/files/:hash', filesCtrl.getFile);

		app
			.use(router.routes())
			.use(router.allowedMethods())
			.use(function*(){
				this.status = 404;
				yield this.render('pages/404')
			});
	},
	initSocket : function (app) {
		var count = 0;
		app.io.on('connection', function (socket){
			count++;
			console.log('Websocket\'s connection:' + count);
			socket.on('disconnect', function (){
				count--;
				console.log('Websocket\'s connection:' + count);
			});
		});
		app.io.route('join', function* (next, message) {
			console.log(message);
		});

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