
angular.module('gCom.controller').controller('AccountingController',function ($scope,DBService) {
	
	console.log('accounting controller loaded');
	
	DBService.getCount('Account').then(function(c){

			$scope.countOfAccounts = c;
	});

	

});
