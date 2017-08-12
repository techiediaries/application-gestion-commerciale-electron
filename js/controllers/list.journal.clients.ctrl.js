angular.module('gCom.controller').controller('ListJournalClientsController',function ($controller,$scope,$q,dateFilter,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	base.getModel = function(){

  	 	return 'LigneJournalClient';
  	}
  var ctrl = this;

  angular.extend(this,base);
  $scope.hasDetails = false;
  $scope.client = {id:null};
  base.getInitialPage = function getInitialPage(){
      if($scope.client && $scope.client.id !== null)
      {  
          DBService.reset();
          DBService.getCustomerJournalPager(parseInt($scope.pageSize),$scope.client.id,$scope.startPeriod,$scope.endPeriod).then(function(o){
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

   }
   $scope.totalCredit = function(){
     var credit = 0;
     angular.forEach($scope.items,function(k,v){
       credit += k.credit;
     });

     return credit;
   }
   $scope.totalDebit = function(){
     var debit = 0;
     angular.forEach($scope.items,function(k,v){
      debit += k.debit;
     });

     return debit;
   }
	this.getDetailsState = function(){
      return 'pmgmt.jouranl({id:selected.id})';
  }
  ctrl.getYearFirstDay = function(){
    d = new Date(new Date().getFullYear(), 0, 1);
      return d;    
  }	
  ctrl.getYearLastDay = function()
  {
    d = new Date(new Date().getFullYear(), 11, 31);
    return d;
  } 
  ctrl.init = function(){
      
    base.init();
    $scope.$watch('client.reference',function(){
      if($scope.client !== null && $scope.client.reference !== null && $scope.client.reference !== '' )
      DBService.getByRef("Client",$scope.client.reference).then(function(fr){

        console.log('got client ' + angular.toJson(fr));
        if(fr)
        $scope.client = fr;

      });
    });
    $scope.startPeriod = dateFilter(ctrl.getYearFirstDay());
    $scope.endPeriod = dateFilter(ctrl.getYearLastDay());
    $scope.$watch('client.id',function(){
      //console.log('triggered watch ' + $scope.fournisseur.id);
        if($scope.client && $scope.client.id !== null)
          base.getInitialPage();
    });
    $scope.$watch('startPeriod',function(){
      console.log('start period changed ' + new Date($scope.startPeriod));
      //console.log('triggered watch ' + $scope.fournisseur.id);
        if($scope.startPeriod && $scope.startPeriod !== '')
          base.getInitialPage();
    });
    $scope.$watch('endPeriod',function(){
        console.log('end period changed ' + new Date($scope.endPeriod));
      //console.log('triggered watch ' + $scope.fournisseur.id);
        if($scope.startPeriod && $scope.startPeriod !== '')
          base.getInitialPage();
    });


    }
	 ctrl.init();

	 
});
