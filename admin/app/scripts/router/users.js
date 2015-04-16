'use strict';

app.config([
    '$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('main.users', {
          url : '/users',
          resolve: {
            usersCollection : [
              'restCollection',
              function (restCollection) {
                return restCollection('users').fetch();
              }
            ],
            groupsCollection: [
              'restCollection',
              function (restCollection) {
                return restCollection('groups').fetch();
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