'use strict';
var config = require('../config/weather');
var request = require('koa-request');
module.exports = {
	current : function () {
		var url = config.currentWeatherURL + ['?', 'id', '=', config.cities[config.cities.default]].join('');
		return request(url);
	},
	daily : function * () {
	
	}
}