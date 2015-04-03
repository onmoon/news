'use strict';
var fs = require('fs');
var config = require('../config/files');
var parse = require('co-busboy');
var crypto = require('crypto');
module.exports = {
	upload : function* (next) {
		let parts = parse(this);
		let part;
		let fileNames = [];

		while (part = yield parts) {
			let name = part._readableState.buffer[0];

			let shasum = crypto.createHash('sha1');
			shasum.update(name);
			let hash= shasum.digest('binary');
			let stream = fs.createWriteStream(config.uploadDir + hash);
			part.pipe(stream);
			fileNames.push(stream.path);
		}

		this.body = fileNames;
  	}
}