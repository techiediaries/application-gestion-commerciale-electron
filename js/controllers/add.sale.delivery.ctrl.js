angular.module('gCom.controller').controller('AddSaleDeliveryController',function ($controller,$scope,$q,$stateParams,ArticleService,DBService,Flash) {
	var base = $controller('AddSaleDocumentController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	 var ctrl = this;
   base.setDefaults = function () {
    
    	return {
    		reference:'',items:[],taxe:0.2,payee : false
    	};
    	 
  	 }
     $scope.state = 'smgmt.delivery';
     $scope.title = 'Bon de livraison';


   base.setModel = function(){

      return 'LivraisonVente';
     }
   base.setLineModelIdString = function(){
      return 'LivraisonVenteId';
   }  
   base.setPrefix = function(){
      return 'BL';
   }
   angular.extend(this,base); 

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
                    DBService.update("CommandeVente",{livree : true,LivraisonVenteId : $scope.item.id },$scope.item.CommandeVenteId).then(function(){
                    
                    angular.forEach(lignes, function(v, key) {
                       promises.push(ArticleService.decrementArticleQuantity(v.ArticleId,v.quantite));
                    });
                    $q.all(promises).then(function(){
                      var message = 'Bon de livraison crée et stock mis à jour avec succés !';
                      var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                      $scope.$apply();

                    });
                      
                      //$scope.$apply();                       
                    })
                       
          });
        });
    }     
   ctrl.init();
   

});
