
angular.module('gCom.controller').controller('ListSaleOrderController',function ($controller,$scope,$q,dateFilter,DBService,Flash) {
	
	
	
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	base.getModel = function(){

  	 	return 'CommandeVente';
  	}
		var ctrl = this;

	angular.extend(this,base);
	base.getInitialPage = function getInitialPage(){
			DBService.reset();
			var clientId  = null;
			if($scope.client && $scope.client.id )
			{
				clientId =  $scope.client.id;
			}
			DBService.getPager2("CommandeVente",parseInt($scope.pageSize),{reference : $scope.reference,ClientId : clientId}).then(function(o){
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
			DBService.getPager2("CommandeVente",parseInt($scope.pageSize),{referenceExt:$scope.state.referenceExt,reference : $scope.state.reference,facturee : $scope.state.isFacturee , livree : $scope.state.isLivree ,ClientId : $scope.client.id,startDate : $scope.state.startPeriod,endDate : $scope.state.endPeriod}).then(function(o){
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
			$scope.state = {};
			$scope.state.isFacturee = null;
			$scope.state.isLivree = null;
			$scope.state.isLivreeString = 'all';
			$scope.state.isFactureeString = 'all';
			$scope.state.reference = null;
			$scope.state.referenceExt = null;
			$scope.state.startPeriod = dateFilter(ctrl.getYearFirstDay());
    		$scope.state.endPeriod = dateFilter(ctrl.getYearLastDay());
			
			
			/*$scope.$watch(['facturee,livree,nfacturee,nlivree'],function(){
				$scope.isFacturee = $scope.facturee || !$scope.nfacturee ;
				$scope.isLivree = $scope.livree || !$scope.nlivree;

			});*/
			$scope.$watch("state.isFactureeString",function(){
				console.log("isFacturee changed" + $scope.isFactureeString);
				if($scope.state.isFactureeString ==='true')
				{
					$scope.state.isFacturee = true;
				}
				if($scope.state.isFactureeString ==='false')
				{
					$scope.state.isFacturee = false;
				}
				if($scope.state.isFactureeString ==='all')
				{
					$scope.state.isFacturee = null;
				}
				getInitialPage2();	
			});
			$scope.$watch("state.isLivreeString",function(){
				if($scope.state.isLivreeString ==='false')
				{
					$scope.state.isLivree = false;
				}
				if($scope.state.isLivreeString ==='true')
				{
					$scope.state.isLivree = true;
				}
				if($scope.state.isLivreeString ==='all')
				{
					$scope.state.isLivree = null;
				}
				getInitialPage2();				
			});
			$scope.$watch("client.id",function(){
				console.log("client id changed");
				if($scope.client.id)
				{
					getInitialPage2();
				}
			});
			$scope.$watch("client.reference",function(){
				console.log("client ref changed : " +   $scope.client.reference);
				if($scope.client.reference === '' )
				{
					console.log("client ref empty");
					$scope.client = {};	
					getInitialPage2();
				}
			});
			$scope.$watch("state.reference",function(p){
				console.log("reference " + p);
				getInitialPage2();
			});			
			$scope.$watch("state.referenceExt",function(p){
				console.log("referenceExt " + p);
				getInitialPage2();
			});			
			

			$scope.$watch('state.startPeriod',function(){
			console.log('start period changed ' + new Date($scope.state.startPeriod));
				if($scope.state.startPeriod && $scope.state.startPeriod !== '')
				getInitialPage2();
			});
			$scope.$watch('state.endPeriod',function(){
				console.log('end period changed ' + new Date($scope.state.endPeriod));
				if($scope.state.startPeriod && $scope.state.startPeriod !== '')
				getInitialPage2();
			});			
	}

  	this.init();
    this.getDetailsState = function(){
      return 'smgmt.addSaleOrder({id:selected.id})';
    }
	 

});
