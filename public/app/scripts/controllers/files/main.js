'use strict';
app
    .controller('filesMainCtrl', ['$scope', '$modal', 'filesCollection', 'socket',
    function ( $scope, $modal, filesCollection, socket) {
    	$scope.files = filesCollection;
		socket.emit('join', {
			ua: navigator.userAgent,
			time: new Date()
		});
    	$scope.openUpload = function () {
			$modal({
				scope: $scope,
				template: 'views/modals/files/upload.html',
				placement : 'center',
				show: true
			});
		};
    }]);
