'use strict';
var pg = require('app/lib/adapter');

module.exports = {
	create : function (data) {
		return pg('users')
			.insert(data, '*');
	},
	all : function () {
		return pg('users').select('*');
	},
	one : function () {
		return pg('news').select('*').where({ id : id });
	}
  
  
};
