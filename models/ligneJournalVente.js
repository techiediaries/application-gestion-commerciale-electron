"use strict";

module.exports = function(sequelize, DataTypes) {
  var LJ = sequelize.define("LigneJournalVente", {
    
    libelle : DataTypes.STRING, 
    debit: DataTypes.FLOAT,
    credit: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    date : DataTypes.DATE

    
    
  
  }, {
    classMethods: {
      associate: function(models) {

       		LJ.belongsTo(models.Exercice);
          //LJ.hasOne(models.Reglement);
      
      }
    }
  });
  LJ.beforeUpdate(function (model, options, cb) {
    console.log('after update ' + model.id);//7
    var currentID = 1;
    sequelize.models.LigneJournalVente.findAll({
      attributes: [[sequelize.fn('MAX', sequelize.col('id')), 'greatestId']]
    }).then(function (t) {

      var lastId = t[0].dataValues.greatestId;
      
      if (model.id >= 2) {
        
              var previousID = model.id - 1;
              currentID = model.id;
              console.log("greatest id " + previousID);//6
              sequelize.models.LigneJournalVente.findById(previousID).then(function (lj) {
                var bal = 0;
                if (lj) {
                  bal = lj.balance;
                }
                var balance = bal + (model.credit - model.debit);
                
                //if(currentID !== model.id && currentID !== lastId)
                sequelize.models.LigneJournalVente.update({ balance: balance }, { where: { id: currentID }, individualHooks: false }).then(function () {
                  console.log('updateed');
                  //updateNext(model);
                  //currentID++;
                  var promises = [];
                  var diff = model.balance - balance;
                  console.log("the diiiiiiiiiiiiiiiif " + diff);
                  for(var i = currentID+1; i <= lastId ; i++)
                  {
                     //sequelize.models.LigneJournalClient.update({ balance: balance }, { where: { id: i }, individualHooks: false }).then(function () {});
                     
                     promises.push(sequelize.models.LigneJournalVente.findById(i));
                  }
                  var pros = [];
                  
                  Promise.all(promises).then(
                    function(instances){
                      for(var j= 0; j < instances.length ; j++)
                      {
                        var ins = instances[j];
                        var currentBalance = ins.balance;
                        console.log("current balance : " + currentBalance);
                        if(model.balance)
                        sequelize.models.LigneJournalVente.update({ balance: currentBalance - diff }, { where: { id: ins.id }, individualHooks: false }).then(function () {
                      
                           console.log("added");
                        });

                      }
                      
                      
                    }                    
                  );
        
        
                });
              });
        
            }
            else {
              var balance = model.credit - model.debit;
              //if(currentID !== model.id && currentID !== lastId)
              sequelize.models.LigneJournalVente.update({ balance: balance }, { where: { id: currentID } }).then(function () {
                console.log('updateed');
                currentID++;
                //updateNext(model);
              });
            }

    });

    return cb(null, options);
  });   
   LJ.afterCreate(function(model, options, cb) {

    console.log('after create ' + model.id);
    var previous = model.id - 1;
    var total ;
    if(model.id > 1)
    {
        sequelize.models.LigneJournalVente.findById(model.id - 1 ).then(function(lj){
            var bal = 0;
            if(lj)
            {
              bal =lj.balance; 
            }
            var balance = bal + (model.credit - model.debit);
            sequelize.models.LigneJournalVente.update({balance:balance},{where:{id:model.id}}).then(function(){
              console.log('updateed');
            });
        });
    }
    else
    {
        var balance = model.credit - model.debit;
        sequelize.models.LigneJournalVente.update({balance:balance},{where:{id:model.id}}).then(function(){
              console.log('updateed');
        });   
    }

    return cb(null,options);

   });


  return LJ;
};