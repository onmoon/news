'use strict';
var pg = require('app/lib/adapter');

module.exports = {
	list : function () {
		return pg('files')
			.select('*');
	},
	create : function (data) {
		return pg('files')
			.insert(data, '*');
	},
};