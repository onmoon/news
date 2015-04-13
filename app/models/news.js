'use strict';
var pg = require('app/lib/adapter').pg;
var _ = require('lodash');

module.exports = {
	create : function (data) {
		return pg('posts')
			.insert(data, '*')
			.then(function(models){
				return _.first(models);
			});
	},
	delete : function (id) {
		return pg('posts')
			.where('id', id)
			.del();
	},
	update : function (id, data) {
		return pg('posts')
			.where('id', id)
			.update(data);
	},
	list: function () {
		return pg('posts').select('*');
	}
};
