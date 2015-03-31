'use strict';
app
	.controller('usersMainCtrl', ['$scope','groupsCollection', 'usersCollection', '$modal', 'Restangular',
	function ( $scope, groupsCollection, usersCollection, $modal, Restangular) {
		$scope.active = {
			group : 0
		};
		$scope.groups = groupsCollection;
		$scope.users = usersCollection;

		$scope.selectGroup = function (group) {
			$scope.active.group = group.id;
		//	$scope.users = _.filter(users, { role : group.id });
		};
		$scope.selectUser = function (user) {
			$scope.active.user = user.id;
			$scope.user = user;
		}

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