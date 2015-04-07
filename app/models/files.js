'use strict';
var pg = require('app/lib/adapter');

module.exports = {
	list : function () {
		return pg('files')
			.select('*');
	},
	findOne : function (id) {
		return pg('files')
			.where('id', id)
			.first('*');
	},
	delete : function (id) {
		return pg('files')
			.where('id', id)
			.del();
	},
	create : function (data) {
		return pg('files')
			.insert(data, '*');
	},
};