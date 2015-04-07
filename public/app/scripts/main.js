/*global app: true*/
/* exported app */

'use strict';
var app = angular.module('admin', [
    'ui.router',
    'mgcrea.ngStrap',
    'restangular',
    'wysiwyg.module',
    'ng-nestable',
  ]).config(['RestangularProvider', '$nestableProvider',
  	function (RestangularProvider, nestableProvider) {

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



}]);
