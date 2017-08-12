angular.module('gCom.controller').controller('ListArticleController',function ($controller,$scope,$q,DBService,Flash) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;
	base.getModel = function(){

  	 	return 'Article';
  	}
  	$scope.familly = null;
  	$scope.ordered = false;
  	//var self = this;
    base.getInitialArticleSearchPage = function getInitialArticleSearchPage(){
	    DBService.reset();
	    DBService.getArticleSearchPager(base.getModel(),parseInt($scope.pageSize),$scope.search).then(function(o){
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
    base.getInitialArticlePage = function getInitialArticlePage(){
	    DBService.reset();
	    DBService.getArticlePager(base.getModel(),parseInt($scope.pageSize),$scope.familly).then(function(o){
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
    base.getInitialByFamillyPage = function getInitialByFamillyPage(){
    	$scope.ordered = true;
	    DBService.reset();
	    DBService.getByFamillyPager(base.getModel(),parseInt($scope.pageSize)).then(function(o){
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

   /*base.getInitialPage = function getInitialPage(){
	    DBService.reset();
	    DBService.getPager(base.getModel(),parseInt($scope.pageSize)).then(function(o){
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


   }*/


    /*base.getCols = function(){
    	var item = null;
    	var cols = [];
    	var obj = {type:"string",caption:"COL"};
    	if($scope.items.length > 0)
    	{
    		item = $scope.items[0];
    	}
    	if(item !== null)
    	{
    		for(var prop in item.dataValues)
    		{
    			//obj["caption"] = prop;
 
    			var o = {
    				type:"string",
    				caption : prop
    			}

    			if(typeof item[prop] === "number")
    				o.type ="number"
    			if(typeof item[prop] === "date")
    				o.type = "Date"
    			if(typeof item[prop] === "string")
    				o.type ="string"
    			if(typeof item[prop] === undefined)
    				o.type = "string"

   				if(prop === "createdAt" || prop === "updatedAt" || typeof item[prop] === "object")
    			{
    				continue
    			}
    			cols.push(o);


    		}	
    		console.log("cols : " + angular.toJson(cols));
    		return cols;
    	}
    	return [];
    }
    base.getRows = function(){
    	var l = [];
    	var rows = [];
     	angular.forEach($scope.items,function(v,k){
      		console.log('el ' + angular.toJson(v));
      		l = [];
      		for(var prop in v.dataValues)
      		{
      			if(prop === "createdAt" || prop === "updatedAt" || typeof v[prop] === "object")
    			{
    				continue
    			}
    			
      			l.push(v[prop]);	

      			console.log(v[prop]);
      		}
			rows.push(l);
     	});
     	console.log('rows' + rows);
    	return rows;
    }*/
    angular.extend(this,base);

	   ctrl.setSelected = function(id){

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
	
   ctrl.getInitialPage = function(){
   		$scope.ordered = false;
   		base.getInitialPage();
   }
    ctrl.init = function(){
      base.init();
       $scope.$watch('familly',function(){
        console.log('familly change');
          if($scope.familly !== null)
          {
            base.getInitialArticlePage();
          }
          if($scope.familly === null || $scope.familly === '')
          {
            base.getInitialPage();
          }
       }); 
		$scope.$watch("search",function(){
			
			if($scope.search !== null && $scope.search !== undefined)
			{
				console.log("search changed");
				base.getInitialArticleSearchPage();	
			}
		});	   
        $scope.$watch('pageSize',function(){
          if($scope.familly !== null)   
            {
              console.log('familly is ' + $scope.familly);  
              base.getInitialArticlePage();
            }
          if($scope.familly === null || $scope.familly === '')
          {
            
            if($scope.ordered)
            {
              base.getInitialByFamillyPage();
            }
            else
            {
              base.getInitialPage();
            }
          }

       });         
    }
  	ctrl.init();
  	
	 
	 
});
