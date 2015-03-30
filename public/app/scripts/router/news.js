'use strict';

app.config([
    '$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('main.news', {
          url : '/news',
          resolve: {
            categoriesCollection: [
              'RestCollection',
              function (RestCollection) {
                return RestCollection('categories').fetch();
              }
            ],
            // groupsResolve: [
            //   'Restangular',
            //   function (Restangular) {
            //     return Restangular.all('groups').getList();
            //   }
            // ],
          },
          views: {
           'content@main': {
              controller : 'newsMainCtrl',
              templateUrl: 'views/news/main.html'
            } 
          }
        });
      }
    ]);