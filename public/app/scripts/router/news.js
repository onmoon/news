'use strict';

app.config([
    '$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('main.news', {
          url : '/news',
          resolve: {
            categoriesCollection: [
              'restCollection',
              function (restCollection) {
                return restCollection('categories').fetch();
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
        })
        .state('main.news.categories', {
          url : '/categories',
          resolve: {
            categoriesCollection: [
              'restCollection',
              function (restCollection) {
                return restCollection('categories').fetch();
              }
            ],
          },
          views : {
            'content@main' : {
              controller : 'categoriesMainCtrl',
              templateUrl : 'views/news/categories.html'
            }
          }
        });
      }
    ]);