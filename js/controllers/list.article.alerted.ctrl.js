angular.module('gCom.controller').controller('ListAlertArticleController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	angular.extend(this,base);
  var ctrl = this;
	
  base.getModel = function(){

  	 	return 'Article';
  }
  base.getInitialAlertedArticlePage = function(){
      DBService.reset();
      DBService.getAlertedArticlePager(base.getModel(),parseInt($scope.pageSize)).then(function(o){
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


    
	   /*ctrl.setSelected = function(id){

        console.log(" my selected item " + id);
        
         angular.forEach($scope.items, function(v, key) {
            if(v.id && (v.id  === id))
            {
                $scope.selected = v; 
                if( ! $scope.editMode && $scope.selections.indexOf(v) !== -1)
                {
                    $scope.selections.splice($scope.selections.indexOf(v), 1);
                    $scope.selected = $scope.selections[$scope.selections.length - 1]; 
 
                }
                else if (! $scope.editMode && $scope.selections.indexOf(v) === -1) 
                {
                    $scope.selections.push(v);
                }
                
                //$scope.$parent.selectedItem = v;     
            }
         });
         ctrl.hookSelectionHandler();

     }
	*/
    base.getInitialArticleSearchPage = function getInitialArticleSearchPage(){
	    DBService.reset();
	    DBService.getAlertedArticleSearchPager(base.getModel(),parseInt($scope.pageSize),$scope.search).then(function(o){
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
   this.getInitialPage = function(){
   		$scope.ordered = false;
   		base.getInitialAlertedArticlePage();
   }
    this.init = function(){
      var ctrl = this;
      $scope.search = null;
      //base.init();
       /*$scope.$watch('familly',function(){
        console.log('familly change');
          if($scope.familly !== null)
          {
            base.getInitialArticlePage();
          }
          if($scope.familly === null || $scope.familly === '')
          {
            base.getInitialPage();
          }
       });*/
        $scope.$watch('pageSize',function(){

          ctrl.getInitialPage();

        });         
		$scope.$watch("search",function(){
			
			if($scope.search !== null && $scope.search !== undefined)
			{
				console.log("search changed");
				base.getInitialArticleSearchPage();	
			}
		});	   
        
        //base.getInitialAlertedArticlePage(); 
    }
  	this.init();
  	
	 
	 
});
