'use strict';

module.exports = {
	index : function *() {
		yield this.render('astra/index', {
			user : this.passport.user
		});		
	},
	login : function* () {
		yield this.render('pages/login', {
			user : this.passport.user
		});
	},
	signup : function* () {
		yield this.render('pages/signup', {
		});
	},
}