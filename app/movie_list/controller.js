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