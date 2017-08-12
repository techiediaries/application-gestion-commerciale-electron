angular.module('gCom.controller').controller('ListUserController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	base.getModel = function(){

  	 	return 'User';
  	}


	
	angular.extend(this,base);
  	this.init();
  	
	 
	 
});
