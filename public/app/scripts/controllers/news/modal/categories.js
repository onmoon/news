'use strict';
app.controller('modalNewsCategoriesCtrl', ['$scope',
	function ($scope) {
		$scope.cats = _.pluck($scope.categories.models, 'attributes');
		$scope.save = function ($hide) {
			$scope.category.save().then($hide);
		};
		$scope.remove = function ($hide) {
			$scope.category.remove().then($hide);
		};
	}]);