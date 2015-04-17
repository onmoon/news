$(function (){

	var socket = window.io.connect({
		url : window.location.origin.replace(window.location.port, '1337')
	});
	socket.on('weather', function (res){
		$('.weather').find('.h2')
			.html(res.temp + ' &deg;C')
			.append('<img src="' + res.icon + '">');
	});
	socket.emit('join');

});