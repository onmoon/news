'use strict';

var nodemailer = require('nodemailer');
var mailConfig = require('../config/mail');
var transport;
var MailService = {

	init : function () {
		transport = nodemailer.createTransport();
		transport.version = mailConfig.version;
		this.test();
	},

	test : function () {
		// var mailOptions = {
		// 	from: 'Fred Foo ✔ <ivan@on-moon.ru>', // sender address
		// 	to: 'bar@on-moon.ru, baz@on-moon.ru', // list of receivers
		// 	subject: 'Hello ✔', // Subject line
		// 	text: 'Hello world ✔', // plaintext body
		// 	html: '<b>Hello world ✔</b>' // html body
		// };

		// // send mail with defined transport object
		// transport.sendMail(mailOptions, function(error, info){
		// 	if(error){
		// 		console.log(error);
		// 	} else {
		// 		console.log(info);
		// 	}
		// });
	}
}
module.exports = MailService;