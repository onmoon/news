'use strict';
var pg = require('app/lib/adapter');
var _ = require('lodash');

module.exports = {
	create : function (data) {
		return pg('news')
			.insert(data, '*')
			.then(function(models){
				return _.first(models);
			});
	},
	delete : function (id) {
		return pg('news')
			.where('id', id)
			.del();
	},
	update : function (id, data) {
		return pg('news')
			.where('id', id)
			.update(data);
	},
	list: function () {
		return pg('news').select('*');
	}
};
