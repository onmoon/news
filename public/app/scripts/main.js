var app = angular.module('admin', [
    'ui.router',
    'mgcrea.ngStrap',
    'restangular',
    'wysiwyg.module',
  ]).config(['RestangularProvider',function (RestangularProvider){

  	RestangularProvider.setBaseUrl('/api');

  }]);
