angular.module('gCom.controller').controller('AuthCtrl',function($scope,$rootScope,$state,$location,Flash,UserService){

	var ctrl = this;
	$scope.user = $rootScope.User;
	$scope.error = false;
	$scope.logOut = function(){
		$scope.user = {};
		$rootScope.User = {isAdmin : false};
        var message = 'Déconnexion avec succés !';
        var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);			
	}
	$scope.logIn = function(){
		UserService.getByUsername($scope.user.username,$scope.user.password).then(function(u){
			console.log(angular.toJson(u));
			
			if(u.length > 0)
			{
				$rootScope.User = u[0];
				console.log('user loggedin !');
				$scope.user = u[0];
            var message = 'Vous étes connectés avec succés !';
            var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);				
			}
			else
			{
            var message = 'Impossible de se connecter  !';
            //$scope.message="Cet utilisateur n'existe pas !";
            var id = Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);				
							
				$rootScope.User = { isAdmin : false };
			}
		});
	}
});