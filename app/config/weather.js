'use strict';
module.exports = {
	currentWeatherURL : 'http://api.openweathermap.org/data/2.5/weather',
	dailyWeatherURL : 'http://api.openweathermap.org/data/2.5/forecast',
	cities : {
		default : 'astrakhan',
		astrakhan : 580497,
		spb : 498817
	},
	redisKey : 'weather', 
	//         min  sec
	tempTime : 30 * 60 //полчаса
}