exports.up = function(pgm) {
	pgm.createTable('groups', {
		id			: 'id',
		name		: 'text'
	});
};

exports.down = function(pgm) {
	pgm.dropTable('groups');
};
