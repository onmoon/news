'use strict';

var koa = require('koa.io');
var path = require('path');
var router = require('./router');

var compose = require('koa-compose');// эта утилита позволяет композировать набор middleware`й в одну
var passport = require('koa-passport');

var app = module.exports = koa();
var port = process.env.PORT || 1337;
var env = process.env.NODE_ENV || 'development';
// выглядит знакомо

var projectRoot = __dirname;
var staticRoot = path.join(projectRoot, './public/.tmp/');
var templateRoot = path.join(projectRoot, 'app/templates');

var session = require('koa-generic-session');
var store = require('koa-redis');
app.keys = ['your-session-secret'];
app.use(session({
	store : store()
}));
var middlewareStack = [
    require('koa-bodyparser')(),
    require('koa-logger')(), // логирует все http запросы
//    require('koa-favicon')(staticRoot + '/favicon.png'),
    require('koa-static')(staticRoot),
    require('koa-views')(templateRoot, {'default': 'ejs'})
];

//require('koa-locals')(app); 
// добавляет объект locals к контексту запроса, в который вы можете записывать все, что угодно
app.use(compose(middlewareStack));

//auth
require('./app/lib/passport');
app.use(passport.initialize());
app.use(passport.session());


require('./app/lib/mail').init();
router.init(app);
router.initPassport(app);
router.initSocket(app);

if (!module.parent) {
	app.listen(port);
	console.log('listening on port ' + port);
}