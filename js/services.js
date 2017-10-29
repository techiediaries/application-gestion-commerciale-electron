angular.module('gCom.services', [])
.factory('DBService',function($q){
  var models = require('./models');
  this.pageSize = 10;
  this.offset = 0;
  this.limit = 10;
  this.currentPage = []; 
  var self = this;
  self.size = 0;
  return {
      reset:function(){
        self.pageSize = 10;
        self.offset = 0;
        self.limit = 10;
        self.size = 0;        
      },
      getTotalInCaisse:function(){
        var deferred = $q.defer();
          models.db['Caisse'].findAll({
            where:{operation:'entrie'},
            attributes:[[models.sequelize.fn('SUM', models.sequelize.col('montant')), 'mysum']]
          }).then(function(t){
            console.log(t);
            deferred.resolve(t[0].dataValues.mysum);
          });
        return deferred.promise;
      },
      getTotalOutCaisse:function(){
        var deferred = $q.defer();

          models.db['Caisse'].findAll({
            where:{operation:'sortie'},
            attributes:[[models.sequelize.fn('SUM', models.sequelize.col('montant')), 'mysum']]
          }).then(function(t){
            deferred.resolve(t[0].dataValues.mysum);
          });
        return deferred.promise;

      },
      getCaisseDailySeries:function(month){

        var arr = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
        var deferred = $q.defer();
        models.db['Caisse'].findAll({
            where : models.sequelize.where(models.sequelize.fn('MONTH', models.sequelize.col('createdAt')), month),
            group: 'operation,DAY(createdAt)',
            attributes: [[models.sequelize.fn('DAY', models.sequelize.col('createdAt')), 'day'],[models.sequelize.fn('SUM', models.sequelize.col('montant')), 'mysum'],'createdAt','operation']
          }).then(function(data){
              angular.forEach(data, function(item, key){
                  var d = item.dataValues.day;
                  if(item.dataValues.operation === 'entrie')
                    arr[0][d - 1] = item.dataValues.mysum;
                  if(item.dataValues.operation === 'sortie')
                    arr[1][d - 1] = item.dataValues.mysum; 
              });
              //console.log(data);
              deferred.resolve(arr);
          });     

          return deferred.promise;     

      },
      getCaisseMonthSeries:function(year){
        var arr = [[0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0]];
        var deferred = $q.defer();
        models.db['Caisse'].findAll({
            where : models.sequelize.where(models.sequelize.fn('YEAR', models.sequelize.col('createdAt')), year),
            group: 'operation,MONTH(createdAt)',
            attributes: [[models.sequelize.fn('MONTH', models.sequelize.col('createdAt')), 'month'],[models.sequelize.fn('SUM', models.sequelize.col('montant')), 'mysum'],'createdAt','operation']
          }).then(function(data){
              angular.forEach(data, function(item, key){
                  var m = item.dataValues.month;
                  if(item.dataValues.operation === 'entrie')
                    arr[0][m - 1] = item.dataValues.mysum;
                  if(item.dataValues.operation === 'sortie')
                    arr[1][m - 1] = item.dataValues.mysum; 
              });
              //console.log(data);
              deferred.resolve(arr);
          });          
        
        return deferred.promise;
      },
      getCount:function(model){
          return models.db[model].count();
      },

      getPager:function(model,pageSize)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          
          models.db[model].count().then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({ include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({ include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count(); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({ include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },
      getPurchaseReglementPager:function(model,pageSize)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          
          models.db[model].count({where:{type:'achat'}}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({where:{type:'achat'},include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({ where:{type:'achat'},include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:{type:'achat'}}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({ where:{type:'achat'},include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },
      getSalesReglementPager:function(model,pageSize)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          
          models.db[model].count({where:{type:'vente'}}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({where:{type:'vente'},include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({ where:{type:'vente'},include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:{type:'vente'}}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({ where:{type:'vente'},include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },
      getPager2 : function(model,pageSize,pobj){
          
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          var obj = {};
          if(pobj.startDate && pobj.endDate)
          {
              var start = pobj.startDate;
              var end  = pobj.endDate;
              obj["date"] = {
                $between: [new Date(start),new Date(end)]
              };
              //continue;
          }
          if(pobj.nom)
          {
            obj["nom"]={like : '%' + pobj.nom + '%'}
          }          
          for(var s in pobj){
            /*if( !pobj[s] ){
              continue;
            }*/
            //console.log("criteria : " + s )
            if(s !== "startDate" && s !== "endDate" && s !== "nom")
            {
              if(pobj[s] !== undefined && pobj[s] !== null && pobj[s] !== '')
              {
                
                obj[s] = pobj[s];
              }
            }
            console.log("criteria : " + s + " : " + obj[s]);
          }
          console.log(JSON.stringify(obj));
          models.db[model].count({where:obj}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({where:obj,include: [{ all: true,nested: false }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({ where:obj,include: [{ all: true,nested: false }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:obj}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({ where:obj,include: [{ all: true,nested: false }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;

      },           
      getSalesDeliveryPager:function(pageSize,obj)
      {
          //where:{FamilleId:fmly.id},
          var model = "LivraisonVente";
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          var where  = {};
          if( ! obj.reference )
          {
            delete obj.reference;
          }
          if(obj.payee)
          {
            if(obj["payee"] === 'payee')
              obj.payee = true;
            if(obj["payee"] === 'nonpayee')
              obj.payee = false;
            if(obj["payee"] === 'tous')
              delete obj.payee ;
            if((obj.payee === null) || (obj.payee === undefined))
              delete obj.payee ;
              
          }
          else{
              delete obj.payee ;
          }
          if(obj.ClientId)
          {
            where["ClientId"] = obj.ClientId;
          }
          else
          {
            delete obj.ClientId;
          }
          if(obj.startDate && obj.endDate)
          {
            var start = obj.startDate;
            var end  = obj.endDate;
            obj["date"] = {
              $between: [new Date(start),new Date(end)]
            };
            delete obj.startDate;
            delete obj.endDate;
             
          }
          else{
            delete obj.startDate;
            delete obj.endDate;            
          }
          

          models.db[model].count({where:obj}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({where:obj,include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({ where:obj,include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:obj}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({ where:obj,include: [{ all: true,nested: true }],order:[['updatedAt', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },            

      getProviderJournalPager:function(pageSize,providerId,start,end)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          var model = "LigneJournalFournisseur";

          models.db[model].count({where:{FournisseurId:providerId ,date: {$between: [new Date(start),new Date(end)]}}}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({where:{FournisseurId:providerId, date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({where:{FournisseurId:providerId,date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:{FournisseurId:providerId,date: {$between: [new Date(start),new Date(end)]}}}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({where:{FournisseurId:providerId, date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },
      getCustomerJournalPager:function(pageSize,providerId,start,end)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          var model = "LigneJournalClient";

          models.db[model].count({where:{ClientId:providerId ,date: {$between: [new Date(start),new Date(end)]}}}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({where:{ClientId:providerId, date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({where:{ClientId:providerId,date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:{ClientId:providerId,date: {$between: [new Date(start),new Date(end)]}}}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({where:{ClientId:providerId, date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },    
      getPurchaseJournalPager:function(pageSize,start,end)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          var model = "LigneJournalAchat";

          models.db[model].count({where:{ date: {$between: [new Date(start),new Date(end)]}}}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({where:{ date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({where:{date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:{date: {$between: [new Date(start),new Date(end)]}}}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({where:{date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },
      
     getSalesJournalPager:function(pageSize,start,end)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          var model = "LigneJournalVente";

          models.db[model].count({where:{ date: {$between: [new Date(start),new Date(end)]}}}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({where:{ date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({where:{date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:{date: {$between: [new Date(start),new Date(end)]}}}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({where:{date: {$between: [new Date(start),new Date(end)]}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },
      getAlertedArticlePager:function(model,pageSize)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          
          models.db[model].count({where:{qReel:{$lte: models.sequelize.col('qMin')}}}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({include: [{ all: true,nested: true }],where:{qReel:{$lte: models.sequelize.col('qMin')}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({include: [{ all: true,nested: true }],where:{qReel:{$lte: models.sequelize.col('qMin')}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:{$lte : {qReel: models.sequelize.col('qMin')}}}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({include: [{ all: true,nested: true }],where:{qReel:{$lte: models.sequelize.col('qMin')}},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },
      getClientPager:function(model,pageSize,search)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          
          models.db[model].count({where:{$or:[{"nom" : {like : '%' + search + '%'}},{"representant" : {like : '%' + search + '%'}}]}}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({include: [{ all: true,nested: true }],where:{$or:[{"nom" : {like : '%' + search + '%'}},{"representant" : {like : '%' + search + '%'}}]},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({include: [{ all: true,nested: true }],where:{$or:[{"nom" : {like : '%' + search + '%'}},{"representant" : {like : '%' + search + '%'}}]},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:{$or:[{"nom" : {like : '%' + search + '%'}},{"representant" : {like : '%' + search + '%'}}]}}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({include: [{ all: true,nested: true }],where:{$or:[{"nom" : {like : '%' + search + '%'}},{"representant" : {like : '%' + search + '%'}}]},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },
      getAlertedArticleSearchPager:function(model,pageSize,search)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          
          models.db[model].count({where:{qReel:{$lte: models.sequelize.col('qMin')},$or : [{"designation" : {like : '%' + search + '%'}},{"reference" : {like : '%' + search + '%'}}]}}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({include: [{ all: true,nested: false }],where:{qReel:{$lte: models.sequelize.col('qMin')},$or : [{"designation" : {like : '%' + search + '%'}},{"reference" : {like : '%' + search + '%'}}]},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({include: [{ all: false,nested: false }],where:{qReel:{$lte: models.sequelize.col('qMin')},$or : [{"designation" : {like : '%' + search + '%'}},{"reference" : {like : '%' + search + '%'}}]},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:{qReel:{$lte: models.sequelize.col('qMin')},$or : [{"designation" : {like : '%' + search + '%'}},{"reference" : {like : '%' + search + '%'}}]}}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({include: [{ all: false,nested: false }],where:{qReel:{$lte: models.sequelize.col('qMin')},$or : [{"designation" : {like : '%' + search + '%'}},{"reference" : {like : '%' + search + '%'}}]},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },

      getArticleSearchPager:function(model,pageSize,search)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          
          models.db[model].count({where:{$or : [{"designation" : {like : '%' + search + '%'}},{"reference" : {like : '%' + search + '%'}}]}}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({include: [{ all: true,nested: true }],where:{$or : [{"designation" : {like : '%' + search + '%'}},{"reference" : {like : '%' + search + '%'}}]},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({include: [{ all: true,nested: true }],where:{$or : [{"designation" : {like : '%' + search + '%'}},{"reference" : {like : '%' + search + '%'}}]},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:{$or : [{"designation" : {like : '%' + search + '%'}},{"reference" : {like : '%' + search + '%'}}]}}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({include: [{ all: true,nested: true }],where:{$or : [{"designation" : {like : '%' + search + '%'}},{"reference" : {like : '%' + search + '%'}}]},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },
  
      getArticlePager:function(model,pageSize,fmly)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          
          models.db[model].count({where:{FamilleReference:fmly}}).then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({include: [{ all: true,nested: true }],where:{FamilleReference:fmly},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({include: [{ all: true,nested: true }],where:{FamilleReference:fmly},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count({where:{FamilleReference:fmly},}); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({include: [{ all: true,nested: true }],where:{FamilleReference:fmly},order:[['id', 'DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },
      getByFamillyPager:function(model,pageSize)
      {
          //where:{FamilleId:fmly.id},
          self.pageSize = parseInt(pageSize);
          self.limit = self.pageSize;
          var deferred = $q.defer();
          
          models.db[model].count().then(function(c) {
            //console.log('count ' + c);
            self.size = c;
            deferred.resolve(o);
            
          })
          //deferred.reject('Error');
          var o =  {
              
              initialPage:function(){

                return models.db[model].findAll({ include: [{ all: true,nested: true }],order:[['FamilleReference','DESC']],offset: self.offset, limit: self.limit });
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return models.db[model].findAll({ include: [{ all: true,nested: true }],order:[['FamilleReference','DESC']],offset: self.offset, limit: self.limit });
                  
              },
              count:function(model){
                 return models.db[model].count(); 
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return models.db[model].findAll({ include: [{ all: true,nested: true }],order:[['FamilleReference','DESC']],offset: self.offset, limit: self.limit });
              }
          }
          return deferred.promise;
      },

      getAll:function(model){
        return models.db[model].findAll({ order:[['updatedAt', 'DESC']]});      
      },

      getById:function(model,id){
          return models.db[model].findById(id);
      },
      getFullById:function(model,id){
          return models.db[model].findById(id,{ include: [{ all: true,nested: true }]});
      },

      getFullByRef:function(model,ref){
          return models.db[model].findOne({ where:{reference:ref},include: [{ all: true,nested: true }]});
      },
      getByRef:function(model,ref){
          return models.db[model].findOne({ where:{reference:ref}});
      },

      get:function(model,offset,limit){
          
        return models.db[model].findAll({ order:[['updatedAt', 'DESC']],offset: offset, limit: limit });
      },
      create:function(model,obj){
       /* if(obj.id && obj.id !== '')
        {

          return  models.db[model].update(obj,{where:{id:obj.id}});
        }*/
        return models.db[model].create(obj);
      },
      remove:function(model,id){
       /* if(obj.id && obj.id !== '')
        {

          return  models.db[model].update(obj,{where:{id:obj.id}});
        }*/
        if(id)
          return models.db[model].destroy({where:{id:id}});
        else
          return;

      },
      

      removeAllByReference:function(model,ids){
       
        if(ids)
          return models.db[model].destroy({where:{reference:{$in:ids}}});
        else
          return;

      },
      removeAll:function(model,ids){
       
        if(ids)
          return models.db[model].destroy({where:{id:{$in:ids}},individualHooks: true});
        else
          return;

      },

      bcreate:function(model,objs){
       /* if(obj.id && obj.id !== '')
        {

          return  models.db[model].update(obj,{where:{id:obj.id}});
        }*/
        return models.db[model].bulkCreate(objs);
      },
     bupdate:function(model,obj,ids){
          var deferred = $q.defer();
          models.db[model].update(obj,{where:{id:{"$in":ids}}}).then(function(o){
                deferred.resolve(o);

          });

          return deferred.promise;
      },
 
      update:function(model,obj,id){
          var deferred = $q.defer();
          models.db[model].update(obj,{where:{id:id},individualHooks: true}).then(function(o){
                deferred.resolve(o);

          });

          return deferred.promise;
      },

      updateByReference:function(model,obj,id){
          var deferred = $q.defer();
          models.db[model].update(obj,{where:{reference:id}}).then(function(o){
                deferred.resolve(o);

          });

          return deferred.promise;
      },

      getCompanyInfo:function(){
          //$scope.$apply();
      },
      getCounter:function(model,prefix){
        var deferred = $q.defer();

        models.db[model].count({}).then(function(l){

            var r = {
                reference : prefix + (l + 1),
                count : l ,
                id : l + 1 
            }
            deferred.resolve(r);
        });

        console.log('-----------------------------\n');
        console.log('the last id is ' + (length - 1));

        return deferred.promise;
      }


  };
})
.factory('UserService',function($q,DBService){
  var models = require('./models');
  var o = {
    getByUsername :function(username,password){
      return models.db["User"].findAll({where:{username : username,password:password}});
    }
  };

  return o;

})
.factory('ChargeService',function($q,DBService){
  var models = require('./models');
  var o = {
    getTotal:function(){
        var deferred = $q.defer();
          models.db['Charge'].findAll({
            attributes:[[models.sequelize.fn('SUM', models.sequelize.col('montant')), 'mysum']]
          }).then(function(t){
            console.log(t);
            deferred.resolve(t[0].dataValues.mysum);
          });
        return deferred.promise;
    },
    getCategories:function(){
       return DBService.getAll('CategorieCharge');   
    }
  };

  return o;

})
.factory('CaisseService',function($q,DBService){
  var models = require('./models');
  var o = {

    getMonthInSeries:function(){

    },
    getMonthOutSeries:function(){

    },
    getTotalInCaisse:function(){
        var deferred = $q.defer();
        DBService.getTotalInCaisse().then(function(arr){

          deferred.resolve(arr);
            
        });
        return deferred.promise;

    },
    getTotal:function(){
        var deferred = $q.defer();
          models.db['Caisse'].findAll({where:{operation:'entrée'},
            attributes:[[models.sequelize.fn('SUM', models.sequelize.col('montant')), 'mysum']]
          }).then(function(t){

            models.db['Caisse'].findAll({where:{operation:'sortie'},
              attributes:[[models.sequelize.fn('SUM', models.sequelize.col('montant')), 'mysum']]
            }).then(function(tt){
                deferred.resolve( t[0].dataValues.mysum - tt[0].dataValues.mysum);  
            });
            
          });
        return deferred.promise;
    },    
    getTotalOutCaisse:function(){
        var deferred = $q.defer();
        DBService.getTotalOutCaisse().then(function(arr){

          deferred.resolve(arr);
            
        });
        return deferred.promise;

    },

    getDailySeries:function(month){
        var deferred = $q.defer();
        DBService.getCaisseDailySeries(month).then(function(arr){

          deferred.resolve(arr);
            
        });
        return deferred.promise;
    },
    getCurrentMonthSeries:function(){
        var deferred = $q.defer();
        /*var arr = [[65, 59, 80, 81, 56, 55, 40],
                   [28, 48, 40, 19, 86, 27, 90]];*/
        DBService.getCaisseMonthSeries(2016).then(function(arr){

          deferred.resolve(arr);
            
        });
        

        return deferred.promise;

    },


  };
  return o;

})
.factory('ArticleService',function(DBService){
  var models = require('./models');

  return {
    incrementArticleQuantity:function(id,v)
    {
                DBService.getById('Article',id).then(function(a){
                  
                    var ar = {
                      qReel : a.qReel + parseInt(v)
                    };
                    DBService.create('Movement',{
                      type:'entrie',
                      ArticleId:a.id,
                      quantite:parseInt(v)
                    }).then(function(){
                        DBService.update('Article',ar,id);  
                    });
                                    
                });
                return;
    },
    getAlertCount : function(){

        return models.db["Article"].count({where:{qReel : {$lte : models.sequelize.col('qMin')}}})
    },
    incrementArticleQuantityAndSetBuyingPrice:function(id,q,p){
                DBService.getById('Article',id).then(function(a){
                  
                    var ar = {
                      qReel : a.qReel + parseInt(q),
                      prixAchat: parseFloat(p)
                    };
                    DBService.update('Article',ar,id).then(function(){

                        DBService.create('Movement',{
                          type:"entrée",
                          ArticleId:a.id,
                          prixAchat:parseFloat(p),
                          quantite:parseInt(q)
                        });
                    })
                                    
                });
                return;

    },
    decrementArticleQuantity:function(id,v)
    {
                DBService.getById('Article',id).then(function(a){
                  
                  var ar = {
                    qReel : a.qReel - parseFloat(v)
                  };
                    DBService.create('Movement',{
                      type:'sortie',
                      ArticleId:a.id,
                      quantite:parseFloat(v)
                    }).then(function(){
                        DBService.update('Article',ar,id);  
                    });                
                });
                return;


    }


  };

})
.factory('SettingsService',function(DBService){

  return {
    getCompanyInfo:function(){
      

    }
  }
})
.factory('CounterService',function(){

  return {
      devis:function(){
        return 0;
      },
      delivery:function(){
        return 'BL0000';
      },


  }
})
.factory('PurchaseService',function(DBService,ArticleService,CounterService,$q){

  return {
      invoicePurchaseOrder:function(command){
        var defered = $q.defer();
        var promises = [];
        var ids = [];
        DBService.getCounter("FactureAchat","FA").then(function(ref){
          var cl = {
              CommandeAchatId:command.id,
              reference:ref.reference,
              date : command.date,
              payee : false,
              somme : command.somme,
              FournisseurId :command.FournisseurId,
              notes : command.notes,

          }          
          DBService.create('FactureAchat',cl).then(function(r){
              angular.forEach(command.items,function(v,k){
                  //command.items[k].LivraisonAchatId = r.id;
                  v.id = null;
                  v.FactureAchatId = r.id;
                  v.CommandeAchatId = null;
                  ids.push(v);
                  //promises.push(ArticleService.incrementArticleQuantityAndSetBuyingPrice(v.ArticleId,v.quantite,v.prixAchat));
              });
              //promises.push(DBService.bupdate("LigneLivraisonAchat",{"LivraisonAchatId" : r.id},ids));
              DBService.bcreate('LigneCommande',ids).then(function(){
                $q.all(promises).then(function(){
                    DBService.update('CommandeAchat',{facturee : true},command.id).then(function(rr){

                          defered.resolve(rr);
                    });

                });
              });
          });
                

        });
        return defered.promise;
          
      },
      receivePurchaseOrder:function(command){
        var defered = $q.defer();
        var promises = [];
        var ids = [];
        DBService.getCounter("LivraisonAchat","BL").then(function(ref){
          var cl = {
              CommandeAchatId:command.id,
              reference:ref.reference,
              date : command.date,
              payee : false,
              somme : command.somme,
              FournisseurId :command.FournisseurId,
              notes : command.notes,

          }
          DBService.create('LivraisonAchat',cl).then(function(r){
              angular.forEach(command.items,function(v,k){
                  //command.items[k].LivraisonAchatId = r.id;
                  v.LivraisonAchatId = r.id;
                  ids.push(v);
                  promises.push(ArticleService.incrementArticleQuantityAndSetBuyingPrice(v.ArticleId,v.quantite,v.prixAchat));
              });
              //promises.push(DBService.bupdate("LigneLivraisonAchat",{"LivraisonAchatId" : r.id},ids));
              DBService.bcreate('LigneLivraisonAchat',ids).then(function(){
                $q.all(promises).then(function(){
                    DBService.update('CommandeAchat',{etat:'en stock',livree : true},command.id).then(function(rr){

                          defered.resolve(rr);
                    });

                });
              });
          });          

        });


        return defered.promise;
      }

  }
});
