exports.up = function(pgm) {
	pgm.createTable('posts', {
		id			: 'id',
		title		: 'text',
		subtitle	: 'text',
		body		: 'text',
		category	: {
			type : 'integer',
			foreignKey : true,
			references : 'categories'
		}
	});
};

exports.down = function(pgm) {
	pgm.dropTable('posts');
};
