'use strict';
var pg = require('app/lib/knex');

module.exports = {
	up : function () {
		pg.schema.createTable('users', function (table){
			table.increments();
			table.string('first_name');
			table.string('last_name');
			table.timestamps();
		});

		pg.schema.createTable('categories', function (table){
			table.increments();
			table.string('slug');
			table.string('name');
		});

		pg.schema.createTable('posts', function (table){
			table.increments();
			table.string('title');
			table.string('body');
			table.integer('category').references('id').inTable('categories');
			table.integer('author').references('id').inTable('users');
			table.timestamps();
		});


	},
	down : function () {
		pg.schema.dropTable('users');
		pg.schema.dropTable('categories');
		pg.schema.dropTable('posts');
	}
}