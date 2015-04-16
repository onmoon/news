'use strict';
var configDB = require('app/config/adapters');
var configMQ = require('app/config/rabbit');
var knex = require('knex');
var pg = knex({
	client : configDB.defaults,
	connection : configDB[configDB.defaults]
});

module.exports = {
	pg : pg
}
