/*global app: true*/
/* exported app */

'use strict';
var app = angular.module('admin', [
    'ui.router',
    'mgcrea.ngStrap',
    'restangular',
    'ng-nestable',
    'angular-medium-editor'
])
.config(['RestangularProvider', '$nestableProvider', '$compileProvider',
  	function (RestangularProvider, nestableProvider, $compileProvider) {
	$compileProvider.debugInfoEnabled(true);
  	RestangularProvider.setBaseUrl('/api');
  	nestableProvider.defaultOptions({
		listNodeName    : 'ol',
		itemNodeName    : 'li',
		rootClass       : 'dd',
		listClass       : 'dd-list',
		itemClass       : 'dd-item',
		dragClass       : 'dd-dragel',
		handleClass     : 'dd-handle',
		collapsedClass  : 'dd-collapsed',
		placeClass      : 'dd-placeholder',
		noDragClass     : 'dd-nodrag',
		emptyClass      : 'dd-empty',
		expandBtnHTML   : '<button data-action="expand" type="button">Expand</button>',
		collapseBtnHTML : '<button data-action="collapse" type="button">Collapse</button>',
		group           : 0,
		maxDepth        : 5,
		threshold       : 20
  	});
}])
.controller('MainAppCtrl',['$scope', 'socket', function ($scope, socket) {
	$scope.socket = socket;
	$scope.socket.on('weather', function (res){
		$scope.weather = res;
	});
	$scope.socket.emit('join', {});

}]);
