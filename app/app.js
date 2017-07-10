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