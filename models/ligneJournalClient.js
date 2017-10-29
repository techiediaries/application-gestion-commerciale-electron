"use strict";

module.exports = function (sequelize, DataTypes) {
  var LJ = sequelize.define("LigneJournalClient", {

    libelle: DataTypes.STRING,
    debit: DataTypes.FLOAT,
    credit: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    date: DataTypes.DATE




  }, {
      classMethods: {
        associate: function (models) {

          LJ.belongsTo(models.Exercice);
          LJ.belongsTo(models.Client);
          //LJ.hasOne(models.Reglement);


        }
      }
  
    });
  LJ.beforeUpdate(function (model, options, cb) {
    console.log('after update ' + model.id);//7
    var currentID = 1;
    sequelize.models.LigneJournalClient.findAll({
      where: { ClientId: model.ClientId },
      attributes: [[sequelize.fn('MAX', sequelize.col('id')), 'greatestId']]
    }).then(function (t) {

      var lastId = t[0].dataValues.greatestId;
      
      if (model.id >= 2) {
        
              var previousID = model.id - 1;
              currentID = model.id;
              console.log("greatest id " + previousID);//6
              sequelize.models.LigneJournalClient.findById(previousID).then(function (lj) {
                var bal = 0;
                if (lj) {
                  bal = lj.balance;
                }
                var balance = bal + (model.credit - model.debit);
                
                //if(currentID !== model.id && currentID !== lastId)
                sequelize.models.LigneJournalClient.update({ balance: balance }, { where: { id: currentID }, individualHooks: false }).then(function () {
                  console.log('updateed');
                  //updateNext(model);
                  //currentID++;
                  var promises = [];
                  var diff = model.balance - balance;
                  console.log("the diiiiiiiiiiiiiiiif " + diff);
                  for(var i = currentID+1; i <= lastId ; i++)
                  {
                     //sequelize.models.LigneJournalClient.update({ balance: balance }, { where: { id: i }, individualHooks: false }).then(function () {});
                     
                     promises.push(sequelize.models.LigneJournalClient.findById(i));
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
                        sequelize.models.LigneJournalClient.update({ balance: currentBalance - diff }, { where: { id: ins.id }, individualHooks: false }).then(function () {
                      
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
              sequelize.models.LigneJournalClient.update({ balance: balance }, { where: { id: currentID } }).then(function () {
                console.log('updateed');
                currentID++;
                //updateNext(model);
              });
            }

    });

    return cb(null, options);
  });  
  LJ.afterUpdate(function (model, options, cb) {





    return cb(null, options);
  });
  LJ.afterCreate(function (model, options, cb) {

    console.log('after create ' + model.id);
    var previous = model.id - 1;
    var total;
    if (model.id > 1) {
      sequelize.models.LigneJournalClient.findAll({
        where: { id: { $lt: model.id }, ClientId: model.ClientId },
        attributes: [[sequelize.fn('MAX', sequelize.col('id')), 'greatestId']]
      }).then(function (t) {
        //console.log(t);

        var greatestId = t[0].dataValues.greatestId;
        console.log("greatest id " + greatestId);
        sequelize.models.LigneJournalClient.findById(greatestId).then(function (lj) {
          var bal = 0;
          if (lj) {
            bal = lj.balance;
          }
          var balance = bal + (model.credit - model.debit);
          sequelize.models.LigneJournalClient.update({ balance: balance }, { where: { id: model.id } }).then(function () {
            console.log('updateed');
          });
          sequelize.models.Client.update({ solde: balance }, { where: { id: model.ClientId } });
        });
      });
      //sequelize.models.LigneJournalClient.findAll({ where: {ClientId : model.ClientId}})

    }
    else {
      var balance = model.credit - model.debit;
      sequelize.models.LigneJournalClient.update({ balance: balance }, { where: { id: model.id } }).then(function () {
        console.log('updateed');
      });
    }

    return cb(null, options);

  });


  return LJ;
};