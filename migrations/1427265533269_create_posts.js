exports.up = function(pgm) {
	pgm.createTable('posts', {
		id		: 'id',
		title	: 'text',
		body	: 'text',
		category: {
			type : 'integer',
			foreignKey : true,
			references : 'categories'
		}
	});
};

exports.down = function(pgm) {
	pgm.dropTable('posts');
};
