angular.module('gCom.controller').controller('SelectSaleDeliveryController',function ($controller,$scope,$q,$state,DBService,Flash) {
	
	
	
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;
	angular.extend(this,base);
	base.getModel = function(){

  	 	return 'LivraisonVente';
  	}
    base.getInitialPage = function getInitialPage(){
		DBService.reset();
		DBService.getSalesDeliveryPager(parseInt($scope.pageSize),{ClientId:$scope.$parent.item.ClientId,payee : $scope.payee}).then(function(o){
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
	ctrl.close = function(){
		$state.go("^");
	}
	ctrl.hookSelectionHandler = function(){
		console.log('seeeeeeeeeelected');
		if($scope.$parent.item && $scope.selected)
		{	
			
			var item = $scope.selected;
			var items = [];
			
			console.log(angular.toJson($scope.selected));
			
  				if($scope.$parent.item.items && $scope.$parent.item.items.indexOf(item) === -1)
			    {
			        $scope.$parent.item.items.push(item);	
					$scope.$parent.item.somme = parseFloat($scope.$parent.item.somme) + parseFloat(item.somme);
			    }				
				
		}
		//ctrl.close();
	}
	function getInitialPage2(){
			DBService.reset();
			DBService.getSalesDeliveryPager(parseInt($scope.pageSize),{ClientId : $scope.$parent.item.ClientId,payee : $scope.payee}).then(function(o){
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
  	//this.init();
 	this.init = function(){
		 

		base.init();
		$scope.client = {};
		$scope.payee = "nonpayee";
		/*$scope.$watch("search",function(){
			
			if($scope.search !== null && $scope.search !== undefined)
			{
				console.log("search changed");
				base.getInitialArticlePage();	
			}
		});*/
			$scope.$watch("client.id",function(){
				console.log("client changed");
				if($scope.client.id)
				{
					getInitialPage2();
				}
			});	
			$scope.$watch("payee",function(p){
				console.log("payee ? " + p);
				getInitialPage2();
			});				
	}

  	this.init(); 	 	 

});
