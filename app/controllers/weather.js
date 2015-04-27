'use strict';
var config = require('../config/weather');
var redisConfig = require('../config/redis');
var helper = require('../lib/weather');
var request = require('request');
var redis = require('redis');
var Q = require('q');
var _ = require('lodash');
var moment = require('moment');


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
var parseDay = obj => ({
	icon    : helper.getIcon(obj.weather[0].id),
	temp    : +obj.main.temp.toFixed(1),
	pressure: obj.main.pressure.toFixed(1),
	humidity: obj.main.humidity,
	clouds  : obj.clouds.all,
	day 	: obj.sys.pod === 'd',
	wind    : {
		speed : obj.wind.speed,
		way   : helper.getWay(obj.wind.deg)
	},
	date 	: obj.dt_txt.slice(0, 10),
	time    : obj.dt_txt.slice(11,16)
});
var parseDaily = function (res) {
	moment.locale('ru');
	var obj = {};
	var mod = _.chain(res.list)
				.map(parseDay)
				.groupBy('date')
				.each(function (weathers, day, orig){
					var temp = _.pluck(weathers, 'temp');
					var temp15 = _.find(weathers, (weather) => weather.time === '15:00');
					if(!temp15) temp15 = _.last(weathers);

					obj[day] = {
						temp_max : _.max(temp),
						temp_min : _.min(temp),
						icon 	 : temp15.icon,
						weather  : weathers,
						days 	 : _.keys(orig).length,
						day 	 : moment(day).date(),
						dayweek  : moment(day).format('dddd')
					};
				})
				.value();
	return obj;
};
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
					console.log('Get current weather from redis at ',(new Date(data.date)));
					return done(data.weather);
				} else {
					console.log('Get current weather from server');
					request(url, function (err, res, body){
						if(err) return fail(err);
						var weather = parseCurrent(parse(body));
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
	daily : function* () {
		return Q.promise(function (done, fail) {
			var key = [config.redisKey, ':daily:', config.cities.default].join('');
			var url = config.dailyWeatherURL + ['?', 'id', '=', config.cities[config.cities.default], '&units=metric&cnt=10'].join('');
			//check redis on weather data
			client.get(key, function (err, data) {				
				if(err) return fail(err);

				data = parse(data);
				if (checkValid(data.date || 0)) {
					console.log('Get daily weather from redis at ',(new Date(data.date)));
					return done(data.weather);
				} else {
					console.log('Get daily weather from server');
					request(url, function (err, res, body){
						if(err) return fail(err);
						var weather = parseDaily(parse(body));
						client.set(key, stringify({
						 	date : Date.now(),
						 	weather : weather
						}), redis.print);
						return done(weather);
					});
				}
			});
		});	
	}
}