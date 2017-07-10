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