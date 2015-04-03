'use strict';
var cofs = require('co-fs');
var fs = require('fs');
var config = require('../config/files');
var files = require('../models/files');
var parse = require('co-busboy');
var crypto = require('crypto');
module.exports = {
	list : function * () {
		this.body = yield files.list();
	},
	getFile : function* () {
		this.body = yield cofs.readFile(config.uploadDir + this.params.hash);
	},
	upload : function* (next) {
		let parts = parse(this);
		let part;
		let fileNames = [];

		while (part = yield parts) {
			let file = {
				name : part.filename
			};
			file.hash = crypto.createHash('md5')
							  .update(part._readableState.buffer.toString())
						      .digest('hex');
			let path = config.uploadDir + file.hash;
			let stream = fs.createWriteStream(path);
			part.pipe(stream);
			fileNames.push(file);
		}
		this.body = yield files.create(fileNames);
  	},
  	remove : function* (next) {

  	}
}