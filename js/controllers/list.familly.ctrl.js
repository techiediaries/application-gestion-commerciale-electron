angular.module('gCom.controller').controller('ListFamillyController',function ($controller,$scope,$q,DBService,Flash,$state,dialogs) {
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	var ctrl = this;
	base.getModel = function(){

  	 	return 'Famille';
  	}
  	$scope.previousState = $scope.$parent.state;
  	base.hookSelectionHandler = function(){
  		//console.log('hooking selection handler' + angular.toJson($scope.selections) );
  		if($scope.$parent.item)
  		{

  				if($scope.$parent.item)
			    {
                    if($scope.selected)
                    {
			           $scope.$parent.item.FamilleReference = $scope.selected.reference;	
                       console.log("selecting famille from item " + angular.toJson($scope.$parent.item));
                       $scope.$parent.famille = $scope.selected;
                    }  
			    }
      }
      if($scope.selected)
      {
          $scope.$parent.familly = $scope.selected.reference;
      }		
	}
    base.setSelected = function(id){

        console.log("selected item " + id);
        
         angular.forEach($scope.items, function(v, key) {
            if(v.reference && (v.reference  === id))
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
         this.hookSelectionHandler();
     
    }

	angular.extend(this,base);
  this.updateSelected = function(){

        var dlg = dialogs.confirm("Opération d'édition",'Voulez vous confirmer la modification ?');
        dlg.result.then(function(btn){
                //var item = angular.copy($scope.selected);
                //Reflect.deleteProperty($scope.selected,'createdAt');
                //Reflect.deleteProperty($scope.selected,'updatedAt');
                 var item = $scope.selected.dataValues
                  //item = _.omit(item, 'updatedAt');

                console.log('updating ' + angular.toJson(item));
                _.each($scope.selections,function(s){

                     DBService.updateByReference(ctrl.getModel(),s.dataValues,s.reference).then(function(){
                          
                          var message = 'Opération de mise à jour faite avec succés !';
                          Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                          
                          $scope.$apply();
                      },function(){
                          var message = "Erreur lors de l'opération de mise à jour !";
                          Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                          $scope.$apply();              
                      });

       
                });



            
        },function(btn){
        
        });
            

   }   
  this.deleteSelected = function(){
        var dlg = dialogs.confirm('Opération de suppression','Volulez vous  supprimer  ' + $scope.selections.length + ' élement(s) sélectionné(s) ?');
        dlg.result.then(function(btn){
          if($scope.selected && $scope.selected.reference)
          {
              var ids = _.map($scope.selections,function(s){
                return  s.reference;
              })
              console.log('destroy ' + ids);
              
              DBService.removeAllByReference(ctrl.getModel(),ids).then(function(){
                _.each($scope.selections,function(s){
                    var index = $scope.items.indexOf(s);
                    $scope.items.splice(index, 1);
                });
                  
                  $scope.selections = [];  
                  //$scope.selected = null;
                  var message = 'Opération de suppression faite avec succés !';
                  Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                  
                  $scope.$apply();
              },function(){
                  var message = "Erreur lors de l'opération de suppression !";
                  Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                  $scope.$apply();              
              });
          }    

            
        },function(btn){
        
        });
   }  
    ctrl.close = function(){
      //$state.go('inventory.article');
      $state.go("^");
    }
    ctrl.handleDoubleClick = function(e){
      console.log('double click');
      ctrl.setSelected(e.reference);
      ctrl.close();

    }
    ctrl.handleClick = function(e){
     console.log('single click');
      ctrl.setSelected(e.reference);
     
    }

  	this.init();

	 
	 
});
