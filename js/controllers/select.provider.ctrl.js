angular.module('gCom.controller').controller('SelectProviderController',function ($controller,$scope,$q,$state,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;
	angular.extend(this,base);

	base.getModel = function(){

  	 	return 'Fournisseur';
  	}
    base.getInitialClientPage = function getInitialClientPage(){
	    DBService.reset();
	    DBService.getClientPager(base.getModel(),parseInt($scope.pageSize),$scope.search).then(function(o){
		      base.pager = o;
		      base.pager.initialPage().then(function(r){
		              $scope.items = [];
		              for(var i = 0 ; i < r.length ; i++)
		              {
		                  $scope.items.push(r[i]);
		              }
		              
		              $scope.$apply();
		      });
    	})


   }
  	
	this.close = function(){
		$state.go("^");
	} 
	this.hookSelectionHandler = function(){
		console.log('selected provider' + $scope.selected.id);
		if($scope.selected)
		{
				if($scope.$parent.item)
				{
					$scope.$parent.item.FournisseurId = $scope.selected.id;
					$scope.$parent.item.FournisseurRef = $scope.selected.reference;
					$scope.$parent.item.FournisseurNom = $scope.selected.nom;
					
					
					
				}
				if($scope.$parent.fournisseur)
				{
					$scope.$parent.fournisseur.id = $scope.selected.id;
					$scope.$parent.fournisseur.reference = $scope.selected.reference;
					$scope.$parent.fournisseur.nom = $scope.selected.nom;


				}
				ctrl.close();
		}		 
	}
	this.init = function(){
		base.init();
		$scope.$watch("search",function(){
			
			if($scope.search !== null && $scope.search !== undefined && $scope.search !== '')
			{
				console.log("search changed");
				base.getInitialClientPage();	
			}
		});
	}
	this.init(); 
});
