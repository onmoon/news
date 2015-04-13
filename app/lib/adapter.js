'use strict';
var configDB = require('app/config/adapters');
var configMQ = require('app/config/rabbit');
var knex = require('knex');
var rabbit = require('rmqlite');
var pg = knex({
	client : configDB.defaults,
	connection : configDB[configDB.defaults]
});
var connect = rabbit.createConnect(configMQ.url)
   .then(function () {
        console.log('Rabbit connected');
    })
    .catch(function (err) {
        console.error(err);
        process.exit(0);
    });
module.exports = {
	pg : pg,
	rabbit : connect
}
