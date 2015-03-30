'use strict';

app.config([
    '$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('main.users', {
          url : '/users',
          resolve: {
            usersResolve: [
              'Restangular',
              function (Restangular) {
                return Restangular.one('users').getList();
              }
            ],
            groupsCollection: [
              'RestCollection',
              function (RestCollection) {
                return RestCollection('groups').fetch();
              }
            ],
          },
          views: {
           'content@main': {
              controller : 'usersMainCtrl',
              templateUrl: 'views/users/main.html'
            } 
          }
        });
      }
    ]);