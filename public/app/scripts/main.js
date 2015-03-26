var app = angular.module('admin', [
    'ui.router',
    'mgcrea.ngStrap',
    'restangular',
  ]).config(['RestangularProvider',function (RestangularProvider){

  	RestangularProvider.setBaseUrl('/api');

  }]);
