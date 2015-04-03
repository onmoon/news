var assert = require('assert');
var Categories = require('../app/models/categories');
require('co-mocha');

describe('Categories testing', function (){
	var category, subcategory;
	it('create category', function *(){
		var cat = {
			name	: 'test',
			slug	: 'test',
			parent	: null
		}
		category = yield Categories.create(cat);
		assert(category.id);
	});

	it('create subcategory', function *(){
		var cat = {
			name	: 'test',
			slug	: 'test',
			parent	: category.id
		}
		subcategory = yield Categories.create(cat);
		assert(subcategory.id);
	});
	it('cascade remove categories', function *(){
		yield Categories.delete(category.id);
		var sub = yield Categories.findOne(subcategory.id);
		assert.equal(sub.length , 0);
	});
});