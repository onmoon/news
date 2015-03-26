'use strict';
app.controller('modalUsersGroupCtrl', ['$scope', 'Restangular',
	function ($scope, Restangular) {
		$scope.save = function ($hide) {
			$scope.group.save()
				.then(function (res){
					$scope.groups.push(Restangular.restangularizeElement(null , res[0], 'groups'));
					$hide();
				});
		};
		$scope.remove = function ($hide) {
			$scope.group.remove()
				.then(function (res){
					$scope.groups.splice($scope.groups.indexOf($scope.group), 1);
					$hide();
				});
		}
	}]);