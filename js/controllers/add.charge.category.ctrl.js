angular.module('gCom.controller').controller('AddChargeCategoryController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('AddBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	 base.setDefaults = function () {
    
    	return {
    		reference:''
    	};
    	
  	 }
  	 base.setModel = function(){

  	 	return 'CategorieCharge';
  	 }

   angular.extend(this,base);
	 this.init();
});
