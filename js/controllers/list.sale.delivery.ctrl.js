
angular.module('gCom.controller').controller('ListSaleDeliveryController',function ($controller,$scope,$q,dateFilter,DBService,Flash) {
	
	
	
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	base.getModel = function(){

  	 	return 'LivraisonVente';
  	}
		
		$scope.client = {};
	angular.extend(this,base);
	var ctrl = this;
    base.getInitialPage = function getInitialPage(){
		DBService.reset();
		DBService.getSalesDeliveryPager(parseInt($scope.pageSize),{}).then(function(o){
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
	function getInitialPage(){
			DBService.reset();
			DBService.getSalesDeliveryPager(parseInt($scope.pageSize),{ClientId : $scope.client.id,payee : $scope.payee}).then(function(o){
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
	function getInitialPage2(){
			DBService.reset();
			DBService.getSalesDeliveryPager(parseInt($scope.pageSize),{reference : $scope.reference,ClientId : $scope.client.id,payee : $scope.payee, startDate : $scope.startPeriod,endDate : $scope.endPeriod}).then(function(o){
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
	ctrl.getYearFirstDay = function(){
		d = new Date(new Date().getFullYear(), 0, 1);
		return d;    
	}	
	ctrl.getYearLastDay = function()
	{
		d = new Date(new Date().getFullYear(), 11, 31);
		return d;
	} 
		
	ctrl.init = function(){
			base.init();
			$scope.client = {};
			$scope.payee = undefined;
			$scope.startPeriod = dateFilter(ctrl.getYearFirstDay());
    		$scope.endPeriod = dateFilter(ctrl.getYearLastDay());
			$scope.$watch("client.id",function(){
				console.log("client id changed");
				if($scope.client.id)
				{
					getInitialPage();
				}
			});
			$scope.$watch("client.reference",function(){
				console.log("client ref changed : " +   $scope.client.reference);
				if($scope.client.reference === '' )
				{
					console.log("client ref empty");
					$scope.client = {};	
					getInitialPage();
				}
			});
			$scope.$watch("reference",function(p){
				console.log("reference " + p);
				getInitialPage2();
			});			
			$scope.$watch("payee",function(p){
				console.log("payee ? " + p);
				getInitialPage2();
			});
			$scope.$watch('startPeriod',function(){
			console.log('start period changed ' + new Date($scope.startPeriod));
				if($scope.startPeriod && $scope.startPeriod !== '')
				getInitialPage2();
			});
			$scope.$watch('endPeriod',function(){
				console.log('end period changed ' + new Date($scope.endPeriod));
				if($scope.startPeriod && $scope.startPeriod !== '')
				getInitialPage2();
			});			
	}
	ctrl.prevPage = function(){
			ctrl.pager.prevPage().then(function(r){
				$scope.items = [];
					for(var i = 0 ; i < r.length ; i++)
					{
						$scope.items.push(r[i]);
					}
					$scope.$apply();
			});    
	}
	ctrl.nextPage = function(){
			ctrl.pager.nextPage().then(function(r){
				$scope.items = [];
					for(var i = 0 ; i < r.length ; i++)
					{
						$scope.items.push(r[i]);
					}
					$scope.$apply();
			});    
	}	
	ctrl.init();
    this.getDetailsState = function(){
      return 'smgmt.delivery({id:selected.id})';
    }
	 

});
