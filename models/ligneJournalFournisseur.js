"use strict";

module.exports = function(sequelize, DataTypes) {
  var LJ = sequelize.define("LigneJournalFournisseur", {
    libelle : DataTypes.STRING, 
    debit: DataTypes.FLOAT,
    credit: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    date : DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {

       		LJ.belongsTo(models.Exercice);
          LJ.belongsTo(models.Fournisseur);
          LJ.hasOne(models.Reglement);
              
      
      }
    }
  });
  LJ.afterCreate(function(model, options, cb) {

    console.log('after create ' + model.id);
    var previous = model.id - 1;
    var total ;
    if(model.id > 1)
    {
          sequelize.models.LigneJournalFournisseur.findAll({where: {id : { $lt: model.id },FournisseurId : model.FournisseurId},
            attributes:[[sequelize.fn('MAX', sequelize.col('id')), 'greatestId']]
          }).then(function(t){
            //console.log(t);
            
            var greatestId = t[0].dataValues.greatestId;
            console.log("greatest  : " + greatestId);

        sequelize.models.LigneJournalFournisseur.findById(greatestId).then(function(lj){
            var bal = 0;
            if(lj)
            {
              bal =lj.balance; 
            }
            var balance = bal + (model.debit - model.credit);
            sequelize.models.LigneJournalFournisseur.update({balance:balance},{where:{id:model.id}}).then(function(){
              console.log('updateed');
            });
        });
          });

    }
    else
    {
        var balance = model.debit - model.credit;
        sequelize.models.LigneJournalFournisseur.update({balance:balance},{where:{id:model.id}}).then(function(){
              console.log('updateed');
        });   
    }

    return cb(null,options);

  });

  return LJ;
};