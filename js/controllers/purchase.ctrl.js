
angular.module('gCom.controller').controller('PurchaseController',function ($scope,DBService) {
	
	console.log('purchase controller loaded');
	$scope.hideHeader = false;

	$scope.hideIt = function(){
		$scope.hideHeader = true;
	}
	$scope.showIt = function(){
		$scope.hideHeader = false;
	}

	
	DBService.getCount('Fournisseur').then(function(c){

			$scope.countOfProviders = c;
	});
	DBService.getCount('CommandeAchat').then(function(c){

			$scope.countOfOrders = c;
	});
	DBService.getCount('LivraisonAchat').then(function(c){

			$scope.countOfDeliveryForms = c;
	});
	
	DBService.getCount('FactureAchat').then(function(c){

			$scope.countOfInvoices = c;
	});
	DBService.getCount('Reglement').then(function(c){

			$scope.countOfReglements = c;
	});
	DBService.getCount('LigneJournalAchat').then(function(c){

			$scope.countOfJournal = c;
	});
	

});
