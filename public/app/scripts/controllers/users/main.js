'use strict';
app
	.controller('usersMainCtrl', ['$scope','groupsResolve', 'usersResolve', '$modal', 'Restangular',
	function ( $scope, groupsResolve, usersResolve, $modal, Restangular) {

		$scope.groups = groupsResolve;
		$scope.users = usersResolve;
		$scope.user = _.first($scope.users);


		$scope.addGroup = function (group) {
			$scope.group = group || Restangular.restangularizeElement(null , {}, 'groups');
			$modal({
				scope: $scope,
				template: 'views/modals/users/group.html',
				placement : 'center',
				show: true
			});
		};

	}]);