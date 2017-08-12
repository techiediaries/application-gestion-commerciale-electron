angular.module('gCom.controller').controller('AddMoveController',function ($controller,$scope,$q,$state,DBService,Flash) {
	var base = $controller('AddBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;
   base.setDefaults = function () {
  $scope.getArticle = function(item){
    console.log("we have an item " + angular.toJson(item));
    if(item)
    {
      $scope.item.ArticleId = item.ArticleId; 
      $scope.item.prixAchat = item.prixAchat;
      $scope.item.prixUnitaire = item.prixUnitaire;
      $scope.item.cause = "achat";
      $scope.item.libelle = "Achat";
      $state.go("^");
    }
    
  }    
    	return {
    		reference:'','type':'entrée'
    	};
    	
  	 }
  	 base.setModel = function(){

  	 	return 'Movement';
  	 }
	base.hookAddHandler = function(){
      console.log("hooking move ");
                DBService.getById('Article',$scope.item.ArticleId).then(function(a){
                  
                    var ar = {
                      qReel : a.qReel + parseFloat($scope.item.quantite),
                      prixAchat: parseFloat($scope.item.prixAchat),
                      prixUnitaire :  parseFloat($scope.item.prixUnitaire)
                    };
                    DBService.update('Article',ar,$scope.item.ArticleId).then(function(){
                      ctrl.clear();
                      var message = 'Opération faite avec succés !';
                      Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                      //$scope.$apply();
              
                    });
                                    
                });

	}    
  	base.add = function(){
 		//console.log('adding item ' + angular.toJson($scope.item) + ' to data base model ' + ctrl.setModel());
 		var deferred = $q.defer();
 		DBService.create(base.setModel(),$scope.item).then(

	 		function(r){
	 			console.log("adding something ");
        
		        base.hookAddHandler(); 	
				//ctrl.clear(); 			
				deferred.resolve(r);
	 		},
	 		function(e){
		        var message = 'Erreur !';
		        Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);	 			
	 			deferred.resolve(e);
	 		}
 		)
		return deferred.promise;
 	}

   $scope.selectArticleState = 'inventory.inmove';
   $scope.selectedArticle = {
        reference:''
   };
   $scope.getSelectedArticleInfo = function(){
    return $scope.selectedArticle.reference ;
   }   
	 angular.extend(this,base);
	 this.init();

	 //console.log('$scope.item ' + angular.toJson($scope.item));

})
.controller('RemoveMoveController',function ($controller,$scope,$q,$state,DBService,Flash) {
  var base = $controller('AddBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
  var ctrl = this;
  $scope.getArticle = function(item){
    console.log("we have an item " + angular.toJson(item));
    if(item)
    {
      $scope.item.ArticleId = item.ArticleId; 
      $scope.item.prixAchat = item.prixAchat;
      $scope.item.prixUnitaire = item.prixUnitaire;
      $scope.item.cause = "vente";
      $scope.item.libelle = "vente";
      $state.go("^");
    }
        
  }   
   base.setDefaults = function () {
    
      return {
        reference:'',type:'sortie'
      };
      
     }
     base.setModel = function(){

      return 'Movement';
     }
   $scope.selectArticleState = 'inventory.outmove';  
   $scope.selectedArticle = {
        reference:''
   };
   $scope.getSelectedArticleInfo = function(){
    return $scope.selectedArticle.reference ;
   }   
	base.hookAddHandler = function(){
      console.log("hooking move ");
                DBService.getById('Article',$scope.item.ArticleId).then(function(a){
                  
                    var ar = {
                      qReel : a.qReel - parseFloat($scope.item.quantite),
                      prixAchat: parseFloat($scope.item.prixAchat),
                      prixUnitaire :  parseFloat($scope.item.prixUnitaire)
                    };
                    DBService.update('Article',ar,$scope.item.ArticleId).then(function(){
                      ctrl.clear();
                      var message = 'Opération faite avec succés !';
                      Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                      //$scope.$apply();
              
                    });
                                    
                });

	}    
  	base.add = function(){
 		//console.log('adding item ' + angular.toJson($scope.item) + ' to data base model ' + ctrl.setModel());
 		var deferred = $q.defer();
 		DBService.create(base.setModel(),$scope.item).then(

	 		function(r){
	 			console.log("adding something ");
        
		        base.hookAddHandler(); 	
				//ctrl.clear(); 			
				deferred.resolve(r);
	 		},
	 		function(e){
		        var message = 'Erreur !';
		        Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);	 			
	 			deferred.resolve(e);
	 		}
 		)
		return deferred.promise;
 	}

   angular.extend(this,base);
   this.init();

   //console.log('$scope.item ' + angular.toJson($scope.item));

});
