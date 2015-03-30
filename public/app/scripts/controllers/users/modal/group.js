'use strict';
app.controller('modalUsersGroupCtrl', ['$scope', 'Restangular',
	function ($scope, Restangular) {
		$scope.save = function ($hide) {
			$scope.group.save().then($hide);
		};
		$scope.remove = function ($hide) {
			$scope.group.remove().then($hide);
		}
	}]);