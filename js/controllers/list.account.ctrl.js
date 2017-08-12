angular.module('gCom.controller').controller('ListAccountController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	base.getModel = function(){

  	 	return 'Account';
  	}


	
	angular.extend(this,base);
  	this.init();
  	
	 
	 
});
