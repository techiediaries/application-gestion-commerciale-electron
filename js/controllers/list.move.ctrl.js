angular.module('gCom.controller').controller('ListMoveController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	base.getModel = function(){

  	 	return 'Movement';
  	}
  	$scope.previousState = $scope.$parent.state;
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
			    item.quantite = 1;
			    item.ArticleId = $scope.selected.id;
			    item.prixAchat = $scope.selected.prixAchat;
			    item.reference = $scope.selected.reference;
			    item.designation = $scope.selected.designation;
			    item.description = '----';

  				if($scope.$parent.item.items.indexOf(item) === -1)
			    {
			        $scope.$parent.item.items.push(item);	
			    }
  		}		
	}
	angular.extend(this,base);
  	this.init();

	 
	 
});
