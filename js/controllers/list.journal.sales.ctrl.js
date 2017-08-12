angular.module('gCom.controller').controller('ListJournalSalesController',function ($controller,$scope,$q,dateFilter,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;
	base.getModel = function(){

  	 	return 'LigneJournal';
  	}
 

  	base.hookSelectionHandler = function(){}
 	angular.extend(this,base);
    ctrl.getYearFirstDay = function(){
      d = new Date(new Date().getFullYear(), 0, 1);
      return d;    
    } 
    ctrl.getYearLastDay = function()
    {
      d = new Date(new Date().getFullYear(), 11, 31);
      return d;
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
	ctrl.getDetailsState = function(){
      return 'pmgmt.reglement({id:selected.id})';
    }	
    base.getInitialPage = function getInitialPage(){
      
          DBService.reset();
          DBService.getSalesJournalPager(parseInt($scope.pageSize),$scope.startPeriod,$scope.endPeriod).then(function(o){
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

    ctrl.init = function(){
      
      base.init();
    $scope.hasDetails = false;
    $scope.startPeriod = dateFilter(ctrl.getYearFirstDay());
    $scope.endPeriod = dateFilter(ctrl.getYearLastDay());
    
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

    base.getInitialPage();


    }
   ctrl.init();	 

  	
  	
	 
	 
});
