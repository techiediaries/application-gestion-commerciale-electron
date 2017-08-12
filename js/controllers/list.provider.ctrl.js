angular.module('gCom.controller').controller('ListProviderController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	base.getModel = function(){

  	 	return 'Fournisseur';
  	}
	var ctrl = this;
	function getInitialPage2(){
			DBService.reset();
			DBService.getPager2("Fournisseur",parseInt($scope.pageSize),{reference : $scope.state.reference,nom : $scope.state.nom}).then(function(o){
				ctrl.pager = o;
				ctrl.pager.initialPage().then(function(r){
						$scope.items = [];
						for(var i = 0 ; i < r.length ; i++)
						{
							$scope.items.push(r[i]);
						}
						
						$scope.$apply();
				});
			})	
	} 


	angular.extend(this,base);
	this.init = function(){
		base.init();
		$scope.state = {};
		$scope.$watch("state.reference",function(){
			getInitialPage2();
		});
		$scope.$watch("state.nom",function(){
			getInitialPage2();
		});
		
	}
  	this.init();
	 
	 
});
