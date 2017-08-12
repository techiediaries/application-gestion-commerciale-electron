angular.module('gCom.controller').controller('ListCustomerController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;
	base.getModel = function(){

  	 	return 'Client';
  	} 

  	base.hookSelectionHandler = function(){
  		//console.log('hooking selection handler' + angular.toJson($scope.selections) );
  		if($scope.$parent.item)
  		{
  				//$scope.$parent.item.items = [];
  				/*_.each($scope.selections,function(v){
  					  	  var item = {};	
			              item.quantite = 1;
			              item.ArticleId = v.id;
			              item.reference = v.reference;
			              item.designation = v.designation;
			              item.description = '----';
			              if($scope.$parent.item.items.indexOf(item) === -1)
			              {
			              	$scope.$parent.item.items.push(item);	
			              }
			              
			               
  				})*/
  				var item = {};
			    
			    
			    //item.designation = $scope.selected.designation;
			    //item.description = '----';

  				if($scope.$parent)
			    {
			        $scope.$parent.client=$scope.selected;	
			    }
			    if($scope.$parent.item && $scope.selected)
			    {
			    	$scope.$parent.item.ClientId = $scope.selected.id;	
			    }
  		}		
	}
	function getInitialPage2(){
			DBService.reset();
			DBService.getPager2("Client",parseInt($scope.pageSize),{reference : $scope.state.reference,nom : $scope.state.nom}).then(function(o){
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
