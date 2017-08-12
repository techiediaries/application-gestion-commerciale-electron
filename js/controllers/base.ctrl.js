
angular.module('gCom.controller').controller('BaseController',function ($rootScope,$scope,$location) {
	
	console.log('base controller loaded');

	if(!$rootScope.User)
	{
		$location.path('/login');
	}

});
