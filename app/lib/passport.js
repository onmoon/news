'use strict';
var passport = require('koa-passport');

passport.serializeUser(function (user, done){
	done(null,user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, user);
});
