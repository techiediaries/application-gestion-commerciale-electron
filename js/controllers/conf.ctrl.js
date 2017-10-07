angular.module('gCom.controller').controller('SettingsCtrl',function($scope,$rootScope,$state,$location,Flash,DBService){

  console.log('init configuration controller');
  $scope.saveEnabled = true;
  var conf = this;
  //$scope.config = {}
  var configItem = window.localStorage.getItem('config');
  var config = null;
  var oldConfig = null;
  $scope.config = {};
  $scope.dbReady = false;
  $scope.config.dbType = "sqlite";
  $scope.company = {};
  $scope.company.ice = "001437356000021";
  $scope.bank = {};
  $scope.journal = {};
  $scope.formatFooter = function(){
    $scope.company.footer  = "Sté " + $scope.company.raisonSociale + ", " + $scope.company.addresse + "<br>" + 
  "R.C : " + $scope.company.rc + "-Patente" + $scope.company.patente + "-CNSS" + " : " + $scope.company.cnss + "I.F : "+
  $scope.company.identiteFiscale + " - C.B : " + $scope.company.codeBanque + "ICE : "+$scope.company.ice +"<br>" + "Tél " + $scope.company.tel1 +"/"
  +$scope.company.tel2 + "/" + +$scope.company.tel3 +"<br>" + " Email " + $scope.company.email1 ;
  }  

  if(configItem)
  {
    config = JSON.parse(configItem);
    $scope.config = config;
    oldConfig = config;
    $rootScope.config = config;
    $scope.dbReady = true;
    console.log($scope.config);
  }
  /*if($scope.config && $scope.config.dbCreated)
  {
   
    
  }*/
  if($rootScope.isTrialEnd)
  {
     var message = "FIN DE PERIODE D'ESSAI !"; 
     var id = Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
     $location.path('/trial');  

  }
  if($rootScope.User && !$rootScope.User.isAdmin)
  {
     $scope.saveEnabled = false;
     console.log('disbaling save');
     var message = "Vous n'étes pas autorisé d'accéder à cette page !";
     var id = Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
     $location.path('/404');  

  }
  $scope.$watch('config.dbName',function(){
      if($scope.config && $scope.config.dbCreated  && (oldConfig && ($scope.config.dbName !== oldConfig.dbName)))
      {
                console.log('config changed');
                $scope.saveEnabled = true;  
                $scope.dbReady = false;
                //config.dbCreated = false;
                    
      }
      else if(oldConfig && ($scope.config.dbName !== oldConfig.dbName))
      {
                $scope.saveEnabled = false;  
                $scope.dbReady = true;        
      }
  });
  conf.readDir = function()
  {
  	const {dialog} = require('electron').remote
	 $scope.config.dbPath=dialog.showOpenDialog({properties: ['openFile']})[0];
  }
  conf.restore = function(){
    console.log("rastore " + $scope.config.dbPath);
    var  MysqlTools= require('mysql-tools');
    var tool = new MysqlTools();
  	const {dialog} = require('electron').remote
	  $scope.config.dbPath=dialog.showOpenDialog({properties: ['openFile']})[0];
      var models = require('./models');
 
    //conf.saveConfiguration();
        models.sequelize.sync().then(function (db) {
    
          tool.restoreDatabase({
                  host: $scope.config.server
                  , user: $scope.config.username 
                  , password: $scope.config.password
                  , sqlFilePath:$scope.config.dbPath
                  , database: $scope.config.dbName
          }, function (error, output, message) {
              if (error instanceof Error) {
                console.log(error);
               var message = 'Erreur';
                var id = Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
  
             } else {
                console.log(output);
                console.log(message);
                $scope.config.dbCreated = true;
                $scope.dbReady = true;   
                $scope.saveEnabled = false;
                console.log('database created ' + db);
                window.localStorage.setItem('config',JSON.stringify($scope.config));                
                var message = 'Base de données restaurée avec succés ';
                var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
      
            }
          });

        });
    
  }
  conf.backup = function(){
      /*var exec = require('child_process').exec;
      var command = ' mysqldump -u '+ $scope.config.username +' -p '+ $scope.config.password + ' ' +$scope.config.dbName + '> dumpfilename.sql'
      var command2 =' mysqldump -u root -p '+ $scope.config.dbName +' > fileName.sql'
      console.log("executing command : " + command);
      var child = exec(command2);*/
      var  MysqlTools= require('mysql-tools');
      const {app} = require('electron').remote;
      


        // create database dump sql file
        var tool = new MysqlTools();
        tool.dumpDatabase({
            host: $scope.config.server
            , user: $scope.config.username 
            , password: $scope.config.password
            , dumpPath: app.getPath('documents')
            , database: $scope.config.dbName
        }, function (error, output, message, dumpFileName) {
            if (error instanceof Error) {
              console.log(error);
            } else {
              console.log(output);
              console.log(message);
              console.log(dumpFileName);
              var message = 'Base de données sauvegardée avec succés : ' + dumpFileName;
              var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
              //$scope.$apply();               
            }
        });

  }
  conf.deleteConfiguration = function(){
    window.localStorage.removeItem('config');
    $scope.config = {};
    $scope.dbReady = false;
    $scope.config.dbType = "sqlite";
  }
  conf.saveConfiguration = function(){
      var models = require('./models');
      console.log('saving conf ' + JSON.stringify($scope.config));
      if($scope.config)
      {
         window.localStorage.setItem('config',JSON.stringify($scope.config));  
         models.init();
         $scope.dbReady = true;
      }
      
      
      if( $scope.config )
      {
        models.sequelize.sync().then(function (db) {
            $scope.config.dbCreated = true;
            $scope.dbReady = true;   
            $scope.saveEnabled = false;
            console.log('database created ' + db);
            window.localStorage.setItem('config',JSON.stringify($scope.config));
            console.log('configuration saved');

          DBService.create('User',{username : "admin" , password : "admin" , isAdmin : true}).then(function(user){
            var message = 'Base de données crée avec succés !';
            var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
            $scope.$apply(); 
            console.log("user is created : " + angular.toJson(user));
            $rootScope.User = user;

          });
        
        });
      }    
      
  }
  conf.testDatabaseConnexion = function(){

    var models = require("./models");
    console.log('testing connection to db' + models.config.dbName);    
    models.sequelize.authenticate().then(function(){
      //console.log('connection to db');
        var message = 'Connection faite avec succés !';
        var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
        $scope.$apply();      
      return true;
    },function(errors) { 
        var message = 'Connection impossible à la base de données !';
        var id = Flash.create('error', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
        $scope.$apply();
        return false;
    });}
  conf.nextStep = function(s){
      $state.go(s);
  }
  conf.saveCompany = function(){
    console.log('saving company')
      var config = JSON.parse(window.localStorage.getItem('config'));

      if($rootScope.Company && $rootScope.Company.id)
      {

        //console.log('updating company' + angular.toJson($scope.company));
        var nC = {};
        for(var prop in $scope.company.dataValues)
        {
          console.log("prop " + prop);
          if(prop !== "id" || prop !== "updatedAt" || prop !== "createdAt")
          {
              nC[prop] = $scope.company[prop];
          }
        }
        console.log("saving nC " + angular.toJson(nC));
        DBService.update('Societe',nC,$scope.company.id).then(function(s){
              
               //$scope.company = {};
               //$scope.$apply();
               
                   config.societe = $scope.company;
                   //$scope.company = s[0];
                   $rootScope.Company = $scope.company;
                   $scope.config = config;
                   window.localStorage.setItem('config',JSON.stringify(config));
                   //console.log('societe modifié avec succes ' + angular.toJson(s[0]));
                   var message = "Societé ,mis à jour avec succés!";
                   var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);      
                
               //conf.nextStep('conf.step3');
        });
        
      }
      else
      {
          console.log("creating new company");
          DBService.create('Societe',$scope.company).then(function(s){
                 //$scope.company = {};
                 //$scope.$apply();
                 $rootScope.Company = s;
                 config.societe = s;
                 $scope.company = s;
                 $scope.config = config;
                 window.localStorage.setItem('config',JSON.stringify(config));
                 console.log('societe cree avec succes ' + angular.toJson(s));
                 var message = "Societé ,crée avec succés!";
                var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                $scope.$apply();
                 //conf.nextStep('conf.step3');
          });
    }}
  conf.quit = function(){
      $state.go('home');
  }
  conf.getSavedCompany =function(){
      
      if($rootScope.Company)
      {
        $scope.company = $rootScope.Company;
      }
      else
      {
        DBService.getById('Societe',1).then(function(c){
          if(c)
          {
              console.log("company:"+ c);
              $scope.company = c;
              $rootScope.Company = c;
              $scope.$apply();
          }
          else
          {
             $scope.company = {};
          }
        });      
      }
      //$scope.$apply();
  }
   
  conf.getSavedCompany();

})