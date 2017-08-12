angular.module('gCom.controller').controller('AddChargeController',function ($controller,$scope,$q,DBService,ChargeService,Flash) {
	var base = $controller('AddBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	 base.setDefaults = function () {
    
    	return {
    		reference:''
    	};
    	
  	 }
  	 base.setModel = function(){

  	 	return 'Charge';
  	 }

   angular.extend(this,base);
	 this.init();
   base.hookAddHandler = function(){
        console.log("hooking add handler from Charge controller");
        $scope.$apply();
    }   
   this.init = function(){
    base.init();
     
     ChargeService.getCategories().then(function(d){
      $scope.categories = d;
      $scope.$apply();
      
     });       
   }

   this.init();

});
