exports.up = function(pgm) {
	pgm.createTable('users', {
		id			: 'id',
		lastname	: 'text',
		firstname	: 'text',
		email		: {
			type : 'text',
			unique : true
		},
		role		: 'integer',
		password	: 'text'
	});
};

exports.down = function(pgm) {
	pgm.dropTable('users');
};
