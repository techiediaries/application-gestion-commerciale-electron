angular.module('gCom.controller').controller('AddSaleOrderController',function ($controller,$scope,$q,$stateParams,ArticleService,DBService,Flash) {
  var base = $controller('AddSaleDocumentController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
  angular.extend(this,base); 
  var ctrl = this;
  base.setDefaults = function () {
    
      return {
        reference:'',items:[],taxe:0.2,
      };
      
  }
  $scope.state = 'smgmt.createOrder';
  $scope.title = 'Commande';

  base.beforeCreateModel = function(){
    console.log("before creating model");
    var item = {};
    item.facturee = false;
    item.livree = false;
    return item;

  }
    
  this.setModel = function(){

      return 'CommandeVente';
  }
  this.setLineModelIdString = function(){
      return 'CommandeVenteId';
  }  
  /*$scope.$watch("item.reference",function(){
      console.log("reference changed ");
        if($scope.item && $scope.item.reference && $scope.item.reference !== '')
          ctrl.reloadItem();
  });*/

  this.init();
   

});
