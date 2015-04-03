'use strict';

app.config([
    '$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('main.files', {
          url : '/files',
          // resolve: {
          //   filesCollection : [
          //     'restCollection',
          //     function (restCollection) {
          //       return restCollection('files').fetch();
          //     }
          //   ]
          // },
          views: {
           'content@main': {
              controller : 'filesMainCtrl',
              templateUrl: 'views/files/main.html'
            } 
          }
        });
      }
    ]);