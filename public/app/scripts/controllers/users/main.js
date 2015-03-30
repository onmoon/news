'use strict';
app
	.controller('usersMainCtrl', ['$scope','groupsCollection', 'usersResolve', '$modal', 'Restangular',
	function ( $scope, groupsCollection, usersResolve, $modal, Restangular) {
		var users = usersResolve.plain();

		$scope.active = {
			group : 0
		};
		$scope.groups = groupsCollection;
		$scope.users = users;
		$scope.user = _.first(users);

		$scope.selectGroup = function (group) {
			$scope.active.group = group.id;
			$scope.users = _.filter(users, { role : group.id });
		};

		$scope.addGroup = function (group) {
			$scope.group = group || $scope.groups.new();
			$modal({
				scope: $scope,
				template: 'views/modals/users/group.html',
				placement : 'center',
				show: true
			});
		};

	}]);