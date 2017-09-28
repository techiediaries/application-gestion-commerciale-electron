
angular.module('gCom.controller').controller('ListBaseController',function ($scope,$q,DBService,$translate,dialogs,Flash) {
	
	console.log(' list base controller loaded');
  var ctrl = this;
  //$scope.lang = 'fr-FR';
  //$scope.language = 'French';
  $scope.selected = null;
  $scope.editMode = false;
  $scope.oldItem = null;
  $scope.selections = [];
  $scope.pageSize = 10;
  $scope.familly = null;
  $scope.selectionChanged = false;
  $scope.items = [];
  var editedSelections = [];
  var self = this;

  ctrl.getModel = function(){ return ''}; 

  ctrl.getInitialPage = function getInitialPage(){
    DBService.reset();
    DBService.getPager(ctrl.getModel(),parseInt($scope.pageSize)).then(function(o){
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
    ctrl.getCols = function(){
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
    ctrl.getSelectedRows = function() {
      var l = [];
      var rows = [];
      angular.forEach($scope.selections,function(v,k){
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
    }
    ctrl.getRows = function(){
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
    }

  ctrl.export2excel = function () {
     const shell = require('electron').shell;
   const path = require('path');
     console.log('export to excel');
     var nodeExcel = require('excel-export');
     var conf ={};
     conf.stylesXmlFile = path.join(__dirname, 'styles.xml');
     conf.name = "mysheet";
     conf.cols = ctrl.getCols();
       conf.rows = ctrl.getRows();

     if($scope.selections.length > 0)
     {
        conf.rows = ctrl.getSelectedRows();
     }else
     {
       conf.rows = ctrl.getRows();
     }

     console.log(conf.rows);

     var result = nodeExcel.execute(conf);
     //console.log(result);
    var fs = require('fs');
    var os = require('os');

    //var wstream = fs.createWriteStream(path.join(__dirname, 'report.xlsx'));
    // Node.js 0.10+ emits finish when complete

    /*wstream.on('finish', function () {
      console.log('file has been written');
    });
    wstream.write(result);
    wstream.end();     */
    fs.writeFile(path.join(os.tmpdir(), 'report.xlsx'), result,  "binary",function(err) { 
      if(err)
      {
        console.log('error while creating report.xlsx file');
      }
      else
      {
        console.log('successfully writing the report.xlsx file')
      }
    });

    shell.openItem(path.join(os.tmpdir(), 'report.xlsx'));
   }
  ctrl.fun = function(){
    console.log('func');
  }
   ctrl.printAll = function(){
      console.log('printing ');
          function printPDF(){
            const fs = require('fs')
            const os = require('os')
            const path = require('path')
            const electron = require('electron')
              const shell = electron.shell;
              const pdfPath = path.join(os.tmpdir(), 'print.pdf')
              //const win = BrowserWindow.fromWebContents(event.sender)
              // Use default printing options
              const remote = electron.remote;
              var options ={
                  marginsType: 0,
                  printBackground: true,
                  printSelectionOnly: false,
                  landscape: false
                }
              remote.getCurrentWebContents().printToPDF({}, function (error, data) {
                if (error) throw error
                  console.log(data);
                fs.writeFile(pdfPath, data, function (error) {
                  if (error) {
                    throw error
                  }
                  shell.openItem(pdfPath)
                  //event.sender.send('wrote-pdf', pdfPath)
                  //createViewerWindow();

                })
                })  
          }
          printPDF();
   }

   ctrl.init = function(){
      $scope.pageSize = 10;
      $scope.closeState =$scope.$parent.state;

      ctrl.getInitialPage();
      $scope.$watch('pageSize',function(){
        ctrl.getInitialPage();
      });


      //
      
    }

   

   ctrl.prevPage = function(){
        ctrl.pager.prevPage().then(function(r){
              $scope.items = [];
                for(var i = 0 ; i < r.length ; i++)
                {
                    $scope.items.push(r[i]);
                }
                $scope.$apply();
           });    
   }
   ctrl.nextPage = function(){
        ctrl.pager.nextPage().then(function(r){
              $scope.items = [];
                for(var i = 0 ; i < r.length ; i++)
                {
                    $scope.items.push(r[i]);
                }
                $scope.$apply();
           });    
   }

   $scope.isEditable = function(obj){

    return $scope.editMode && ($scope.selections.indexOf(obj) !== -1);
   }
   ctrl.hookSelectionHandler = function(){}
   ctrl.setSelected = function(id){

        console.log("selected item " + id);
        
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
         this.hookSelectionHandler();
     
   }
   ctrl.handleDoubleClick = function(e){
    console.log('double click');
    if(e)
    {
      ctrl.setSelected(e.id);
    }
    
   }
   ctrl.handleClick = function(e){
    console.log('single click');

   }
   ctrl.selectAll = function(){
      angular.forEach($scope.items, function(v, key) { 
          if($scope.selections.indexOf(v) === -1)
              $scope.selections.push(v);
      });  

   }
   ctrl.unSelectAll = function(){
      $scope.selections = [];
   }
   ctrl.encaisseSelected = function(){
      var success = false;
      var id = 0;
                 DBService.getCounter('Reglement','RE').then(function(r){
                  if(r){
                      id = r.id;
                  }

             $scope.selections.forEach(function (e,k) {


                    var reg = {
                        reference : 'RE'+id,
                        sommeHT : e.sommeHT,
                        tva : e.tva,
                        taxe : e.taxe,
                        date : new Date(),
                        acceptee :e.acceptee,
                        livree : e.livree,
                        facturee : e.facturee,
                        somme: e.somme,
                        paiement : e.paiement,
                        notes : e.notes,
                        type : "vente",
                        ClientId : e.ClientId || null

                      }
                      id++;
                      DBService.create('Reglement',reg).then(function(c){

                            DBService.update('LivraisonVente',{payee:true,datePayee : new Date()},e.id).then(function(d){
                              

                              success = true;
                              if(success){

                                  $scope.selections.forEach(function (e,k) {
                                      e.payee = true;
                                  });  
                                  var message = "BL réglé avec succés !";
                              Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);                   
                            }

                            });           
                      });
                      


              });

                 });              
 


             
                 
   }
   ctrl.deleteSelected = function(){
        var dlg = dialogs.confirm('Opération de suppression','Volulez vous  supprimer  ' + $scope.selections.length + ' élement(s) sélectionné(s) ?');
        dlg.result.then(function(btn){
          if($scope.selected && $scope.selected.id)
          {
              var ids = _.map($scope.selections,function(s){
                return  s.id;
              })
              console.log('destroy ' + ids);
              
              DBService.removeAll(ctrl.getModel(),ids).then(function(){
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
   ctrl.editSelected = function(){
      //$scope.selectionChanged = ! $scope.selectionChanged;
      //$scope.oldItem = $scope.selected;
      $scope.editMode = true;
   } 
   ctrl.unEditSelected = function(){
      //$scope.selectionChanged = ! $scope.selectionChanged;
      //$scope.oldItem = $scope.selected;
      $scope.editMode = false;
   } 

   ctrl.updateSelected = function(){

        var dlg = dialogs.confirm("Opération d'édition",'Voulez vous confirmer la modification ?');
        dlg.result.then(function(btn){
                //var item = angular.copy($scope.selected);
                //Reflect.deleteProperty($scope.selected,'createdAt');
                //Reflect.deleteProperty($scope.selected,'updatedAt');
                 var item = $scope.selected.dataValues
                  //item = _.omit(item, 'updatedAt');

                console.log('updating ' + angular.toJson(item));
                _.each($scope.selections,function(s){

                     DBService.update(ctrl.getModel(),s.dataValues,parseInt(s.id)).then(function(){
                          
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
   $scope.keyDown = function(value){
    if(value.keyCode == 46 || value.keyCode == 8) {
        alert('Delete Key Pressed');
   }
   ctrl.getDetailsState = function(){
      return '';
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
      

}


});
