
angular.module('gCom.controller').controller('ListSaleInvoiceController',function ($controller,$scope,$q,DBService,Flash) {
	
	
	
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	base.getModel = function(){

  	 	return 'Facture';
  	}
	angular.extend(this,base);
  	this.init();
    this.getDetailsState = function(){
      return 'smgmt.invoice({id:selected.id})';
    }
	 

});
