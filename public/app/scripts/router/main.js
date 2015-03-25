'use strict';

angular
  .module('admin')
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('main', {
          url: '/',
          views: {
            'main': {
              templateUrl: 'views/partials/layout.html'
            },
            'header@main': {
              templateUrl: 'views/partials/header.html'
            },
            'nav@main': {
              templateUrl: 'views/partials/nav.html'
            }
          }
        });

        $urlRouterProvider.otherwise("/");

      }
    ]);