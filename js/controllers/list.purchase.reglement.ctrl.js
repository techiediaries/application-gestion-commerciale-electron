
angular.module('gCom.controller').controller('ListPurchaseReglementController',function ($controller,$scope,$q,dateFilter,DBService,Flash) {
  	
	
	
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;
	base.getModel = function(){

  	 	return 'Reglement';
  	}
	angular.extend(this,base);

    base.getInitialPage = function getInitialPage(){
		DBService.reset();
		DBService.getPurchaseReglementPager(ctrl.getModel(),parseInt($scope.pageSize)).then(function(o){
			ctrl.pager = o;
			ctrl.pager.initialPage().then(function(r){
					$scope.items = [];
					for(var i = 0 ; i < r.length ; i++)
					{
						$scope.items.push(r[i]);
					}
					
					$scope.$apply();
			});
		})
	}
	function getInitialPage2(){
			DBService.reset();
			DBService.getPager2("Reglement",parseInt($scope.pageSize),{type:'achat',reference : $scope.state.reference,facturee : $scope.state.isFacturee , livree : $scope.state.isLivree ,etat : $scope.state.etat ,FournisseurId : $scope.fournisseur.id,startDate : $scope.state.startPeriod,endDate : $scope.state.endPeriod}).then(function(o){
				ctrl.pager = o;
				ctrl.pager.initialPage().then(function(r){
						$scope.items = [];
						for(var i = 0 ; i < r.length ; i++)
						{
							$scope.items.push(r[i]);
						}
						
						$scope.$apply();
				});
			})	
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
			$scope.fournisseur = {};
			$scope.state = {};
			$scope.state.reference = null;
			$scope.state.startPeriod = dateFilter(ctrl.getYearFirstDay());
    		$scope.state.endPeriod = dateFilter(ctrl.getYearLastDay());
			
					
			$scope.$watch("fournisseur.id",function(){
				console.log("fournisseur id changed");
				if($scope.fournisseur.id)
				{
					getInitialPage2();
				}
			});
			$scope.$watch("fournisseur.reference",function(){
				console.log("fournisseur ref changed : " +   $scope.fournisseur.reference);
				if($scope.fournisseur.reference === '' )
				{
					console.log("fournisseur ref empty");
					$scope.fournisseur = {};	
					
				}
				getInitialPage2();
			});
			$scope.$watch("state.reference",function(p){
				console.log("reference " + p);
				getInitialPage2();
			});			
			

			$scope.$watch('state.startPeriod',function(){
			console.log('start period changed ' + new Date($scope.state.startPeriod));
				if($scope.state.startPeriod && $scope.state.startPeriod !== '')
				getInitialPage2();
			});
			$scope.$watch('state.endPeriod',function(){
				console.log('end period changed ' + new Date($scope.state.endPeriod));
				if($scope.state.startPeriod && $scope.state.startPeriod !== '')
				getInitialPage2();
			});			
	}
	
  	this.init();
    $scope.hasDetails = true;

	this.getDetailsState = function(){
      return 'pmgmt.reglement({id:selected.id})';
    }


});
