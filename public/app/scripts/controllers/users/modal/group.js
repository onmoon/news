'use strict';
app.controller('modalUsersGroupCtrl', ['$scope',
	function ($scope) {
		$scope.save = function ($hide) {
			$scope.group.save().then($hide);
		};
		$scope.remove = function ($hide) {
			$scope.group.remove().then($hide);
		};
	}]);