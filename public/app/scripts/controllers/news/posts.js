'use strict';
app
	.controller('postsMainCtrl', ['$scope', '$modal', 'categoriesCollection',
	function ($scope, $modal, categoriesCollection) {
		
        $scope.yourModel = {
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
    }]);