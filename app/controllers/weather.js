'use strict';
var config = require('../config/weather');
var redisConfig = require('../config/redis');
var request = require('request');
var redis = require('redis');
var Q = require('q');

var client = redis.createClient(redisConfig.port, redisConfig.url);
client.on('error', function (err) {
	console.log('Error ' + err);
});

var stringify = function (obj) {
	if(!obj) return '';
	return JSON.stringify(obj);
};
var parse = function (str) {
	if(!str) return {};
	return JSON.parse(str);
};
var checkValid = function (date) {
	return ((Date.now() - date) < config.tempTime);
};
module.exports = {
	current : function () {
		return Q.promise(function (done, fail) {
			var key = [config.redisKey, ':current:', config.cities.default].join('');
			var url = config.currentWeatherURL + ['?', 'id', '=', config.cities[config.cities.default]].join('');
			//check redis on weather data
			client.get(key, function (err, data) {				
				if(err) return fail(err);

				data = parse(data);
				if (checkValid(data.date || 0)) {
					console.log('Get daily weather from redis');
					return done(data.weather);
				} else {
					console.log('Get daily weather from server');
					request(url, function (err, res, body){
						if(err) return fail(err);
						var weather = parse(body);
						client.set(key, stringify({
						 	date : Date.now(),
						 	weather : weather
						}), redis.print);
						return done(weather);
					});
				}
			});
		});
	},
	daily : function * () {
	
	}
}