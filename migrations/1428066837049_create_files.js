exports.up = function(pgm) {
	pgm.createTable('files', {
		id		: 'id',
		hash	: {
			type : 'text',
			unique : true
		},
		name	: 'text'
	});
};

exports.down = function(pgm) {
	pgm.dropTable('files');
};
