'use strict';
app.
	controller('modalUploadFilesCtrl', ['$scope',
	function ($scope) {
		$scope.uploadSuccess = function (res) {
			$scope.files.add(res.plain());
			$scope.$hide();
		};

	}]);