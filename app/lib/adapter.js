'use strict';
var config = require('app/config/adapters');
var knex = require('knex');

module.exports = knex({
	client : config.defaults,
	connection : config[config.defaults]
});
