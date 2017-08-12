angular.module('gCom.controller').controller('AppCtrl',function($scope,$timeout,DBService,ArticleService){
  var ctrl = this;
  var config = JSON.parse(window.localStorage.getItem('config'));
  var date = new Date();
  var startDate;
  var currentDate;
  $scope.month = date.getMonth() + 1;
  $scope.year = date.getYear();
  $scope.day  = date.getDay();
  $scope.timeLeft = 0;
  
  if(config)
  {
      //startDate = moment(new Date(config.startDate));
       $scope.timeLeft = config.timeLeft;
  }
  //$scope.now = new Date();
  $scope.tickInterval = 1000;
  var tick = function() {
        var now = $scope.now = Date.now() // get the current time
        /*currentDate = moment(now); 
        var duration = moment.duration(currentDate.diff(startDate));
        $scope.timeLeft = duration.asHours()*/
        $timeout(tick, $scope.tickInterval); // reset the timer
  }

  $timeout(tick, $scope.tickInterval);
  DBService.getCount('Fournisseur').then(function(c){

      $scope.countOfProviders = c;
  });
  DBService.getCount('Client').then(function(c){

      $scope.countOfCustomers = c;
  });

  DBService.getCount('CommandeAchat').then(function(c){

      $scope.countOfOrders = c;
  });
  DBService.getCount('CommandeVente').then(function(c){

      $scope.countOfSalesOrders = c;
  });

  /*DBService.getCount('LivraisonAchat').then(function(c){

      $scope.countOfDeliveryForms = c;
  });
  
  DBService.getCount('FactureAchat').then(function(c){

      $scope.countOfInvoices = c;
  });
  DBService.getCount('Reglement').then(function(c){

      $scope.countOfReglements = c;
  });*/
  DBService.getCount('LigneJournalAchat').then(function(c){

      $scope.countOfJournal = c;
  });
  DBService.getCount('LigneJournalVente').then(function(c){

      $scope.countOfSalesJournal = c;
  });
  DBService.getCount('Caisse').then(function(c){

      $scope.countOfCaisseJournal = c;
  });
  DBService.getCount('LigneJournalClient').then(function(c){

      $scope.countOfCustomerJournal = c;
  });
  DBService.getCount('LigneJournalFournisseur').then(function(c){

      $scope.countOfProviderJournal = c;
  });


  DBService.getCount('Article').then(function(c){

      $scope.countOfArticles = c;
  });


  ArticleService.getAlertCount().then(function(c){

      $scope.countOfArticlesEnAlerte = c;
  }); 
  
  /*DBService.getCount('Famille').then(function(c){

      $scope.countOfFamilies = c;
  });
  DBService.getCount('Movement').then(function(c){

      $scope.countOfMovements = c;
  });*/
      


});