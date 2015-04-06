'use strict';
app.
	controller('modalUploadFilesCtrl', ['$scope', 'Restangular',
	function ($scope, Restangular) {
		$scope.upload = function (e) {
			debugger
		}

	}])
	.directive('uploadFile', ['Restangular', function (Restangular){
		return {
			restrict : 'EA',
			link : function (scope, element, attr) {
				var el = element[0];
				var sendFiles = new FormData();
				var upload = function (e) {
					e.preventDefault();

					var type = e.type;
					var files = type === 'drop' ? e.dataTransfer.files : e.target.files;
					_.each(files, uploadImage);
					return false;
				}
				var uploadImage = function (file) {
					var reader = new FileReader();
					reader.onload = function (event) {
						element.append($('<img>').attr('src', event.target.result).addClass(''));
					};
					reader.readAsDataURL(file);
					sendFiles.append('file', file);
				};
				element.find('.btn').on('click', function (){
					Restangular.all('upload').post(sendFiles).then(function(){
						debugger
					})
				})
				el.onchange = upload;
				el.ondrop = upload;
				el.ondragover = function () {element.addClass('hover'); return false; };
				el.ondragend = function () {element.removeClass('hover'); return false; };
			}
		}
	}])