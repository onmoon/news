'use strict';
var passport = require('koa-passport');
var users = {};

passport.serializeUser(function (user, done){
	done(null,user.id);
});
passport.deserializeUser(function(id, done) {
	var user = users[id] || { id : id };
  done(null, user);
});

var LocalStrategy = require('passport-local').Strategy;
var VKontakteStrategy = require('passport-vkontakte').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-auth').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
  console.log(arguments);
  done(null,{});
}));

passport.use(new VKontakteStrategy({
    clientID: '4573664',
    clientSecret: 'lDtVBn7iu9YSfiv6Z72p',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/vk/callback'
  },
  function(token, tokenSecret, profile, done) {
  	console.log(arguments);
    // retrieve user ...
    //test 
    users[profile.id] = profile;
    //
    
    done(null, profile);
  }
))

passport.use(new FacebookStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
  },
  function(token, tokenSecret, profile, done) {
  	console.log(arguments);
    // retrieve user ...
    done(null, {})
  }
))

passport.use(new TwitterStrategy({
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    done(null, {})
  }
))

passport.use(new GoogleStrategy({
    clientId: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    done(null, {})
  }
))