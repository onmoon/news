'use strict';
app
    .controller('categoriesMainCtrl', ['$scope', '$modal', 'categoriesCollection',
    function ( $scope, $modal, categoriesCollection) {
        $scope.categories = categoriesCollection;
        var cats = _.chain($scope.categories.models)
                    .pluck('attributes')
                    .groupBy('parent')
                    .value();

        function recurse(models) {
            return _.map(models, function (model){
                var obj = {};
                    obj.item = model;
                if(cats[model.id]){
                    obj.children = recurse(cats[model.id]);
                }
                return obj;
            });
        }
        $scope.cats = recurse(cats.null);

        $scope.$watch('cats', function (newValues){
            function recurse(models, id) {
                return _.each(models, function (model){
                    if (model.item.parent != id) {
                        model.item.parent = id;
                        categoriesCollection.get(model.item.id).set({ parent : id || null }).save();
                    }
                    if(model.children) {
                        model.children = recurse(model.children, model.item.id);
                    }
                });
            }
            recurse(newValues);
        });


        $scope.addCategory = function (category) {
            $scope.category = category || $scope.categories.new();
            $modal({
                scope: $scope,
                template: 'views/modals/news/categories.html',
                placement : 'center',
                show: true
            });
        };
    }]);
