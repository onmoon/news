'use strict';
app.controller('modalNewsCategoriesCtrl', ['$scope',
	function ($scope) {
		$scope.cats = _.pluck($scope.categories.models, 'attributes');
		$scope.save = function ($hide) {
			$scope.category.save().then(function(res){
				//if PUT res=1
				$scope.setCollection(res.models ? res : $scope.categories);
				$hide();
			});
		};
		$scope.remove = function ($hide) {
			$scope.category.remove()
                .then(function (){
                    $scope.setCollection($scope.categories);
                    $hide();
                });
		};
	}]);