angular.module('gCom.controller').controller('AddSaleDocumentController',function ($controller,$scope,$rootScope,$location,$q,$stateParams,ArticleService,DBService,Flash,$filter) {
	//this.$inject = ['$rootScope','$location'];
  var base = $controller('AddOrderBaseController', {$scope: $scope,$rootScope:$rootScope,$location:$location,$q:$q,DBService:DBService,Flash:Flash});
	angular.extend(this,base);
  var ctrl = this;
  ctrl.setDefaults = function () {
    
    	return {
    		reference:'',items:[],taxe:0.2,
    	};
    	
  }
     $scope.state = '';
     $scope.title = '';
     $scope.reference = '';
     $scope.client = {};
     $scope.calculateSubTotal = function(){
        var result = 0;
        angular.forEach($scope.item.items,function(it){
            
            result += ( it.prixUnitaire / ( 1 + it.taxe ) ) * it.quantite;
        })
        $scope.item.sommeHT = result ;
        return $filter('number')(result, 2);
     
     }
  $scope.calculateTotal = function(){
      var result = 0;
      angular.forEach($scope.item.items,function(it){
          result += it.prixUnitaire  * it.quantite;
      })
      $scope.item.somme = result;
      return $filter('number')(result, 2);
     
  }
  $scope.calculateNetTotal = function(){
      
     
      if($scope.item.paiement === 'espéces')
      {
         $scope.item.net = $scope.item.somme + ($scope.item.timbre/100) * $scope.item.somme ;
      }
      else
      {
         $scope.item.net = $scope.item.somme;
      }
      return $filter('number')($scope.item.net, 2);
     
  }


     /*base.update = function(){
        DBService.update('Devis',$scope.item.id,{notes:$scope.item.notes}).then(function(d){
          console.log('devis updated ' + angular.toJson(d));
          //problem on windows
          var lignes = [];
          angular.forEach($scope.item.items, function(v, key) {
            v.DeviId = d.id; 
            lignes.push(v);

          });  
            //bulk create
          DBService.bcreate('LigneVente',lignes).then(function(){
                    var message = 'Devis crée  avec succés !';
                    var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                    $scope.$apply();                        
          });
        });

     };*/

    this.convertToCommand = function(){
      var ctrl = this;
      if($scope.item.acceptee)
      {
        return;
      }
      DBService.getCounter('CommandeVente','CV').then(function(r){
        var clientId ;
        if($scope.client)
        {
          clientId = $scope.client.id;
        }
        var command = {
          reference : r.reference,
          //DeviId : $scope.item.id,
          sommeHT : $scope.item.sommeHT,
          tva : $scope.item.taxe * $scope.item.somme,
          taxe : $scope.item.taxe,
          date : $scope.item.date,
          acceptee :true,
          livree : false,
          somme: $scope.item.somme,
          paiement : $scope.item.paiement,
          notes : $scope.item.notes,
          ClientId : clientId|| null

        }
        DBService.create('CommandeVente',command).then(function(c){
            $scope.saleOrder = c;
            $scope.item.CommandeVente = c;
            var lignes = [];
            
            angular.forEach($scope.item.items, function(v, key) {
              v["CommandeVenteId"] = c.id; 
              v["DeviId"] = null;
              v["id"] = null;
              lignes.push(v);

            });  
              //bulk create
       

            DBService.update(ctrl.setModel(),{acceptee:true,CommandeVenteId:c.id},$scope.item.id).then(function(d){
                DBService.bcreate('LigneVente',lignes).then(function(){
                      
                      //ctrl.hookAddSuccessCompletion();
                    $scope.item.acceptee = true;
                    var message = 'Devis converti en commande avec succés !';
                    var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);          
                });     
            
              //$scope.$apply();
            });
        });

      });
    }
    this.deliver = function(){
      if($scope.item.livree)
      {
         var message = "Commande déja livrée !";
         Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);     
         return;
      }
      DBService.getCounter('LivraisonVente','BL').then(function(r){
        var clientId;
        if($scope.client)
        {
          clientId = $scope.client.id;
        }
        var command = {
          reference : r.reference,
          //CommandeVenteId : $scope.item.CommandeVente.id,
          sommeHT : $scope.item.sommeHT,
          tva : $scope.item.tva,
          somme : $scope.item.somme,
          taxe : $scope.item.taxe,
          date : $scope.item.date,
          acceptee :true,
          livree : true,
          paiement : $scope.item.paiement,
          notes : $scope.item.notes,
          ClientId : clientId || null

        }
        DBService.create('LivraisonVente',command).then(function(c){
            //$scope.bl = c;
            //$scope.item.CommandeVente.LivraisonVente = c;
            DBService.update('CommandeVente',{livree:true,LivraisonVenteId:c.id},$scope.item.id).then(function(d){
            var lignes = [];
            
            angular.forEach($scope.item.items, function(v, key) {
              v["LivraisonVenteId"] = c.id; 
              v["id"] = null;
              v["CommandeVenteId"] = null;
              lignes.push(v);

            });                
            DBService.bcreate('LigneVente',lignes).then(function(){
              $scope.item.livree = true;
              var promises = [];
                    angular.forEach(lignes, function(v, key) {
                       promises.push(ArticleService.decrementArticleQuantity(v.ArticleId,v.quantite));
                    });
                    $q.all(promises).then(function(){
                      var message = 'Bon de livraison crée et stock mis à jour avec succés !';
                      var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                      $scope.$apply();

                    });
              });
            });
        });

      });
    }
    this.convertToInvoice = function(){
      if($scope.item.facturee)
      {
         var message = "Commande déja facturée !";
         Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);     
        
        return;
      }      
      DBService.getCounter('Facture','FA').then(function(r){
        var clientId = null;
        if($scope.client)
        {
           clientId = $scope.client.id;
        }
        var command = {
          reference : r.reference,
          sommeHT : $scope.item.sommeHT,
          tva : $scope.item.tva,
          taxe : $scope.item.taxe,
          date : $scope.item.date,
          acceptee :true,
          livree : false,
          somme: $scope.item.somme,
          paiement : $scope.item.paiement,
          notes : $scope.item.notes,
          ClientId : clientId 

        }
        DBService.create('Facture',command).then(function(c){

            $scope.item.FactureId = c.id;  
            DBService.update('CommandeVente',{facturee:true,FactureId:c.id},$scope.item.id).then(function(d){
            $scope.item.facturee = true;  
            var lignes = [];
            
            angular.forEach($scope.item.items, function(v, key) {
              v["FactureId"] = c.id; 
              v["id"] = null;
              v["CommandeVenteId"] = null;

              lignes.push(v);

            });                
            DBService.bcreate('LigneVente',lignes).then(function(){              
                  

                  var message = "Commande facturée avec succés !";
                  var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);     
            });
          });
        });

      });
    }
    this.encaisse = function(){
      var ctrl = this;
      if(($scope.item.Facture && $scope.item.Facture.payee) || $scope.item.payee)
      {
         var message = "Commande déja réglée !";
         Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);  
        return;
      }
      DBService.getCounter('Reglement',this.getPrefix("Reglement")).then(function(r){

        var clientId ;
        if($scope.client)
        {
          clientId = $scope.client.id;
        }
        var command = {
          reference : r.reference,
          //FactureId : $scope.item.CommandeVente.Facture.id,
          sommeHT : $scope.item.sommeHT,
          tva : $scope.item.tva,
          taxe : $scope.item.taxe,
          date : $scope.item.date,
          acceptee :$scope.item.acceptee,
          livree : $scope.item.livree,
          facturee : $scope.item.facturee,
          somme: $scope.item.somme,
          paiement : $scope.item.paiement,
          notes : $scope.item.notes,
          type : "vente",
          ClientId : clientId || null

        }
        DBService.create('Reglement',command).then(function(c){
            //$scope.reglement = c;
            //$scope.item.Facture = c;

            var factureId = $scope.item.FactureId;
            if(ctrl.setModel() === "Facture")
            {
                factureId = $scope.item.id;
            }
            if(factureId)
            {
              //add cond if bl is not paid
              DBService.update('Facture',{payee:true,ReglementId:c.id,notes:"Facture " + factureId},factureId).then(function(d){
                 $scope.item.payee = true;
                 var message = "Commande réglée avec succés !";
                 Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);                   
              });
           }else
           {
              DBService.update('LivraisonVente',{payee:true,datePayee : new Date()},$scope.item.id).then(function(d){
                 $scope.item.payee = true;
                 var message = "Commande réglée avec succés !";
                 Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);                   
              });             
           }

        });

      });
    }
    $scope.removeItem = function(item){
      $scope.item.items.splice($scope.item.items.indexOf(item), 1);
    }

  this.setModel = function(){

      return '';
  }
  this.setLineModelIdString = function(){
      return '';
  }

  this.setAddSuccessCompletionMessage = function(){

    return "OPERATION TERMINEE AVEC SUCCES";
  }
  this.hookAddSuccessCompletion = function(){

      var message = this.setAddSuccessCompletionMessage();
      var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
      $scope.$apply(); 
  }
  this.hideCompanyDetails = function(){
    $scope.company = {};

  } 
  this.showCompanyDetails = function(){
    $scope.company = $rootScope.Company;
  }  
  this.convertPriceInWords = function(price){

    var writtenNumber = require('written-number');
    console.log(typeof price); 
    console.log(price);
    //var N = new Number(price);
    //console.log(N.toString());
    console.log("filtered : " + $filter('number')(price, 2));
    var N = $filter('number')(price, 2);
    var parts = N.toString().split('.');

    return writtenNumber(parseInt(parts[0].replace(/,/g, ''), 10),{ lang: 'fr' }) + ' Dhs' + ', ' + (parts[1] || 0 ) + ' Cts';
    
    
  }
  this.beforeCreateModel = function(){
    console.log("before creating model");
    return {};
  }
  this.add = function(){
        var ctrl = this;
        //$scope.item.etat = 'en stock';
        if($scope.item.id)
        {
          //base.update();
          return ;
        }
        var item = ctrl.beforeCreateModel();
        for(var s in item)
        {
          $scope.item[s] = item[s];
        }
        DBService.create(this.setModel(),$scope.item).then(function(d){
          console.log('doc added ' + angular.toJson(d));
          //problem on windows
          var lignes = [];
          $scope.item.id =d.id;
          angular.forEach($scope.item.items, function(v, key) {
            v[ctrl.setLineModelIdString()] = d.id; 
            lignes.push(v);

          });  
            //bulk create
          DBService.bcreate('LigneVente',lignes).then(function(){
                    
                    ctrl.hookAddSuccessCompletion();
                    
                       
          });
        });
  }
  this.clear = function(){
    //base.clear();
    $scope.item = {};
    //$scope.item.taxe = 0.2;
    $scope.item.timbre = 0.25;
    $scope.client = {};
    $scope.item.items = [];
    $scope.item.facturee = false;
    $scope.item.livree = false;
    //base.clear();
    console.log("setting model " + this.setModel());
    $scope.company = $rootScope.Company;
    DBService.getCounter(this.setModel(),ctrl.getPrefix(this.setModel())).then(function(r){
        if(r)
        { 
              $scope.item.reference = r.reference;
              $scope.item.taxe = $scope.company.taxe;
              $scope.item.timbre = 0.25;
              $scope.item.paiement = "espéces";
              $scope.item.chequeno = '';
              $scope.item.notes ='';
              $scope.item.monnaie = $scope.company.monnaie;
              $scope.item.items = []; 

        }      
              //$scope.$apply();
    }); 

  }
    this.hookDetails = function(){
      console.log('hooking details from add sale doc base');
    }
   this.details = function()
   {
      var ctrl = this;
      console.log("getting details ");
      $scope.oldItems = [];
     if($stateParams.id)
     {
        console.log('id ' + $stateParams.id);
        $scope.editMode = false;
        DBService.getFullById(this.setModel(),$stateParams.id).then(function(c){
          var payee = false;
          if(c)
          {
              if(c.Facture)
              {
                payee = c.Facture.payee;
              }
              $scope.item.id = c.id;
              $scope.item.updatedAt = c.updatedAt;
              $scope.item.createdAt = c.createdAt;
              $scope.item.reference = c.reference;
              $scope.reference = c.reference;
              $scope.item.referenceExt = c.referenceExt;
              $scope.item.taxe = c.taxe;
              $scope.item.notes = c.notes;
              $scope.item.sommeHT =c.sommeHT;
              $scope.item.date = c.date;
              $scope.item.signature = c.signature;
              $scope.item.acceptee = c.acceptee; 
              $scope.item.paiement = c.paiement;
              $scope.item.CommandeVente = c.CommandeVente || {};
              $scope.client =c.Client;
              $scope.item.FactureId = c.FactureId;
              $scope.item.LivraisonVenteId = c.LivraisonVenteId;
              $scope.item.livree = c.livree;
              $scope.item.facturee = c.facturee;
              $scope.item.Facture = c.Facture;
              $scope.item.payee = c.payee || payee;
              $scope.item.chequeno = c.chequeno || 0;
              $scope.item.items = [];
              angular.forEach(c.LigneVentes,function(v,key){
                console.log('items ' + angular.toJson(v));
                  var iii = {
                    id:v.id,
                    ArticleId:v.ArticleId,
                    CommandeVenteId:v.CommandeVenteId,
                    reference:v.Article.reference,
                    qReel: v.Article.qReel,
                    quantite:v.quantite,
                    unite : v.Article.unite,
                    prixAchat:v.Article.prixAchat,
                    prixUnitaire:v.prixUnitaire,
                    taxe : v.Article.taxe,
                    designation: v.Article.designation,
                    description:v.description
                  };

                  $scope.item.items.push(iii);
                  $scope.oldItems.push(iii);

              });
              ctrl.hookDetails();
              $scope.$apply();
        }

        });
     }
     else
     {
      $scope.item.items = [];
     }
   }   

  this.reloadItem = function(){
        DBService.getFullByRef(this.setModel(),$scope.item.reference).then(function(c){

          if(c)
          {
          $scope.item = c;
          $scope.client = c.Client;
          var nI = {};
          for(var prop in c.dataValues)
          {
            if(prop !== "id" || prop !== "createdAt" || prop !== "updatedAt")
            {
              $scope.item[prop] = c[prop];
            }
          }          
          $scope.item.items = [];
          $scope.item.oldItems = [];
          console.log("lignes " + angular.toJson(c.LigneVentes));
          angular.forEach(c.LigneVentes,function(v,key){
              var iii = {
                id:v.id,
                ArticleId:v.Article.id,
                reference:v.Article.reference,
                quantite:v.quantite,
                prixAchat : v.Article.prixAchat,
                description:v.description,
                unite : v.Article.unite,
                CommandeVenteId : v.CommandeVenteId
              };
              $scope.item.items.push(iii);
              $scope.item.oldItems.push(iii);

          });

          console.log("newwwwww item" + angular.toJson($scope.item));
        }
          else
          {
              //ctrl.init();
              $scope.item = {
                reference : $scope.item.reference,
                items : [],
                oldItems : []
              }
          }
        });      
  }

  this.update = function(){
      var ctrl = this;
      var nI = {};
      console.log("model " + this.setModel());
      console.log("updating " + angular.toJson($scope.item));
      for(var prop in $scope.item)
      {
        if(prop !== "id" || prop !== "createdAt" || prop !== "updatedAt")
        {
          nI[prop] = $scope.item[prop];
        }
      }
      var fModel = "";
      switch(this.setModel()){
        case "CommandeVente":
        fModel = "CommandeVenteId";
        break;
        case "Facture":
        fModel="FactureId";
        break;
        case "LivraisonVente":
        fModel = "LivraisonVenteId"
        break;
        default:
        fModel = "";
      }
      DBService.update(this.setModel(),nI,$scope.item.id).then(function(d){
        //console.log('updateed ' + this.setModel());
        var ids = [];
        angular.forEach($scope.oldItems,function(v,k){
            ids.push(v.id);
        });

        console.log('remove old LigneVentes ' + angular.toJson(ids));

        DBService.removeAll('LigneVente',ids).then(function(r){

          console.log('remove all success');
              var lignes = [];
              angular.forEach($scope.item.items, function(v, key) {
                //v.id = null;
                v[fModel] = $scope.item.id; 
                lignes.push(v);

              }); 
              DBService.bcreate('LigneVente',lignes).then(function(dd){
                  ctrl.hookAddSuccessCompletion();                
              });          

        });
      });
  }
  this.init = function(){
    var ctrl = this;
    base.init();
    this.clear();
    //ctrl.getCompanyInfo();
    $scope.editMode = true;
    $scope.$watch("item.somme",function(){
      console.log("changing somme");
      $scope.item.price = ctrl.convertPriceInWords($scope.item.net);
      console.log("price " + $scope.item.price);
    });

    this.details();
  }    

});
