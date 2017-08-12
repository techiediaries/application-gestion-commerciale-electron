angular.module('gCom.controller').controller('ListBanqueController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	base.getModel = function(){

  	 	return 'Banque';
  	}

	
	angular.extend(this,base);
  	this.init();
  	
	 
	 
});
