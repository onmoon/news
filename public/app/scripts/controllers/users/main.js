'use strict';
app
	.controller('usersMainCtrl', ['$scope','groupsResolve', 'usersResolve', '$modal', 'Restangular',
	function ( $scope, groupsResolve, usersResolve, $modal, Restangular) {


		$scope.active = {
			group : -1,
      user : -1
		};
		$scope.groups = groupsResolve;
		$scope.users = usersResolve.plain();
		$scope.user = _.first($scope.users);
    $scope.newUser = {};

		$scope.selectGroup = function (group) {
			$scope.active.group = group.id;
		}
    $scope.selectUser = function (user) {
      $scope.active.user = user.id;
      $scope.user = user;
    }
    $scope.submit = function () {
      var request;
      if($scope.user.id) {
        request = Restangular.one('users', $scope.user.id).customPUT($scope.user)
      } else {
        request = Restangular.all('users').post($scope.user)
      }
      request.then(function (res){
          console.log(res);
        })
    }

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
