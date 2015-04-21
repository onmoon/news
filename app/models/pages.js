'use strict';
var pg = require('app/lib/adapter').pg;
module.exports = {
	index: function () {
		return pg('posts')
				.as('posts')
				.select('posts.*', 'category.* as category')
				.innerJoin('categories as category', 'category.id', 'posts.category')
				.groupBy('posts.category', 'posts.id','category.id');
	}
};
