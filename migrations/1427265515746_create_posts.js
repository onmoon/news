exports.up = function(pgm) {
	pgm.createTable('posts', {
		id		: 'id',
		title	: 'text',
		body	: 'text',
		category: {
			type : 'integer',
		}
	});
};

exports.down = function(pgm) {
	pgm.dropTable('posts');
};
