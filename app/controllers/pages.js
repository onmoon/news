'use strict';

module.exports = {
	login : function* () {
		yield this.render('pages/login', {
			user : 'z'
		});
	},
	signup : function* () {
		yield this.render('pages/signup', {
			user : 'z'
		});
	},
}