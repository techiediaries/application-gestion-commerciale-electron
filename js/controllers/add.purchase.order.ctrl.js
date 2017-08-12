angular.module('gCom.controller').controller('AddPurchaseOrderController',function ($controller,$scope,$stateParams,$q,DBService,PurchaseService,Flash) {
	var base = $controller('AddOrderBaseController', {$scope: $scope,$q:$q,$stateParams:$stateParams,DBService:DBService,Flash:Flash});
	 base.setDefaults = function () {
    
    	return {
    		reference:'',items:[],oldItems : []
    	};
    	
  	 }
     var ctrl = this ;
     $scope.state = 'pmgmt.porder';

  	 base.setModel = function(){

  	 	return 'CommandeAchat';
  	 }
     base.add = function(){
        $scope.item.etat = 'en cours';
        $scope.item.livree = false;
        $scope.item.facturee = false;
        DBService.create(base.setModel(),$scope.item).then(function(d){
          console.log('command saved ' + angular.toJson(d));
          if(d)
          {
              $scope.item.id = d.id;
              $scope.item.reference = '';
              $scope.item.reference = d.reference;
              //problem on windows
              var lignes = [];
              angular.forEach($scope.item.items, function(v, key) {
                v.CommandeAchatId = d.id; 
                lignes.push(v);

              });  
                //bulk create
              DBService.bcreate('LigneCommande',lignes).then(function(dd){

                  console.log('items commandees ' + angular.toJson(dd));
                      var message = 'Commande Achat crée avec succés !';
                      var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                      $scope.$apply();                
              });
          }
        });


    }
    $scope.$watch("item.reference",function(){
      console.log("reference changed ");
        if($scope.item && $scope.item.reference && $scope.item.reference !== '')
          ctrl.reloadItem();
    });
    /*$scope.$watch("item.FournisseurId",function(){
      $scope.four
    });*/
    $scope.$watch("item.id",function(){
      console.log("id changed ");
        if($scope.item && $scope.item.id !== null)
          ctrl.reloadItemById();
    });

    base.update = function(){
      var nI = {};
      for(var prop in $scope.item.dataValues)
      {
        if(prop !== "id" || prop !== "createdAt" || prop !== "updatedAt")
        {
          nI[prop] = $scope.item[prop];
        }
      }
      DBService.update(base.setModel(),nI,$scope.item.id).then(function(d){
        console.log('updateed');
        var ids = [];
        angular.forEach($scope.item.oldItems,function(v,k){
            ids.push(v.id);

        });
        console.log('remove LigneCommande ' + angular.toJson(ids));

        DBService.removeAll('LigneCommande',ids).then(function(r){

          console.log('remove all success');
              var lignes = [];
              angular.forEach($scope.item.items, function(v, key) {
                v.CommandeAchatId = $scope.item.id; 
                lignes.push(v);

              }); 
              DBService.bcreate('LigneCommande',lignes).then(function(dd){

                  console.log('items commandees ' + angular.toJson(dd));
                      var message = 'Commande Achat modifiée avec succés !';
                      var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                      $scope.$apply();                
              });          

        });
      });
    }
    this.reloadItem = function(){
        DBService.getFullByRef(ctrl.setModel(),$scope.item.reference).then(function(c){

          if(c)
          {
          $scope.item = c;
          $scope.fournisseur = c.Fournisseur;
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
          angular.forEach(c.LigneCommandes,function(v,key){
              $scope.item.items.push({
                id:v.id,
                ArticleId:v.Article.id,
                reference:v.Article.reference,
                designation :v.Article.designation,
                quantite:v.quantite,
                prixAchat : v.Article.prixAchat,
                description:v.description,
                unite : v.unite,
                CommandeAchatId : v.CommandeAchatId
              });
              $scope.item.oldItems.push({
                id:v.id,
                ArticleId:v.Article.id,
                reference:v.Article.reference,
                designation:v.Article.designation,
                quantite:v.quantite,
                prixAchat : v.Article.prixAchat,
                unite : v.unite,
                description:v.description,
                CommandeAchatId : v.CommandeAchatId
              });

          });
          console.log("newwwwww item" + angular.toJson($scope.item));}
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
    this.reloadItemById = function(){
        DBService.getFullById(ctrl.setModel(),$scope.item.id).then(function(c){

          if(c)
          {
          $scope.item = c;
          $scope.fournisseur = c.Fournisseur;
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
          
          angular.forEach(c.LigneCommandes,function(v,key){
              $scope.item.items.push({
                id:v.id,
                ArticleId:v.Article.id,
                reference:v.Article.reference,
                designation :v.Article.designation,
                quantite:v.quantite,
                prixAchat : v.Article.prixAchat,
                description:v.description,
                unite : v.Article.unite,
                CommandeAchatId : v.CommandeAchatId
              });
              $scope.item.oldItems.push({
                id:v.id,
                ArticleId:v.Article.id,
                reference:v.Article.reference,
                designation:v.Article.designation,
                quantite:v.quantite,
                prixAchat : v.Article.prixAchat,
                unite : v.Article.unite,
                description:v.description,
                CommandeAchatId : v.CommandeAchatId
              });


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
    this.receive = function(){ 
      PurchaseService.receivePurchaseOrder($scope.item).then(function(d){
            var message = "Commande d'achat reçue  avec succés !";
            $scope.item.id = d.id;
            $scope.item.state = 'en stock';
            $scope.item.livree = true;
            var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
            //$scope.$apply();                


      });
    } 
    this.invoice = function(){
      PurchaseService.invoicePurchaseOrder($scope.item).then(function(d){
            var message = "Commande d'achat facturée  avec succés !";
            $scope.item.id = d.id;
            $scope.item.facturee = true;
            var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
            //$scope.$apply();                


      });      
    }
    $scope.removeItem = function(item){
      $scope.item.items.splice($scope.item.items.indexOf(item), 1);
    }
 
	 angular.extend(this,base);
	 
   base.details = function()
   {
     if($stateParams.id)
     {
        console.log('id ' + $stateParams.id);
        DBService.getFullById(ctrl.setModel(),$stateParams.id).then(function(c){
          console.log("item" + JSON.stringify(c));
          $scope.item = c;
          $scope.fournisseur = c.Fournisseur;
          
          $scope.item.items = [];
          $scope.item.oldItems = [];
          
          angular.forEach(c.LigneCommandes,function(v,key){
              var ii = {
                reference:v.Article.reference,
                quantite:v.quantite,
                unite : v.Article.unite,
                description:v.description,
                prixAchat : v.Article.prixAchat,
                CommandeAchatId : v.CommandeAchatId
              };
              console.log(v.Article.unite);
              $scope.item.items.push(ii);
              $scope.item.oldItems.push(ii);

          });
        });
     }
     else
     {
      $scope.item.items = [];
      $scope.item.oldItems = [];
     }
   }
   this.getMyCounter = function()
   {
     return base.getCounter('CommandeAchat','CA');
   }
   this.init = function(){
      base.init();
      ctrl.getMyCounter().then(function(c){
          if(c) 
          {
              $scope.item.reference = c.reference;
          }
      });
   }
   this.clear = function(){
    $scope.item = {};
    $scope.fournisseur = {};
    //base.clear();
    ctrl.getMyCounter().then(function(c){

      if(c) 
      {
          $scope.item.reference = c.reference;
          $scope.$apply();
      }

    });

    //ctrl.init();
   }   
   this.init();
   console.log('$scope.item ' + angular.toJson($scope.item));
});
