(function(angular){
	'use strict'
	
	angular.module('moviecat.auto_focus',[])
		.directive('autoFocus',['$location', function($location){
			/*var path = "#";
			path += $location.path();*/
			return {
				restrict:'A',
				link:function($scope,iElm){
					$scope.$location = $location;
					$scope.$watch('$location.path()',function(now){
						if(('#'+now) == iElm.children().attr('href')){
							iElm.parent().children().removeClass('active');
							iElm.addClass('active');
						};
					})
				}
			}
		}]);
})(angular);
