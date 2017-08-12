angular.module('gCom.controller').controller('AddPurchaseReglementController',function ($controller,$scope,$stateParams,$q,DBService,PurchaseService,Flash) {
   var base = $controller('AddOrderBaseController', {$scope: $scope,$q:$q,$stateParams:$stateParams,DBService:DBService,Flash:Flash});
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
   base.getPrefix = function(m){
    return 'RA';
   }
   

    ctrl.add = function(){
        $scope.item.type ="achat";
        DBService.getCounter('Reglement','RA').then(function(o){
              if(o)
              $scope.item.reference = o.reference;
              DBService.create('Reglement',$scope.item).then(function(d){
                if(d)
                {
                    
                    $scope.item.id = d.id;
                    console.log('reglement saved ' + angular.toJson(d));
                    var message = 'Réglement crée avec succés !';
                    var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                }
              });
        });
   }

   ctrl.details = function()
   {
     console.log("details");
     if($stateParams.id)
     {
        console.log('id ' + $stateParams.id);
        DBService.getFullById(base.setModel(),$stateParams.id).then(function(c){
          console.log(JSON.stringify(c));
          $scope.item = c;
          $scope.item.items = [];
          $scope.fournisseur = c.Fournisseur;
          angular.forEach(c.LivraisonAchat.CommandeAchat.LigneCommandes,function(v,key){
              $scope.item.items.push({

                reference:v.Article.reference,
                quantite:v.quantite,
                description:v.description
              });

          });
        });
     }
     else
     {
      $scope.item.items = [];
      DBService.getCounter('Reglement','RA').then(function(o){
              if(o)
                $scope.item.reference = o.reference;
              
      });      
     }
   }
   this.init = function(){
      base.init();
      ctrl.details();
            
      console.log("iniiiiiiiiit");
      //$scope.pay = false;
      /*DBService.getCounter('Reglement','RA').then(function(o){
        $scope.item.reference = o.reference;
      })*/
   }
   this.init();
});
