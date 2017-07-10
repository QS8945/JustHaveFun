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
