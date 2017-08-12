angular.module('gCom.controller').controller('AddOrderBaseController',function ($controller,$scope,$rootScope,$location,$q,$stateParams,DBService,Flash,$filter) {
	 var base = $controller('AddBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
   angular.extend(this,base);
   var ctrl = this;   
   $scope.fournisseur = {};
   $scope.pay = false;

   base.setDefaults = function () {
    
      return {
        reference:'',items:[],somme : 0
      };
      
   }
   /*$scope.$watch("item.id",function(){
     $scope.item.somme = $scope.calculateSubTotal();
   });*/
   $scope.calculateSubTotal = function(){
      var result = 0;
      angular.forEach($scope.item.items,function(it){
          result += it.prixAchat   * it.quantite;
      })
      
      $scope.item.somme = result;
       return $filter('number')(result, 2);
   }
   ctrl.getCompanyInfo=function(){
          var config = JSON.parse(window.localStorage.getItem('config'));
          
            DBService.getById('Societe',1).then(function(c){
              if(c)
              {
                  $scope.company = c;
                  $rootScope.Company = c;
                  $scope.item.taxe = c.taxe;
                  $scope.$apply();
              }
              else
              {
                 var message = 'Il faut créer une societé avant de pouvoir continuer !';
                 var id = Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                 $location.path('/conf');
              }
            });
          
          return;
    }
   ctrl.details = function(){}

	 ctrl.print = function(){
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
   ctrl.getCounter = function(model,prefix){

     return DBService.getCounter(model,prefix);
   }
   /*ctrl.clear = function(){
      base.clear();
      $scope.item.items = [];
   }*/
   ctrl.getPrefix = function(model)
   {
     switch(model){
      case 'CommandeAchat' : return 'CA';
      case 'FactureAchat' : return 'FA';
      case 'LivraisonAchat' : return 'BL';
      case 'Reglement' : return 'RE';
      case 'Devis' : return 'DV';
      case 'CommandeVente' : return 'CV';
      case 'LivraisonVente' : return 'BL';
      case 'Facture' : return 'FA';
      default: return 'XX';
     }
   }
  this.hideCompanyDetails = function(){
    $scope.company = {};

  } 
  this.showCompanyDetails = function(){
    $scope.company = $rootScope.Company;
  }     
   ctrl.clear = function(){
    $scope.item = {};
    $scope.fournisseur = {};
    $scope.item.items = [];
    //base.clear();
    console.log("setting model" + ctrl.setModel());
    ctrl.getCounter(ctrl.setModel(),ctrl.getPrefix(ctrl.setModel())).then(function(c){

      if(c) 
      {
          $scope.item.reference = c.reference;
          //$scope.$apply();
      }

    });

    //ctrl.init();
   }   
   ctrl.init = function(){
    base.init();
    ctrl.getCompanyInfo();
    $scope.editMode = true;
    ctrl.details();
   }
	 //console.log('$scope.item ' + angular.toJson($scope.item));

});
