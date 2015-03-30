'use strict';
var pg = require('app/lib/adapter');
var _ = require('lodash');
module.exports = {
	create : function (data) {
		return pg('comments')
			.insert(data, '*')
			.then(function(models){
				return _.first(models);
			});
	},
	delete : function (id) {
		return pg('comments')
			.where('id', id)
			.del();
	},
	update : function (id, data) {
		return pg('comments')
			.where('id', id)
			.update(data);
	},
	list: function () {
		return pg('comments').select('*');
	}
};
