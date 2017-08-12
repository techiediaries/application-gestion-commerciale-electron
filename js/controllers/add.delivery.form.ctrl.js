angular.module('gCom.controller').controller('AddPurchaseDeliveryFormController',function ($controller,$scope,$q,$stateParams,ArticleService,DBService,Flash) {
	var base = $controller('AddOrderBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	 var ctrl = this;
   base.setDefaults = function () {
    
    	return {
    		reference:'',items:[]
    	};
    	
  	 }
     $scope.state = 'pmgmt.delivery';
     $scope.CommandeAchat = null;
     $scope.$watch('item.CommandeAchatId',function(){
        console.log('command achat changed ' + $scope.item.CommandeAchatId);
        console.log('items' + $scope.item.myitems);

     });

  	 base.setModel = function(){

  	 	return 'LivraisonAchat';
  	 }
     //needs modif link to LigneLivraisonAchat instead of LigneCommande
     ctrl.addNewCommand = function(){
        $scope.item.etat = 'en stock';
        $scope.item.livree = true;
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
                    
                    angular.forEach(lignes, function(v, key) {
                        promises.push(ArticleService.incrementArticleQuantityAndSetBuyingPrice(v.ArticleId,v.quantite,v.prixAchat));
                    });
                    $q.all(promises).then(function(){
                      var message = 'Bon de livraison crée et stock mis à jour avec succés !';
                      
                      var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                      $scope.$apply();

                    });
              });                      
            });
          });


        })

     }
     ctrl.addNewBL = function(){
       var lignes = [];
       var promises = [];
       $scope.item.payee = false;
        DBService.create(base.setModel(),$scope.item).then(function(b){
              $scope.item.id = b.id;
              angular.forEach($scope.item.items, function(v, key) {
                  v.LivraisonAchatId = b.id; 
                  lignes.push(v); 
              });
              DBService.bcreate('LigneLivraisonAchat',lignes).then(function(){
                  angular.forEach(lignes, function(v, key) {
                      promises.push(ArticleService.incrementArticleQuantityAndSetBuyingPrice(v.ArticleId,v.quantite,v.prixAchat));
                  });
                  $q.all(promises).then(function(){
                      var message = 'Bon de livraison crée et stock mis à jour avec succés !';
                      var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                      $scope.$apply();

                  });                 
              });
              /*PurchaseService.receivePurchaseOrder($scope.item).then(function(){
                var message = "Commannde d'achat reçue  avec succés !";
                var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
              });*/

             
        });
     }
     ctrl.addToExistingCommand = function(){
        if($scope.item.CommandeAchat.livree === true){
                        var message = 'Commande déja livrée !';
                        var id = Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                        return;          
        }
        DBService.create('LivraisonAchat',$scope.item).then(function(d){
          console.log('livraison achat saved ' + angular.toJson(d));
          $scope.item.id = d.id;
          var lignes = [];
          var caId = $scope.item.CommandeAchatId;
          angular.forEach($scope.item.items, function(v, key) {
            //v.CommandeAchatId = caId;
            v.LivraisonAchatId = $scope.item.id; 
            lignes.push(v);
          });

          DBService.bcreate('LigneLivraisonAchat',lignes).then(function(){
                  var promises = [];
                  angular.forEach(lignes, function(v, key) {
                     promises.push(ArticleService.incrementArticleQuantityAndSetBuyingPrice(v.ArticleId,v.quantite,v.prixAchat));
                  });
                  $q.all(promises).then(function(){
                    var item = {
                      etat: "en stock",
                      livree : true
                    }
                    DBService.update('CommandeAchat',item,$scope.item.CommandeAchatId).then(function(){

                        var message = 'Bon de livraison crée et stock mis à jour avec succés !';
                        var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                        //$scope.$apply();

                    });
                        
                  });
          });

        });

     }
     base.add = function(){
       $scope.item.payee = false;
        if($scope.item.CommandeAchatId)
        {
            ctrl.addToExistingCommand();
        } 
        else
        {
            ctrl.addNewBL();
        }
    }
    $scope.removeItem = function(item){
      $scope.item.items.splice($scope.item.items.indexOf(item), 1);
    }

	 angular.extend(this,base);
   ctrl.payIt = function(){
        DBService.getCounter('Reglement','RA').then(function(o){
          var reg = {
            reference : o.reference,
            FournisseurId : $scope.item.FournisseurId,
            somme : $scope.item.somme,
            date :$scope.item.date,
            type : "achat",
            paiement : $scope.item.paiement || "espéces",
            chequeno : $scope.item.chequeno || null
          };
          DBService.create('Reglement',reg).then(function(d){
                    var item = {
                      payee: true
                    }
                    DBService.update('LivraisonAchat',item,$scope.item.id).then(function(){
                        $scope.item.payee = true;
                        var message = 'Bon de livraison réglé avec succés !';
                        var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                    
                    });
          });
        });
   }
	 base.details = function()
   {
     if($stateParams.id)
     {
        console.log('id ' + $stateParams.id);
        DBService.getFullById(base.setModel(),$stateParams.id).then(function(c){
          $scope.item = c;
          $scope.CommandeAchat = c.CommandeAchat;
          $scope.item.FournisseurRef = c.Fournisseur.reference;
          $scope.item.FournisseurNom = c.Fournisseur.nom;
          $scope.item.items = [];
          angular.forEach(c.LigneLivraisonAchats,function(v,key){
              $scope.item.items.push({

                reference:v.Article.reference,
                quantite:v.quantite,
                prixAchat:v.Article.prixAchat,
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
      DBService.getCounter('LivraisonAchat','BL').then(function(o){
        $scope.item.reference = o.reference;  
      });
      /*$scope.$watch("item.CommandeAchatId",function(){
          console.log("commande achat changed");
          if($scope.item.CommandeAchatId){
            DBService.getFullById("CommandeAchat",$scope.item.CommandeAchatId).then(function(c){

            });
          }
      });*/
      
   }
   this.init();
   
   console.log('$scope.item ' + angular.toJson($scope.item));
});
