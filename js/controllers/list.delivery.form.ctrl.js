
angular.module('gCom.controller').controller('ListPurchaseDeliveryFormController',function ($controller,$scope,$q,dateFilter,DBService,Flash) {
	
	
	
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;
	base.getModel = function(){

  	 	return 'LivraisonAchat';
  	}
	angular.extend(this,base);
  	this.getDetailsState = function(){
      return 'pmgmt.delivery({id:selected.id})';
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
	function getInitialPage2(){
			DBService.reset();
			DBService.getPager2("LivraisonAchat",parseInt($scope.pageSize),{reference : $scope.state.reference,payee:$scope.state.paid,CommandeAchatId : $scope.CommandeAchat.id,FournisseurId : $scope.fournisseur.id,startDate : $scope.state.startPeriod,endDate : $scope.state.endPeriod}).then(function(o){
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

	ctrl.init = function(){
			base.init();
			$scope.fournisseur = {};
			$scope.CommandeAchat = {};
			$scope.state = {};
			$scope.state.reference = null;
			$scope.state.paidString = "all";
			$scope.state.paid = null;
			$scope.state.startPeriod = dateFilter(ctrl.getYearFirstDay());
    		$scope.state.endPeriod = dateFilter(ctrl.getYearLastDay());
			
			
			/*$scope.$watch(['facturee,livree,nfacturee,nlivree'],function(){
				$scope.isFacturee = $scope.facturee || !$scope.nfacturee ;
				$scope.isLivree = $scope.livree || !$scope.nlivree;

			});*/
				
			$scope.$watch("fournisseur.id",function(){
				console.log("fournisseur id changed");
				if($scope.fournisseur.id)
				{
					getInitialPage2();
				}
			});
			$scope.$watch("state.paidString",function(){
				console.log("paid string changed");
				if($scope.state.paidString === "all"){
						$scope.state.paid = null;
				}
				if($scope.state.paidString === "true"){
						$scope.state.paid = true;
				}
				if($scope.state.paidString === "false"){
						$scope.state.paid = false;
				}	
				getInitialPage2();							
			});
			$scope.$watch("CommandeAchat.id",function(){
				console.log("CommandeAchat id changed");
				if($scope.CommandeAchat)
				if($scope.CommandeAchat.id)
				{
					getInitialPage2();
				}
			});
			$scope.$watch("CommandeAchat.reference",function(){
				console.log("CommandeAchat id changed");
			
				if($scope.CommandeAchat.reference === '')
				{
					$scope.CommandeAchat = {};
					$scope.CommandeAchat.id = null;
					getInitialPage2();

				}
			});			
			$scope.$watch("fournisseur.reference",function(){
				console.log("fournisseur ref changed : " +   $scope.fournisseur.reference);
				if($scope.fournisseur.reference === '' )
				{
					console.log("fournisseur ref empty");
					$scope.fournisseur = {};	
					getInitialPage2();
				}
				
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

});
