'use strict';
var config = require('../config/weather');
var redisConfig = require('../config/redis');
var helper = require('../lib/weather');
var request = require('request');
var redis = require('redis');
var Q = require('q');

var client = redis.createClient(redisConfig.port, redisConfig.url);
client.on('error', (err) => console.log('Error ' + err));

var stringify = (obj) => !obj ? '' : JSON.stringify(obj);
var parse = (str) => !str ? {} : JSON.parse(str);
var checkValid = (date) => Date.now() - date < config.tempTime;

var parseCurrent = obj => ({// return objects
	sunrise : new Date(obj.sys.sunrise * 1000),
	sunset  : new Date(obj.sys.sunset * 1000),
	icon    : helper.getIcon(obj.weather[0].id),
	temp    : obj.main.temp.toFixed(1),
	pressure: obj.main.pressure.toFixed(1),
	humidity: obj.main.humidity,
	wind    : {
		speed : obj.wind.speed,
		way   : helper.getWay(obj.wind.deg)
	},
	clouds  : obj.clouds.all 
});
module.exports = {
	current : function () {
		return Q.promise(function (done, fail) {
			var key = [config.redisKey, ':current:', config.cities.default].join('');
			var url = config.currentWeatherURL + ['?', 'id', '=', config.cities[config.cities.default], '&units=metric'].join('');
			//check redis on weather data
			client.get(key, function (err, data) {				
				if(err) return fail(err);

				data = parse(data);
				if (checkValid(data.date || 0)) {
					console.log('Get daily weather from redis at ',(new Date(data.date)));
					return done(parseCurrent(data.weather));
				} else {
					console.log('Get daily weather from server');
					request(url, function (err, res, body){
						if(err) return fail(err);
						var weather = parse(body);
						client.set(key, stringify({
						 	date : Date.now(),
						 	weather : weather
						}), redis.print);
						return done(parseCurrent(weather));
					});
				}
			});
		});
	},
	daily : function * () {
	
	}
}