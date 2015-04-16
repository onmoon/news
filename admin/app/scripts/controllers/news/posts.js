'use strict';
app
	.controller('postsMainCtrl', ['$scope', 'newsCollection', 'categoriesCollection',
	function ($scope, newsCollection, categoriesCollection) {
		$scope.news = newsCollection;
        $scope.cats = _.pluck(categoriesCollection.models, 'attributes');

        $scope.newPost = {};
        $scope.redactor = {
            customMenu : [
                ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
                ['font'],
                ['font-size'],
                ['font-color', 'hilite-color'],
                ['remove-format'],
                ['ordered-list', 'unordered-list', 'outdent', 'indent'],
                ['left-justify', 'center-justify', 'right-justify'],
                ['code', 'quote', 'paragragh'],
                ['link', 'image']
            ]
        };
        $scope.save = function () {
            $scope.news.new($scope.newPost).save()
                .then(function(res){
                    $scope.newPost = {};
                });
        };
}]);