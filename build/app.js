'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
	'ngRoute',
	'moviecat.details',
	'moviecat.movie_list',
	/*'moviecat.details',
	'moviecat.search',*/
	'moviecat.auto_focus',
	'maviecat.loading'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/in_theaters/1'
	});
}]).controller('SearchController', ['$scope', '$route', function($scope, $route) {
	$scope.input = '';
	$scope.search = function() {
		$route.updateParams({
			movieList: 'search',
			q: $scope.input
		});
	}
}]).constant('APIconstant', {
	pageSize: 10,
	detailAddress: 'http://api.douban.com/v2/movie/subject/',
	apiAddress: 'http://api.douban.com/v2/movie/'
});
;
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

(function(angular) {
	'use strict'


	var http = angular.module('moviecat.service.http', []);
	http.service('HttpService', ['$window', '$document', function($window, $document) {
		this.jsonp = function(url, data, callback) {
			/*var funcName = 'clb'+*/
			var dataStyle = url.indexOf('?') == -1 ? '?' : '&';
			for (var key in data) {
				dataStyle += (key + '=' + data[key] + '&');
			}
			
			var funcName = 'JSON_CALLBACK' + Math.random().toString().replace('.', '');
			$window[funcName] = function(data){
				callback(data);
				$document[0].body.removeChild(script);
			};
			//var funcName = 'callback=JSON_CALLBACK';
			var script = $document[0].createElement('script');
			script.src = url + dataStyle+'callback=' + funcName;
			$document[0].body.appendChild(script);

		}
	}]);
})(angular);
(function(angular){
	angular.module('maviecat.loading',[])
		.directive('loading',function(){
			return {
				restrict:'E',
				template:`<div class="mask" ng-if="mask">
							<div class="spinner">
								<div class="double-bounce1"></div>
								<div class="double-bounce2"></div>
							</div>
						</div>`,
				link:function($scope){
					$scope.mask = true;
				}
			}
		})
})(angular);

(function(angular) {
	'use strict'

	angular.module('moviecat.details', ['ngRoute',
			'moviecat.service.http'
		])
		.config(['$routeProvider', '$locationProvider',  function($routeProvider, $locationProvider) {
			$locationProvider.hashPrefix('');
			$routeProvider
				.when('/subject/:id', {
					templateUrl: './app/details/view.html',
					controller: 'DetailsController'
				});
		}]).controller('DetailsController', [
			'$scope',
			'$routeParams',
			'$route',
			'$http',
			'HttpService',
			'APIconstant',
			function($scope, $routeParams, $route, $http, HttpService,APIconstant) {
				HttpService.jsonp(APIconstant.detailAddress + $routeParams.id, {}, function(res) {
					$scope.mask = false;
					$scope.res = res;
					$scope.$apply('res');
				});
			}
		]);
})(angular);
(function(angular) {
	'use strict'

	angular.module('moviecat.movie_list', ['ngRoute',
			'moviecat.service.http'
		])
		.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
			$locationProvider.hashPrefix('');
			$routeProvider
				.when('/:movieList/:page', {
					templateUrl: './app/movie_list/view.html',
					controller: 'MovieListController'
				});
		}]).controller('MovieListController', ['$scope', '$routeParams', '$route', '$http', 'HttpService', 'APIconstant', function($scope, $routeParams, $route, $http, HttpService, APIconstant) {
			$scope.currentPage = parseInt($routeParams.page) || 1;
			$scope.count = APIconstant.pageSize;
			HttpService.jsonp(APIconstant.apiAddress + $routeParams.movieList, {
				start: ($scope.currentPage - 1) * $scope.count,
				count: $scope.count,
				q: $routeParams.q
			}, function(res) {
				$scope.items = res;
				$scope.$apply('items');
				$scope.mask = false;
				$scope.$apply('mask');
				$route.updateParams({
					page: $scope.currentPage
				});
			});
			$scope.updateP = function(p) {
				if (p >= 1 && p <= $scope.items.total / $scope.count + 1) {
					$route.updateParams({
						page: p
					});
				}
			}
		}]);
})(angular);