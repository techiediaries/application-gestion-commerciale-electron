
angular.module('gCom.controller').controller('CashController',function ($scope,$rootScope,$location,CaisseService) {
	
	console.log('cash controller loaded');
	
	/*CaisseService.getTotal().then(function(c){

			$scope.cashTotal = c;
	});*/
  if($rootScope.User && !$rootScope.User.isAdmin)
  {
     $scope.saveEnabled = false;
     $location.path('/404');  

  }
	

});
