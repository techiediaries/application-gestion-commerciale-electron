angular.module('gCom.controller').controller('ListCashController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	base.getModel = function(){

  	 	return 'Caisse';
  	}


  	base.hookSelectionHandler = function(){
  				
	}
	
	angular.extend(this,base);
  	this.init();
 });
