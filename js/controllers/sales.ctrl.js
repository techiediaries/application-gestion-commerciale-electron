angular.module('gCom.controllers', [])

.controller('SalesMgmtCtrl',function($scope,DBService,EMPTY_INVOICE,EMPTY_BL){

  DBService.getCount('Client').then(function(c){

      $scope.countOfCustomers = c;
  });

  DBService.getCount('CommandeVente').then(function(c){

      $scope.countOfCommandes = c;
  });

  DBService.getCount('Devis').then(function(c){

      $scope.countOfDevis = c;
  });

  DBService.getCount('LivraisonVente').then(function(c){

      $scope.countOfLivraisons = c;
  });
  
  DBService.getCount('Facture').then(function(c){

      $scope.countOfFactures = c;
  });
  DBService.getCount('Reglement').then(function(c){

      $scope.countOfReglements = c;
  });
  DBService.getCount('LigneJournalVente').then(function(c){

      $scope.countOfSalesJournal = c;
  });
  DBService.getCount('LigneJournalClient').then(function(c){

      $scope.countOfCustomerJournal = c;
  });

	console.log('Sales Mgmt');
  $scope.editMode = true;
  $scope.dvEditMode = true;
  $scope.printMode = false;
  $scope.noLogo = false;
  var EMPTY_DEVIS = {
      no: '1',
      tax: '20.00',
      date:'',
      amount:'0.00',
      currencySymbol:'$',
      logo:'',
      customer: {
        'name':'Mr. Mister',
        'address':'Address',
        'phone': '0528838379',
        'email': 'email@techiediaries.com'
      },
      company: {
        'name':'Comapny Name',
        'address':'Comany Addess',
        'phone': '0528838379',
        'email': 'email@techiediaries.com'
      },
      items:[
      
      ]
      ,
      total:'0.00',
      paid:'0.00',
      due:'0.00',
      meta:{
        header:''
      }
  };

  $scope.devis = EMPTY_DEVIS;
  $scope.invoice = EMPTY_INVOICE;
  $scope.bl = EMPTY_BL;

  $scope.newDevis = function(){
    console.log('new devis' );
    $scope.devis.no = EMPTY_DEVIS.no;
    console.log($scope.devis);
  }
  $scope.saveDevis = function(){
    console.log('save devis '+ angular.toJson($scope.devis));
  }
  $scope.printDevis = function(){
    console.log('print devis');
  }
     $scope.calculateSubTotal = function calculateTotal(){
      var total = 0.00;
      angular.forEach($scope.invoice.items, function(item, key){
          total += (item.quantity * item.rate);
      });
      return total;
    };

    $scope.calculateTax = function() {
      return (($scope.invoice.tax * $scope.calculateSubTotal())/100);
    };
    $scope.calculateTotal = function() {
    
      return $scope.calculateTax() + $scope.calculateSubTotal();
    };
  
    $scope.toggleEditMode = function(){
      $scope.editMode = $scope.editMode === false ? true: false;
    };

    $scope.togglePrintMode = function(){
      $scope.printMode = $scope.printMode === false ? true: false;
    };
    $scope.addItem = function(){

      $scope.invoice.items.push({name:'Item Name','description':'Item Description','rate':'0.00','quantity':'0','price':0});
    
    }
    $scope.removeItem = function(item){
      $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
    }

   angular.element(document).ready(function () {
   
  document.getElementById('logoInput').onchange = function() {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById('logo').setAttribute('src', e.target.result);
        
      }
        reader.readAsDataURL(this.files[0]);
    }
    };
  });

})
