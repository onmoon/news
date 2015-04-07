'use strict';
app
    .controller('filesMainCtrl', ['$scope', '$modal', 'filesCollection',
    function ( $scope, $modal, filesCollection) {
    	$scope.files = filesCollection;

    	$scope.openUpload = function () {
			$modal({
				scope: $scope,
				template: 'views/modals/files/upload.html',
				placement : 'center',
				show: true
			});
		};
    }]);
