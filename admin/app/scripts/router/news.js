'use strict';

app.config([
    '$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('main.news', {
          url : '/news',
          resolve: {
            icons: [
              '$http',
              function ($http) {
                return $http.get('/images/svg/svg.svg');
              }
            ],
            categoriesCollection: [
              'restCollection',
              function (restCollection) {
                return restCollection('categories').fetch();
              }
            ],
            newsCollection: [
              'restCollection',
              function (restCollection) {
                return restCollection('news').fetch();
              }
            ],
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
          views : {
            'content@main' : {
              controller : 'categoriesMainCtrl',
              templateUrl : 'views/news/categories.html'
            }
          }
        })
        .state('main.news.posts', {
          url : '/posts',
          views : {
            'content@main' : {
              controller : 'postsMainCtrl',
              templateUrl : 'views/news/posts.html'
            }
          }
        });
      }
    ]);