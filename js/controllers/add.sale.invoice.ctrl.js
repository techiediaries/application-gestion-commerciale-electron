angular.module('gCom.controller').controller('AddSaleInvoiceController',function ($controller,$scope,$q,$stateParams,ArticleService,DBService,Flash) {
  var base = $controller('AddSaleDocumentController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
  angular.extend(this,base);
  var ctrl = this;
  base.setDefaults = function () {
    
      return {
        reference:'',items:[],taxe:0.2,timbre : 0.25
      };
      
     }
   $scope.state = 'smgmt.invoice';
   $scope.title = 'Facture';


     
   this.setModel = function(){

      return 'Facture';
     }
   this.setLineModelIdString = function(){
      return 'FactureId';
   }  
    ctrl.add = function(){
        //$scope.item.etat = 'en stock';
        if($scope.item.id)
        {
          //base.update();
          return ;
        }
        $scope.item.payee = false;
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
                    var message = 'BL crée avec succés !';
                    var promises = [];
                    DBService.update("CommandeVente",{facturee : true,FactureId : $scope.item.id },$scope.item.CommandeVenteId).then(function(){
                    
                    /*angular.forEach(lignes, function(v, key) {
                       promises.push(ArticleService.decrementArticleQuantity(v.ArticleId,v.quantite));
                    });
                    $q.all(promises).then(function(){
                      var message = 'Bon de livraison crée et stock mis à jour avec succés !';
                      var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                      $scope.$apply();

                    });*/
                      var message = 'Facture vente crée avec succés !';
                      Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true); 
                      //$scope.$apply();                       
                    })
                       
          });
        });
    }

   this.hookAddSuccessCompletion = function(){
      console.log("hooking add from add invoice ");
      var message = 'Facture vente crée avec succés !';
      if($scope.CommandeVenteId)
      {
          DBService.update("CommandeVente",{facturee : true,FactureId : $scope.item.id },$scope.item.CommandeVenteId).then(function(){
              Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);                      
          });
      }
      else
      {
          Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);   
      }
    }
    this.hookDetails = function(){
      console.log("hooking details from add invoice ");
      /*DBService.getById("CommandeVente",$scope.item.id).then(function(o){

      });*/
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
    
  
  this.addEmpty = function(){
      $scope.item.items.push({reference  : '---'});
  }

  this.init();
   

});
