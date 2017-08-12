angular.module('gCom.controller').controller('SelectSaleOrderController',function ($controller,$scope,$q,$state,DBService,Flash) {
	
	
	
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;
	angular.extend(this,base);
	base.getModel = function(){

  	 	return 'CommandeVente';
  	}
	ctrl.close = function(){
		$state.go("^");
	}
	base.hookSelectionHandler = function(){
		console.log('seeeeeeeeeelected');
		if($scope.$parent.item && $scope.selected)
		{	
			$scope.$parent.item.CommandeVenteId = $scope.selected.id;
			$scope.$parent.item.ClientId = $scope.selected.ClientId;
			
			$scope.$parent.CommandeVente = $scope.selected;
			$scope.$parent.client = $scope.selected.Client;

			var items = [];
			angular.forEach($scope.selected.LigneVentes,function(v,k){
					items.push(
						{
							reference : v.Article.reference,
							quantite : v.quantite,
							qReel : v.Article.qReel,
							designation : v.Article.designation,
							prixAchat : v.Article.prixAchat,
							prixUnitaire : v.prixUnitaire,
							ArticleId : v.Article.id,
							taxe : v.Article.taxe
						}
					);
			});
			console.log(angular.toJson($scope.selected.LigneCommandes));
			$scope.$parent.item.items = items;
			$scope.$parent.item.myitems = items;
				
				
		}
		ctrl.close();
	}
  	this.init();
  	 	 

});
