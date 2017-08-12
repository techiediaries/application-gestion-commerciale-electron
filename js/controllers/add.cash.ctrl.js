angular.module('gCom.controller').controller('AddCashController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('AddBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	 base.setDefaults = function () {
    
    	return {
    		reference:''
    	};
    	
  	 }
  	 base.setModel = function(){

  	 	return 'Caisse';
  	 }

   angular.extend(this,base);

	 this.init();
   $scope.item.operation = 'entrée';
});
