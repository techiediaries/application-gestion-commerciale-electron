angular.module('gCom.controller').controller('SelectArticleController',function ($controller,$state,$scope,$q,DBService,Flash) {
	var base = $controller('ListArticleController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;


    base.getInitialArticlePage = function getInitialClientPage(){
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

	angular.extend(this,base);

  	base.hookSelectionHandler = function(){
  		//console.log('hooking selection handler' + angular.toJson($scope.selections) );
  		
  		console.log('selected !!!!!');
      if($scope.selected)
      {
          var item = {};
          item.quantite = 1;
          item.ArticleId = $scope.selected.id;
          item.prixAchat = $scope.selected.prixAchat;
          item.prixUnitaire = $scope.selected.prixUnitaire;
          item.taxe = $scope.selected.taxe;
          item.qReel = $scope.selected.qReel;
		  item.unite = $scope.selected.unite;
		  
          
          item.reference = $scope.selected.reference;

          item.designation = $scope.selected.designation;
          item.description = '----';
          if($scope.$parent.getArticle)
          {
            $scope.$parent.getArticle(item);
            //ctrl.close();
          }

      }
      if($scope.$parent.item)
  		{
  				//$scope.$parent.item.items = [];
  				/*_.each($scope.selections,function(v){
  					  	  var item = {};	
			              item.quantite = 1;
			              item.ArticleId = v.id;
			              item.reference = v.reference;
			              item.designation = v.designation;
			              item.description = '----';
			              if($scope.$parent.item.items.indexOf(item) === -1)
			              {
			              	$scope.$parent.item.items.push(item);	
			              }
			              
			               
  				})*/


  				if($scope.$parent.item.items && $scope.$parent.item.items.indexOf(item) === -1)
			    {
			        $scope.$parent.item.items.push(item);	
			    }
  		}		

	}

	this.close = function(){
		$state.go("^");
	}

	/*ctrl.init = function(){
		base.init();
	}*/
	this.init = function(){
		base.init();
		/*$scope.$watch("search",function(){
			
			if($scope.search !== null && $scope.search !== undefined)
			{
				console.log("search changed");
				base.getInitialArticlePage();	
			}
		});*/
	}

  	ctrl.init();
});
