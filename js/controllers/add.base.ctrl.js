angular.module('gCom.controller').controller('AddBaseController',function ($scope,$q,$state,DBService,Flash) {
	
	console.log('add base controller loaded');
	
	var ctrl = this;

	ctrl.setDefaults = ctrl.setDefaults || function () {
    
    	return {};
  	}
  	ctrl.init = function(){
  		console.log('init');
  	    $scope.item = this.setDefaults();
	}
	ctrl.hookAddHandler = function(){

	}
	ctrl.setModel = function(){
		return '';
	}
 	ctrl.add = function(){
 		//console.log('adding item ' + angular.toJson($scope.item) + ' to data base model ' + ctrl.setModel());
 		var deferred = $q.defer();
 		DBService.create(ctrl.setModel(),$scope.item).then(

	 		function(r){
	 			console.log("adding something ");
		        var message = 'Opération faite avec succés !';
		        Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
		        //$scope.$apply();
		        
		        ctrl.hookAddHandler(); 	
				ctrl.clear(); 			
				deferred.resolve(r);
	 		},
	 		function(e){
		        var message = 'Erreur !';
		        Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);	 			
	 			deferred.resolve(e);
	 		}
 		)
		return deferred.promise;
 	}
 	ctrl.clear = function(){
 		$scope.item = this.setDefaults();
 	}

 	
});
