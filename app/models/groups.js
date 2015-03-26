'use strict';
var pg = require('app/lib/adapter');

module.exports = {
	create : function (data) {
		return pg('groups')
			.insert(data, '*');
	},
	delete : function (id) {
		return pg('groups')
			.where('id', id)
			.del();
	},
	list: function () {
		return pg('groups').select('*');
	}
};
