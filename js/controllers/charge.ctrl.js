
angular.module('gCom.controller').controller('ChargeController',function ($scope,ChargeService) {
	
	console.log('charge controller loaded');
	
	ChargeService.getTotal().then(function(c){

			$scope.chargeTotal = c;
	});

	

});
