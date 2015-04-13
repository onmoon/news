exports.up = function(pgm) {
	pgm.createTable('categories', {
		id		: 'id',
		name	: 'text',
		slug	: 'text',
		parent	: {
			type : 'integer',
			foreignKey : true,
			references : 'categories ON DELETE CASCADE ON UPDATE CASCADE'
		}
	});
	pgm.sql('');
};

exports.down = function(pgm) {
	pgm.dropTable('categories');
};
