'use strict';
app
    .controller('filesMainCtrl', ['$scope', 'filesCollection',
    function ( $scope, filesCollection) {
    	$scope.files = filesCollection;
    }]);
