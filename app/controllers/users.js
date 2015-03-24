'use strict';
var news = require('app/models/users');

module.exports = {
	create : function* () {
		console.log(this.request.body);
	}
}