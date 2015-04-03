'use strict';
app
    .controller('categoriesMainCtrl', ['$scope', '$modal', 'categoriesCollection',
    function ( $scope, $modal, categoriesCollection) {
        $scope.categories = categoriesCollection;
        $scope.setCollection = function (collection) {
            var cats = _.chain(collection.models)
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
        };
        $scope.setCollection($scope.categories);

        $scope.$watch('cats', function (newValues){
            function recurse(models, id) {
                return _.each(models, function (model){
                    if (model.item.parent!=id) {
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

        $scope.editCategory = function (category) {
            $scope.addCategory($scope.categories.get(category.id));
        };
        $scope.removeCategory = function (category) {
            $scope.categories.get(category.id).remove()
                .then(function (){
                    $scope.setCollection($scope.categories);
                });
        };


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
