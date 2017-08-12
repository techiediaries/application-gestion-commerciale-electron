angular.module('gCom.controller').controller('AddArticleController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('AddBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	 base.setDefaults = function () {
     
    	return {
    		reference:'',taxe : 0.2,qReel : 0
    	};
    	
  	 }
  	 base.setModel = function(){

  	 	return 'Article';
  	 
    }

    $scope.$watch('item.prixAchat',function(){
      $scope.item.tva = $scope.item.taxe * $scope.item.prixAchat;
      $scope.item.prixAchatHT = $scope.item.prixAchat - $scope.item.tva;
      

    });
     $scope.$watch('item.taxe',function(){
      $scope.item.tva = $scope.item.taxe * $scope.item.prixAchat;
      $scope.item.prixAchatHT = $scope.item.prixAchat - $scope.item.tva;
      

    });
    
    $scope.$watch('item.taxe',function(){

      $scope.item.tva = $scope.item.taxe * $scope.item.prixAchat;
    });	 
   angular.extend(this,base);
	 this.init();
   
   var config = JSON.parse(window.localStorage.getItem('config'));
   if(config.societe)
   {
    if(config.societe.taxe)
    {
        $scope.item.taxe = config.societe.taxe;    
    }
    else
    {
      $scope.item.taxe = 0.2;
    }
   }
   else
   {
      $scope.item.taxe = 0.2;
   } 
   /*DBService.getById('Societe',1).then(function(s){
    console.log("get company taxe " + s.taxe);
    if(s.taxe !== undefined && s.taxe !== null)
    {
        $scope.item.taxe = s.taxe;
    }
   });*/
   
});
