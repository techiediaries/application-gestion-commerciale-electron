angular.module('gCom.controller').controller('AddSaleReglementController',function ($controller,$scope,$rootScope,$stateParams,$q,DBService,PurchaseService,Flash) {
   var base = $controller('AddSaleDocumentController', {$scope: $scope,$q:$q,$stateParams:$stateParams,DBService:DBService,Flash:Flash});
   angular.extend(this,base);
   var ctrl = this;
	 ctrl.setDefaults = function () {
    
    	return {
    		reference:'',somme : 0,items:[]
    	};}
   $scope.state = 'pmgmt.reglement';
   $scope.pay = false;
   base.setModel = function(){
      return 'Reglement';
   }
   

    this.add = function(){
        $scope.item.type ="vente";
        DBService.getCounter('Reglement','RE').then(function(o){
              if(o)
              $scope.item.reference = o.reference;
              DBService.create('Reglement',$scope.item).then(function(d){
                if(d)
                {
                    
                    $scope.item.id = d.id;
                    console.log('reglement saved ' + angular.toJson(d));
                    var lignes = [];
                    var ids = [];
                    $scope.item.id = d.id;
                    angular.forEach($scope.item.items, function(v, key) {
                      //v[ctrl.setLineModelIdString()] = d.id; 
                      //lignes.push(v);
                      ids.push(v.id);

                    });  
                      //bulk create
                      if($scope.item.items.length > 0)
                      {
                          DBService.bupdate('LivraisonVente',{payee : true , ReglementId : d.id},ids).then(function(){
                                    
                                    //ctrl.hookAddSuccessCompletion();
                                  var message = 'Réglement crée avec succés !';
                                  var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                                    
                                      
                          });
                      }else
                      {
                                  var message = 'Réglement crée avec succés !';
                                  var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                                                              
                      }

                }
              });
        });
   }
  this.clear = function(){
    //base.clear();
    $scope.item = {};
    //$scope.item.taxe = 0.2;
    $scope.data = {};
    $scope.data.somme = 0;
    $scope.data.sommeht = 0;
    $scope.item.timbre = 0.25;
    $scope.item.somme = 0;
    $scope.client = {};
    $scope.item.items = [];
    //base.clear();
    //console.log("setting model " + this.setModel());
    $scope.company = $rootScope.Company;
    DBService.getCounter("Reglement","RE").then(function(r){
        if(r)
        { 
              $scope.item.reference = r.reference;
              $scope.item.taxe = $scope.company.taxe;
              $scope.item.timbre = 0.25;
              $scope.item.paiement = "espéces";
              $scope.item.monnaie = $scope.company.monnaie;
              $scope.item.items = []; 

        }      
              //$scope.$apply();
    }); 

  }
   base.details = function()
   {
     if($stateParams.id)
     {
        console.log('id ' + $stateParams.id);
        DBService.getFullById("Reglement",$stateParams.id).then(function(c){
          console.log("Reglement details : " + JSON.stringify(c)); ; 
          $scope.item = c;
          $scope.client = c.Client;
          $scope.item.items = c.LivraisonVentes;
          
        });
     }
     else
     {
      $scope.item.items = [];
     }
   }
   function cSomme(){
     angular.forEach($scope.item.items,function(key,v){
        $scope.data.somme += v.somme;
        $scope.data.sommeht += v.sommeHT;
     });
   }
   ctrl.init = function(){
     base.init();
     $scope.data = {};
     $scope.data.somme = 0;
     $scope.data.sommeht = 0; 
     $scope.$watch("item.items.length",function(){
       console.log("change");
      $scope.data.somme = 0;
      $scope.data.sommeht = 0; 
      for(var i = 0 ; i < $scope.item.items.length ; i++)
      {
        $scope.data.somme += $scope.item.items[i].somme;
        $scope.data.sommeht += $scope.item.items[i].sommeHT;
      }
     });
     $scope.item = this.setDefaults();
   }

   ctrl.init();
});
