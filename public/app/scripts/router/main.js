'use strict';
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('main', {
          url: '',
          abstract: true,
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
        })
        .state('main.index', {
          url : '/',
          views: {
           'content@main': {
              templateUrl: 'views/dashboard/main.html'
            } 
          }
        });
        $urlRouterProvider.otherwise('/');

      }
    ]);