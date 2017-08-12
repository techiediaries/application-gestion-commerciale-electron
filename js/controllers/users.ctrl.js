
angular.module('gCom.controller').controller('UserController',function ($scope,$rootScope,$location,DBService,Flash) {
	
	console.log('users controller loaded');
	
  	if($rootScope.User && !$rootScope.User.isAdmin)
  	{
    
	     var message = "Vous n'étes pas autorisé d'accéder à cette page !";
	     var id = Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
	     $location.path('/404');  

  	}	
	DBService.getCount('User').then(function(c){

			$scope.userTotal = c;
	});

	

});