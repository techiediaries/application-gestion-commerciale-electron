angular.module('gCom.controller').controller('AddSaleDeliveryController', function ($controller, $scope, $q, $stateParams, ArticleService, DBService, Flash) {
  var base = $controller('AddSaleDocumentController', { $scope: $scope, $q: $q, DBService: DBService, Flash: Flash });
  var ctrl = this;
  base.setDefaults = function () {

    return {
      reference: '', items: [], taxe: 0.2, payee: false
    };

  }
  $scope.state = 'smgmt.delivery';
  $scope.title = 'Bon de livraison';


  base.setModel = function () {

    return 'LivraisonVente';
  }
  base.setLineModelIdString = function () {
    return 'LivraisonVenteId';
  }
  base.setPrefix = function () {
    return 'BL';
  }
  angular.extend(this, base);
  ctrl.update = function () {
    $scope.active = false;
    var ctrl = this;
    var nI = {};
    console.log("model " + this.setModel());
    console.log("updating " + angular.toJson($scope.item));
    console.log("old items" + JSON.stringify($scope.oldItems));
    for (var prop in $scope.item) {
      if (prop !== "id" || prop !== "createdAt" || prop !== "updatedAt") {
        nI[prop] = $scope.item[prop];
      }
    }
    var fModel = "LivraisonVenteId";
    let newSomme = nI.somme;
    let oldSomme = $scope.item.oldSomme;
    console.log("old sommmmmmmmmme", oldSomme);

    DBService.update(this.setModel(), nI, $scope.item.id).then(function (d) {
      //console.log('updateed ' + this.setModel());
      console.log("updateeeeeeed" + JSON.stringify(d));
      var ids = [];
      angular.forEach($scope.oldItems, function (v, k) {
        ids.push(v.id);
      });

      console.log('remove old LigneVentes ' + angular.toJson(ids));

      DBService.removeAll('LigneVente', ids).then(function (r) {

        console.log('remove all success');
        var lignes = [];
        angular.forEach($scope.item.items, function (v, key) {
          //v.id = null;
          v[fModel] = $scope.item.id;
          /*var oldItem = null;
          angular.forEach($scope.oldItems,function(ol,olk){
              if(ol.id === v.id){
                oldItem = ol; 
                
              }
          });
          if(oldItem !== null && ( v.quantite < oldItem.quantite )){
             //v.quantite += (oldItem.quantite - v.quantite);
          }*/
          lignes.push(v);
          });

        DBService.bcreate('LigneVente', lignes).then(function (dd) {
          //ctrl.hookAddSuccessCompletion();   
          var promises = [];
          angular.forEach(lignes, function (v, key) {
            promises.push(ArticleService.decrementArticleQuantity(v.ArticleId, v.quantite));
          });
          Promise.all(promises).then(function () {
            var message = 'Bon de livraison et stock mis à jour avec succés!';
            var id = Flash.create('success', message, 0, { class: 'custom-class', id: 'custom-id' }, true);
            $scope.$apply();
            $scope.oldItems = $scope.item.items;

          });
          console.log("d + " + JSON.stringify(d[1][0]));
          console.log("client id: " + d[1][0].ClientId);
          DBService.getById('Client',d[1][0].ClientId).then(function(cl){
            console.log("got client" + cl);
            let newSolde = cl.solde + oldSomme - newSomme;
            DBService.update("Client",{solde : newSolde}, d[1][0].ClientId).then(()=>{
              var message = 'Solde client mis à jour avec succés!';
              var id = Flash.create('success', message, 0, { class: 'custom-class', id: 'custom-id' }, true);
              $scope.$apply();
            });
          });


        });

      });
    });
  }

  ctrl.reload = function () {
    DBService.getFullByRef(this.setModel(), $scope.item.reference).then(function (c) {

      if (c) {
        //$scope.item = c;
        $scope.client = c.Client;
        var nI = {};
        for (var prop in c.dataValues) {
          if(prop !== "createdAt" || prop !== "updatedAt")
          {
            $scope.item[prop] = c[prop];
          }
        }
        $scope.item.items = [];
        $scope.oldItems = [];
        console.log("lignes " + angular.toJson(c.LigneVentes));
        angular.forEach(c.LigneVentes, function (v, key) {
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
        $scope.item.oldSomme = $scope.item.somme;
        console.log("old sommmmmmmmmme", $scope.item.oldSomme);
        console.log("newwwwww item" + angular.toJson($scope.item));
      }
      else {
        //ctrl.init();
        $scope.item = {
          reference: $scope.item.reference,
          items: [],
          oldItems: [],
          oldSomme: 0,
        }
      }
      $scope.active = true;
    });
  }
  ctrl.add = function () {
    //$scope.item.etat = 'en stock';
    if ($scope.item.id) {
      //base.update();
      return;
    }
    $scope.item.payee = false;
    DBService.create(ctrl.setModel(), $scope.item).then(function (d) {
      console.log('doc added ' + angular.toJson(d));
      //problem on windows
      var lignes = [];
      $scope.item.id = d.id;
      angular.forEach($scope.item.items, function (v, key) {
        v[ctrl.setLineModelIdString()] = d.id;
        lignes.push(v);

      });
      //bulk create
      DBService.bcreate('LigneVente', lignes).then(function (LigneVentes) {
        var message = 'BL crée avec succés !';
        var promises = [];
        $scope.oldItems = [];
        DBService.update("CommandeVente", { livree: true, LivraisonVenteId: $scope.item.id }, $scope.item.CommandeVenteId).then(function () {

          angular.forEach(lignes, function (v, key) {
            promises.push(ArticleService.decrementArticleQuantity(v.ArticleId, v.quantite));
          });
          $q.all(promises).then(function () {
            var message = 'Bon de livraison crée et stock mis à jour avec succés !';
            var id = Flash.create('success', message, 0, { class: 'custom-class', id: 'custom-id' }, true);

            ctrl.reload();




            $scope.$apply();

          });

          //$scope.$apply();                       
        })

      });
    });
  }
  ctrl.init = function () {
    $scope.oldItems = [];
    $scope.active = true;

    base.init();
    //$scope.item.oldSomme = $scope.item.somme;
    //console.log("old sommmmmmmmmme", $scope.item.oldSomme);
  }
  ctrl.init();


});
