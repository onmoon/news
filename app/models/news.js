'use strict';
var pg = require('app/lib/adapter');

module.exports = {
  all : function () {
    return pg('news').select('*');
  },
  one : function () {
    return pg('news').select('*').where({ id : id });
  }
};
