'use strict';

app.directive('slimScroll', function (){
  	return {
  		restrict : 'EA',
  		link : function (scope, element) {
  			element.slimscroll(element.data());
  		}
  	};
  });