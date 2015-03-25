exports.up = function(pgm) {
	pgm.createTable('categories', {
		id		: 'id',
		name	: 'text',
		slug	: 'text',
		parent	: 'integer'
	});
};

exports.down = function(pgm) {
	pgm.dropTable('categories');
};
