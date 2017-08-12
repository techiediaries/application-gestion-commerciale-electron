angular.module('gCom.controller').controller('AddQuotationController',function ($controller,$scope,$rootScope,$location,$q,$stateParams,ArticleService,DBService,Flash) {
  var base = $controller('AddSaleDocumentController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
  angular.extend(this,base); 
  var ctrl = this;

  base.setDefaults = function () {
    
      return {
        reference:'',items:[],taxe:0.2,
      };
      
     }
  $scope.state = 'smgmt.createDevis';
  $scope.title = 'Devis';
  ctrl.setModel = function(){

      return 'Devis';
  }
  ctrl.setLineModelIdString = function(){
      return 'DeviId';
  }  
  ctrl.setPrefix = function(){
      return 'DV';
  }
  /*ctrl.hookAddSuccessCompletion = function(){
  }*/
  ctrl.setAddSuccessCompletionMessage = function(){

    return "DEVIS CREE AVEC SUCCES";
  }
  /*ctrl.add = function(){
        //$scope.item.etat = 'en stock';
        if($scope.item.id)
        {
          //base.update();
          return ;
        }
        DBService.create(ctrl.setModel(),$scope.item).then(function(d){
          console.log('doc added ' + angular.toJson(d));
          //problem on windows
          var lignes = [];
          $scope.item.id =d.id;
          angular.forEach($scope.item.items, function(v, key) {
            v[ctrl.setLineModelIdString()] = d.id; 
            lignes.push(v);

          });  
            //bulk create
          DBService.bcreate('LigneVente',lignes).then(function(){
                    var message = 'Opération terminée avec succés !';
                    DBService.update("CommandeVente",{facturee : true,FactureId : $scope.item.id },$scope.item.CommandeVenteId).then(function(){
                      var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                      //$scope.$apply();                       
                    })
                       
          });
        });
    }*/     
   ctrl.init();
   /*ctrl.aclear = function(){
    //base.clear();
    $scope.item = {};
    $scope.client = {};
    $scope.item.items = [];
    //base.clear();
    console.log("setting model " + ctrl.setModel());
    DBService.getCounter(base.setModel(),base.getPrefix(base.setModel())).then(function(r){
              
              $scope.item.reference = r.reference;
              $scope.item.taxe = $scope.company.taxe;
              $scope.item.paiement = "espéces";
              $scope.item.monnaie = $scope.company.monnaie;
              $scope.item.items = []; 
              //$scope.$apply();
    }); 

   }   */

});
