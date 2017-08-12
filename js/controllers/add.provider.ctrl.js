angular.module('gCom.controller').controller('AddProviderController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('AddBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	 base.setDefaults = function () {
    
    	return {
    		reference:'',nom:'',representant:'',tel:'',email:'','fax':''
    	};
    	
  	 }
  	 base.setModel = function(){

  	 	return 'Fournisseur';
  	 }
	 angular.extend(this,base);
	 this.init();

	 //console.log('$scope.item ' + angular.toJson($scope.item));

});
