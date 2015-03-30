'use strict';

app.config([
    '$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('main.users', {
          url : '/users',
          resolve: {
            usersCollection : [
              'RestCollection',
              function (RestCollection) {
                return RestCollection('users').fetch();
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