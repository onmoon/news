'use strict';
var pg = require('app/lib/adapter');

module.exports = {
	create : function (data) {
		return pg('users')
			.insert(data, '*');
	},
	delete : function (id) {
		return pg('users')
			.where('id', id)
			.del();
	},
	update : function (id, data) {
		return pg('users')
			.where('id', id)
			.update(data);
	},
	list : function () {
		return pg('users').select('*');
	},
	one : function () {
		return pg('news').select('*').where({ id : id });
	}
  
  
};
