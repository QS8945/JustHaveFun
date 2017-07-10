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