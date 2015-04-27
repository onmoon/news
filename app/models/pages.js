'use strict';
var pg = require('app/lib/adapter').pg;
module.exports = {
	index: function () {
		return pg('posts')
				.as('posts')
				.select('posts.*', 'category.* as category')
				.innerJoin('categories as category', 'category.id', 'posts.category')
				.groupBy('posts.category', 'posts.id','category.id');
	},
	categoryList: function () {
		return pg('categories')
				.select('*');
				// .select('categories.*',pg.raw('json_agg(category.*) as children'))
				// .leftJoin('categories as category', 'categories.id', 'category.parent')
				// .whereNull('categories.parent')
				// .groupBy('categories.id', 'categories.name')
	},
	categorySingle: function (slug) {
		return pg('posts')
				.as('posts')
				.select('posts.*', 'category.* as category')
				.innerJoin('categories as category', 'category.id', 'posts.category')
				.where('category.slug', slug)
	}
};
