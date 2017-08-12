angular.module('gCom.controller').controller('AddPurchaseInvoiceController',function ($controller,$scope,$stateParams,$q,DBService,PurchaseService,Flash) {
   var base = $controller('AddOrderBaseController', {$scope: $scope,$q:$q,$stateParams:$stateParams,DBService:DBService,Flash:Flash});
   angular.extend(this,base);
   var ctrl = this;
	 ctrl.setDefaults = function () {
    
    	return {
    		reference:'',somme : 0,items:[]
    	};}
   $scope.state = 'pmgmt.invoice';

   
   base.setModel = function(){
      return 'FactureAchat';
   }
   
   ctrl.addNewCommand = function(){
        $scope.item.etat = 'en stock';

        DBService.getCounter('CommandeAchat','CA').then(function(o){
          $scope.item.reference = o.reference;
          DBService.create('CommandeAchat',$scope.item).then(function(d){
            console.log('command saved ' + angular.toJson(d));
            //problem on windows
            var lignes = [];
            angular.forEach($scope.item.items, function(v, key) {
              v.CommandeAchatId = d.id; 
              lignes.push(v);

            });  
              //bulk create
            DBService.bcreate('LigneCommande',lignes).then(function(){
              $scope.item.CommandeAchatId = d.id;
              var promises = [];
              DBService.create(base.setModel(),$scope.item).then(function(b){
                    /*angular.forEach(lignes, function(v, key) {
                       promises.push(ArticleService.incrementArticleQuantityAndSetBuyingPrice(v.ArticleId,v.quantite,v.prixAchat));
                    });
                    $q.all(promises).then(function(){
                      var message = 'Bon de livraison crée et stock mis à jour avec succés !';
                      var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                      $scope.$apply();

                    });*/
                    var message = 'Facture crée et réglée avec succés !';
                    var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);

              });                      
            });
          });


        })

     }
     ctrl.pay = function(){
       console.log("pay " +$scope.item.pay);

        if($scope.item.pay)
        {
            console.log("régler la commande");  
          DBService.getCounter('Reglement',base.getPrefix("Reglement")).then(function(o){
            $scope.item.reference = o.reference;
            $scope.item.type = "achat";

            DBService.create('Reglement',$scope.item
            ).then(function(c){
                $scope.reglement = c;
                //$scope.item.Facture = c;
                if($scope.item.id && c && c.id)
                {
                  //add cond if bl is not paid
                  DBService.update('FactureAchat',{ReglementId:c.id},$scope.item.id).then(function(d){
                            var message = 'Facture réglée avec succés !';
                            var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                  });
               }
                
            });            
          })

      }

     }
     ctrl.addToExistingCommand = function(){
        if($scope.CommandeAchat.facturee === true){
                        var message = 'Commande déja facturée !';
                        var id = Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                        return;          
        }
        DBService.create('FactureAchat',$scope.item).then(function(d){
          console.log('facture achat saved ' + angular.toJson(d));
          $scope.item.id = d.id;
          
          var item ={
                      facturee : true
          };
          DBService.update('CommandeAchat',item,$scope.item.CommandeAchatId).then(function(){
                        var message = 'Facture crée avec succés !';
                        ctrl.pay();
                        var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
          });

          /*var lignes = [];
          var caId = $scope.item.CommandeAchatId;
          angular.forEach($scope.item.items, function(v, key) {
            //v.CommandeAchatId = caId;
            v.FactureAchatId = $scope.item.id; 
            lignes.push(v);
          });*/

          /*DBService.bcreate('LigneCommande',lignes).then(function(){
                  var promises = [];
                  angular.forEach(lignes, function(v, key) {
                     promises.push(ArticleService.incrementArticleQuantityAndSetBuyingPrice(v.ArticleId,v.quantite,v.prixAchat));
                  });
                    var item ={
                      facturee : true
                    };
                    DBService.update('CommandeAchat',item,$scope.item.CommandeAchatId).then(function(){
                        var message = 'Facture crée avec succés !';
                        var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                        //$scope.$apply();

                    });
          });*/

        });

     }
     ctrl.addNew = function(){
        DBService.create('FactureAchat',$scope.item).then(function(d){
          console.log('facture achat saved ' + angular.toJson(d));
          $scope.item.id = d.id;
          var lignes = [];
          angular.forEach($scope.item.items, function(v, key) {
            //v.CommandeAchatId = caId;
            v.FactureAchatId = $scope.item.id; 
            lignes.push(v);
          });
          DBService.bcreate('LigneCommande',lignes).then(function(){
                    var message = 'Facture achat crée avec succés !';
                    var promises = [];
                    Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true); 
                      
                    /*DBService.update("CommandeVente",{facturee : true,FactureId : $scope.item.id },$scope.item.CommandeVenteId).then(function(){
                    
                      var message = 'Facture vente crée avec succés !';
                      Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true); 
                      //$scope.$apply();                       
                    })*/
                       
          });
              

        });
 
     }     
    ctrl.add = function(){
        ctrl.addNew();
        /*if($scope.item.CommandeAchatId)
        {
            ctrl.addToExistingCommand();
        } 
        else
        {
            ctrl.addNew();
        }*/
   }   
   ctrl.details = function()
   {
     if($stateParams.id)
     {
        console.log('id ' + $stateParams.id);
        DBService.getFullById("FactureAchat",$stateParams.id).then(function(c){
          $scope.item = c;
          $scope.fournisseur = c.Fournisseur;
          $scope.item.items = [];
          angular.forEach(c.LigneCommandes,function(v,key){
              $scope.item.items.push({
                reference:v.Article.reference,
                quantite:v.quantite,
                prixAchat : v.Article.prixAchat,
                description:v.description
              });

          });
        });
     }
     else
     {
      $scope.item.items = [];
     }
   }
   this.init = function(){
      base.init();
      $scope.pay = false;
      $scope.item.pay = false;
      ctrl.details();
      DBService.getCounter('FactureAchat','FA').then(function(o){
        $scope.item.reference = o.reference;
      })
   }
   this.init();
});
