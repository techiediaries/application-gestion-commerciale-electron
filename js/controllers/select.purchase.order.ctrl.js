angular.module('gCom.controller').controller('PurchaseOrderSelectController',function ($controller,$scope,$q,$state,DBService,Flash) {
	
	
	
	var base = $controller('PurchaseOrderListController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;
	angular.extend(this,base);
	ctrl.close = function(){
		$state.go("^");
	}
	this.hookSelectionHandler = function(){
		console.log('seeeeeeeeeelected');
		if($scope.$parent.CommandeAchat){
			console.log("3");
			$scope.$parent.CommandeAchat = $scope.selected;
		}
		if($scope.selected && $scope.$parent.CommandeAchat && $scope.$parent.item)
		{
			console.log("1");
			$scope.$parent.CommandeAchat.id = $scope.selected.id;
			$scope.$parent.CommandeAchat.reference = $scope.selected.reference;
			$scope.$parent.item.CommandeAchat = $scope.selected;
		}
		if($scope.item && $scope.selected)
		{	
			console.log("2");
			$scope.$parent.item.CommandeAchatId = $scope.selected.id;
			$scope.$parent.item.FournisseurId = $scope.selected.FournisseurId;
			
			$scope.$parent.CommandeAchat = $scope.selected;
			$scope.$parent.fournisseur = $scope.selected.Fournisseur;

			var items = [];
			angular.forEach($scope.selected.LigneCommandes,function(v,k){
					items.push(
						{
							reference : v.Article.reference,
							quantite : v.quantite,
							prixAchat : v.Article.prixAchat,
							observation : v.observation,
							ArticleId : v.Article.id
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
  	this.onSelected = function(){
  		
  	} 	 

});
