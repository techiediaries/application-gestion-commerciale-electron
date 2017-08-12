
angular.module('gCom.controller').controller('InventoryController',function ($scope,$rootScope,$controller,DBService,ArticleService) {
	
	//var base = $controller('BaseController', {$scope: $scope,$rootScope: $rootScope});

	console.log('inventory controller loaded');
		
	DBService.getCount('Article').then(function(c){

			$scope.countOfArticles = c;
	});


	ArticleService.getAlertCount().then(function(c){

			$scope.countOfArticlesEnAlerte = c;
	});	
	
	DBService.getCount('Famille').then(function(c){

			$scope.countOfFamilies = c;
	});
	DBService.getCount('Movement').then(function(c){

			$scope.countOfMovements = c;
	});
	
	

});
