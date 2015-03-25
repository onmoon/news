'use strict';

var koa = require('koa');
var path = require('path');

var compose = require('koa-compose');
// эта утилита позволяет композировать набор middleware`й в одну

var app = module.exports = koa();
var port = process.env.PORT || 1337;
var env = process.env.NODE_ENV || 'development';
// выглядит знакомо

var projectRoot = __dirname;
var staticRoot = path.join(projectRoot, 'public');
var templateRoot = path.join(projectRoot, 'templates');

var middlewareStack = [
//    require('koa-session')(), // расширяет контекст свойством session
//    require('koa-less')('/less', {dest: '/css', pathRoot: staticRoot}), 
    // компилирует less в css, если был запрошен файл со стилями, имеет много интересных опций
    require('koa-bodyparser')(),
    require('koa-logger')(), // логирует все http запросы
//    require('koa-favicon')(staticRoot + '/favicon.png'),
    require('koa-static')(staticRoot),
    require('koa-views')(templateRoot, {'default': 'ejs'})
];

//require('koa-locals')(app); 
// добавляет объект locals к контексту запроса, в который вы можете записывать все, что угодно

app.use(compose(middlewareStack));

require('./router').init(app);

if (!module.parent) {
  app.listen(port);
  console.log('listening on port 1337');
}