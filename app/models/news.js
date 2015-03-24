'use strict';
var pg = require('app/lib/knex');

module.exports = {
  all : function () {
    return pg('news').select('*');
  },
  one : function (id) {
    return pg('news').select('*').where({ id : id });
  }
};
