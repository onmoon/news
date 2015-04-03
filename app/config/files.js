'use strict';

module.exports = {
	tmpDir:  './tmp/', // tmp dir to upload files to
    uploadDir:  './tmp/', // actual location of the file
    uploadUrl: '/files/', // end point for delete route 
    maxPostSize: 11000000000, // 11 GB
    minFileSize: 1,
    maxFileSize: 10000000000, // 10 GB
    acceptFileTypes: /.+/i,
    imageTypes:  /\.(gif|jpe?g|png)/i
}