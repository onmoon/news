'use strict';
app.directive('uploader', ['Restangular', function (Restangular){
	return {
		restrict : 'EA',
		link : function (scope, element) {
			var el = element[0];
			var sendFiles = new FormData();
			var upload = function (e) {
				e.preventDefault();

				var type = e.type;
				var files = type === 'drop' ? e.dataTransfer.files : e.target.files;
				_.each(files, uploadImage);
				return false;
			};
			var uploadImage = function (file, index) {
				index = sendFiles.length + index || 0;
				var reader = new FileReader();
				reader.onload = function (event) {
					element.append($('<img>').attr('src', event.target.result).addClass(''));
				};
				reader.readAsDataURL(file);
				sendFiles.append('file', file);
			};
			element.find('.btn').on('click', function (){
				Restangular.all('upload')
				.withHttpConfig({transformRequest: angular.identity})
				.customPOST(sendFiles, undefined, undefined, {'Content-Type': undefined})
				.then(function(res){
					scope.uploadSuccess(res);
				});
			});
			el.onchange = upload;
			el.ondrop = upload;
			el.ondragover = function () {element.addClass('hover'); return false; };
			el.ondragend = function () {element.removeClass('hover'); return false; };
		}
	};
}]);