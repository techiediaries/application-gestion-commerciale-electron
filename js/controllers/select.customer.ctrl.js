angular.module('gCom.controller').controller('SelectCustomerController',function ($controller,$state,$scope,$q,DBService,Flash,$stateParams) {
	var base = $controller('ListCustomerController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	
	base.getModel = function(){
		return 'Client';
	}
	var ctrl = this;
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
	angular.extend(this,base);
	ctrl.handleDoubleClick = function(e){

		console.log('handling double click');
		if($scope.$parent.item && e)
		{
		 	$scope.$parent.item.ClientId = e.id;
			$scope.$parent.client = e;
		}
		if($scope.$parent.client && e)
		{
		 	
			$scope.$parent.client = e;
		}		
		$state.go("^"); 
	}
	ctrl.handleClick = function(e){
		$scope.selected = e;
		if($scope.$parent.item && e)
		{
		 	$scope.$parent.item.ClientId = e.id;
			$scope.$parent.client = e;
		}
		if($scope.$parent.client && e)
		{
		 	
			$scope.$parent.client = e;
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

	

	this.goBack = function(){
		$state.go("^");
	}
  	this.init();

  
    	
    
});
