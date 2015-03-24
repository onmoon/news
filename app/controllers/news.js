'use strict';
var news = require('app/models/news');

module.exports = {
	all : function* all() {
		this.body = yield news.all();
	},
	one : function* one(id){
		this.body = yield news.one(id);
	}
}